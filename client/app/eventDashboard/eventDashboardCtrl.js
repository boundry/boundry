angular
  .module('boundry.eventDashboard')
  .controller('EventDashboardCtrl', EventDashboardCtrl);

  EventDashboardCtrl.$inject = [
    '$scope',
    'EventDashboardFactory'
  ];

  function EventDashboardCtrl ($scope, EventDashboardFactory, uiGmapGoogleMapApi) {
    EventDashboardFactory.getEvents()
      .success(function(data) {
        $scope.eventData = data;
      });
  }
