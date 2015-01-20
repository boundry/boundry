angular
  .module('boundry.eventEditor')
  .controller('EventEditorCtrl', EventEditorCtrl);

  EventEditorCtrl.$inject = [
    '$rootScope',
    '$scope',
    '$http',
    '$stateParams',
    'EventEditorFactory',
    'EventDashboardFactory',
    'uiGmapGoogleMapApi',
    'uiGmapLogger'
  ];

  function EventEditorCtrl ($rootScope, $scope, $http, $stateParams, EventEditorFactory, EventDashboardFactory, uiGmapGoogleMapApi, uiGmapLogger) {

    uiGmapLogger.doLog = true;
    
    //Expose factory functions and data to scope
    angular.extend($scope, EventEditorFactory);

    //Had to store this on dash factory to avoid circular dependency. 
    //TODO: refactor that
    $scope.sendEventDataToServerAndRefresh = EventDashboardFactory.sendEventDataToServerAndRefresh;

    //Take data from EventDashboard (via EventEditorFactory) and save to scope
    $scope.currEventData = EventEditorFactory.grabEventData($stateParams.eventId);
    console.log('currEventData', $scope.currEventData);

    var eventDataSavedListener = $rootScope.$on('eventDataSaved', function (event) {
      var savedAlert = angular.element(document.getElementById('savedAlert'));
      savedAlert.removeClass('invisible');
      setTimeout(function() {
        savedAlert.addClass('invisible');
      }, 5000);
    });

    //Listen to data changes on the factory and reset the scope data to match.
    //This is lets us grab the region IDs that the server generates for newly
    //created polygons and set them on the scope so we don't keep saving them
    //with null IDs
    var dataUpdateListener = $rootScope.$on('eventDataUpdated', function (event) {
      $scope.currEventData = EventEditorFactory.grabEventData($stateParams.eventId);
      console.log('updatedCurrEventData', $scope.currEventData);
    });

    //Clear polygon from scope immediately and then send delete request to server
    var deleteRegionListener = $rootScope.$on('deleteRegion', function (event, currEventId, currRegionIndex, currRegionId) {
      event.stopPropagation();
      $scope.currEventData.regions.splice(currRegionIndex, 1); //Remove region from scope
      $scope.deletePolygon(currRegionId);
    });

    //Save event listeners to scope for use by polygon directive. Used to live
    //in factory but the handler needs to call something on the scope.
    $scope.polygonEvents = {
      'click': function ( polygon, eventName, model, args ) {
        //Everything within this handler function gets called TWICE per event,
        //for some stupid reason. This timeout crap is a hacky workaround.
        //Outer 'this' is the internal angular-google-maps model used to gen
        //the GoogleMaps Polygon object
        //Clear the first setTimeout before it has a chance to run
        clearTimeout(this.doNotTriggerTwiceTimeout); 
        //The second setTimeout will run, 50ms after the dumb second
        //invocation of this whole handler.
        this.doNotTriggerTwiceTimeout = setTimeout(function(){
          //This stuff will get called once per click
          console.log('POLYGON CLICKED', model.$parent.poly); //Polygon object  
          $rootScope.$emit('regionClicked', model.$parent.poly);
        }, 50);         
      }
    };
    
    //This gives us access to the drawing manager object via getDrawingManager()
    $scope.drawingManagerControl = {};

    //uiGmpaGoogleMapApi is a promise. "then" callback provides the google.maps
    //object. This is for async loading of the map.
    uiGmapGoogleMapApi.then(function(maps) {

      $scope.drawingManagerOptions = {
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes:[
            google.maps.drawing.OverlayType.POLYGON
          ]
        },
          //TODO: Consider making this whole thing a provider so we can set this
          //stuff in app.config
        polygonOptions: $scope.polygonOptions
      };

      //Add event listener to drawingManagerControl object when the
      //getDrawingManager function loads onto it
      $scope.$watch('drawingManagerControl.getDrawingManager', function (val) {
        if (!$scope.drawingManagerControl.getDrawingManager) {
          return;
        }
        //When a new polygon is drawn, make a new Polygon object and store it
        google.maps.event.addListener($scope.drawingManagerControl.getDrawingManager(), 'overlaycomplete', function (polygon) {
          var newPolygon = new $scope.Polygon(polygon.overlay.getPath().getArray());
          console.log('New Polygon: ', newPolygon);

          $scope.currEventData.regions.push(newPolygon);
          //Here, polygon belongs to the Drawing Manager. Empty the path so we
          //don't display it in addition to our newly constructed polygon.
          polygon.overlay.setPath([]);           
          $rootScope.$emit('regionClicked', newPolygon); //Load new polygon's action data for editing
          $scope.$apply(); //Re-render map from newly updated scope storage
        });
      });

    })
    .catch(function(err) {
      console.log('Could not load api', err);
    });

  //Remove listeners when controller is destroyed to avoid adding multiple
  $scope.$on('$destroy', dataUpdateListener);
  $scope.$on('$destroy', deleteRegionListener);
  $scope.$on('$destroy', eventDataSavedListener);
}


