angular
  .module('boundry.eventDashboard')
  .controller('EventDashboardCtrl', EventDashboardCtrl);

  EventDashboardCtrl.$inject = [
    '$scope',
    'EventDashboardFactory'
  ];

  function EventDashboardCtrl ($scope, EventDashboardFactory, uiGmapGoogleMapApi) {
    angular.extend($scope, EventDashboardFactory);
     
      $scope.options = {scrollwheel: false}; 
    //    $scope.map = {
    //   center: {latitude: 51.219053, longitude: 4.404418 },
    //   zoom: 14 
    // };
      //fix map size
      $scope.styleTest = {
        'width' : '500px',
        // 'height' : '200px',
        'background' : 'gray'
      };

    $scope.getEvents($scope.currentOrganizerEmail) //Get events for organizer, passing in email pulled from dashboard factory which is pulled from auth factory 
      .success(function(data) {
        $scope.setEventData(data); //Set data on factory
        $scope.eventData = $scope.getEventData();
        console.log('evdat', $scope.eventData);
      })
      .error(function(error) {
        console.log(error);
      });
    //create regions on map
    $scope.populateMap = function(ind) {
      $scope.polygons = [];
      // $scope.getPolygons(ind);
      var eventObj = $scope.eventData[ind];
      console.log('the event is: ', eventObj);
      var centerCoord = eventObj.event_center;
      console.log('centerCoord', centerCoord);

      // if (centerCoord) {
        // console.log('q',eventObj.regions);
        for (var i = 0; i < eventObj.regions.length; i++) {
          console.log(eventObj.regions[i].region_attr);
          // eventObj.regions[i].region_attr =  reg[i].region_attr;
          $scope.polygons.push(eventObj.regions[i].region_attr);
        }
        console.log('eo',eventObj);
        var regionArr = [];
        console.log('center is: ',eventObj.event_center);
        $scope.map = {
          center:{latitude: eventObj.event_center.latitude, longitude: eventObj.event_center.longitude}, //{latitude: 51.219053, longitude: 4.404418 },//eventObj.event_center,
          zoom: 14
        };
    };

  }



