angular
  .module('boundry.eventDashboard')
  .controller('EventDashboardCtrl', EventDashboardCtrl);

  EventDashboardCtrl.$inject = [
    '$rootScope',
    '$scope',
    'AuthFactory',
    'EventDashboardFactory'
  ];

  function EventDashboardCtrl ($rootScope, $scope, AuthFactory, EventDashboardFactory, uiGmapGoogleMapApi) {
    $scope.hasEvent = false;
    $scope.eventMessage = '';
    $scope.init = function() {
      var ngS = document.getElementsByClassName('ng-scope');
      ngS[0].classList.remove('loginHtml');
      ngS[0].classList.remove('signupHtml');
      var el = document.getElementsByClassName('angular-google-map-container');
      el[0].classList.add('dashboardMap'); 
    };
    angular.extend($scope, EventDashboardFactory);
     
    $scope.options = {scrollwheel: false}; 

    //Listen for event data changes and update data on scope
    var unbind = $rootScope.$on('eventDataUpdated', function (event) {
      $scope.eventData = $scope.getEventData();
      //$scope.$apply();
    });
    $scope.$on('$destroy', unbind);

    //TODO: Move this into an activate function
    $scope.getEvents(AuthFactory.getEmail()) //Get events for organizer, passing in email pulled from auth factory 
      .success(function(data) {
        $scope.setEventData(data); //Set data on factory
        $scope.eventData = $scope.getEventData();
        console.log('evdat', $scope.eventData);

        if(data.length === 0) {
          console.log('no data');
          $scope.hasEvent = true;
          $scope.eventMessage = 'No events';
          $scope.createNewEvent();
        } 
      })
      .error(function(error) {
        console.log(error);
      });

    //TODO: Move this to factory
    //render regions on map preview
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



