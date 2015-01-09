angular
  .module('boundry.eventDashboard')
  .controller('EventDashboardCtrl', EventDashboardCtrl);

  EventDashboardCtrl.$inject = [
    '$scope',
    '$stateParams',
    'EventDashboardFactory'
  ];

  function EventDashboardCtrl ($scope, $stateParams, EventDashboardFactory, uiGmapGoogleMapApi) {
    angular.extend($scope, EventDashboardFactory);

    $scope.getEvents($stateParams.organizerEmail) //Get events for organizer, passing in $stateParams.organizer
      .success(function(data) {
        $scope.setEventData(data); //Set data on factory
        $scope.eventData = $scope.getEventData();
        console.log($scope.eventData);
      })
      .error(function(error) {
        console.log(error);
      });
  }
