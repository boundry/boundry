angular
  .module('boundry.eventDashboard')
  .controller('EventDashboardCtrl', EventDashboardCtrl);

  EventDashboardCtrl.$inject = [
    '$scope',
    'EventDashboardFactory'
  ];

  function EventDashboardCtrl ($scope, EventDashboardFactory, uiGmapGoogleMapApi) {
    angular.extend($scope, EventDashboardFactory);

    $scope.getEvents($scope.currentOrganizerEmail) //Get events for organizer, passing in email pulled from dashboard factory which is pulled from auth factory 
      .success(function(data) {
        $scope.setEventData(data); //Set data on factory
        $scope.eventData = $scope.getEventData();
      })
      .error(function(error) {
        console.log(error);
      });
  }
