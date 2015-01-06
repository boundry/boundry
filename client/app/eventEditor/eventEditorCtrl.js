angular
  .module('boundry.eventEditor')
  .controller('EventEditorCtrl', EventEditorCtrl);

  EventEditorCtrl.$inject = [
    '$scope',
    '$http',
    'EventEditorFactory',
    'uiGmapGoogleMapApi',
    'uiGmapLogger'];

  function EventEditorCtrl ($scope, $http, EventEditorFactory, uiGmapGoogleMapApi, uiGmapLogger) {
    uiGmapLogger.doLog = true;
    angular.extend($scope, EventEditorFactory);
    
    $scope.boundaries = [];
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
        google.maps.event.addListener($scope.drawingManagerControl.getDrawingManager(), 'overlaycomplete', function (polygon) {
          console.log(polygon.overlay.getPath().getArray());
        });
      });

    })
    .catch(function(err) {
      console.log("Could not load api", err);
    });


  };


