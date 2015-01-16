angular
  .module('boundry.eventEditor')
  .controller('EventEditorCtrl', EventEditorCtrl);

  EventEditorCtrl.$inject = [
    '$rootScope',
    '$scope',
    '$http',
    '$stateParams',
    'EventEditorFactory',
    'uiGmapGoogleMapApi',
    'uiGmapLogger'
  ];

  function EventEditorCtrl ($rootScope, $scope, $http, $stateParams, EventEditorFactory, uiGmapGoogleMapApi, uiGmapLogger) {

    uiGmapLogger.doLog = true;
    
    //Expose factory functions and data to scope
    angular.extend($scope, EventEditorFactory);

    //Take data from EventDashboard (via EventEditorFactory) and save to scope
    $scope.currEventData = EventEditorFactory.grabEventData($stateParams.eventId);
    console.log('currEventData', $scope.currEventData);

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
          console.log('polygon', polygon);
          $scope.currEventData.regions.push($scope.Polygon(polygon.overlay.getPath().getArray()));
          //Here, polygon belongs to the Drawing Manager. Empty the path so we
          //don't display it in addition to our newly constructed polygon.
          polygon.overlay.setPath([]);           
          $scope.$apply(); //Re-render map from newly updated scope storage
        });
      });

    })
    .catch(function(err) {
      console.log('Could not load api', err);
    });
  }


