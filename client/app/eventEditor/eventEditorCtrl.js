angular
  .module('boundry.eventEditor')
  .controller('EventEditorCtrl', EventEditorCtrl);

  EventEditorCtrl.$inject = [
    '$scope',
    '$http',
    '$stateParams',
    'EventEditorFactory',
    'EventDashboardFactory',
    'uiGmapGoogleMapApi',
    'uiGmapLogger'
  ];

  function EventEditorCtrl ($scope, $http, $stateParams, EventEditorFactory, EventDashboardFactory, uiGmapGoogleMapApi, uiGmapLogger) {
    console.log($stateParams);
    console.log(EventDashboardFactory.getEventData());

    uiGmapLogger.doLog = true;
    angular.extend($scope, EventEditorFactory);
    
    //TODO: Get polygons from server
    $scope.polygons = [];
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
          $scope.polygons.push($scope.Polygon(polygon.overlay.getPath().getArray()));
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


