angular
  .module('boundry.eventDashboard', [])
  .factory('EventDashboardFactory', EventDashboardFactory);

  EventDashboardFactory.$inject = ['$http'];

  function EventDashboardFactory ($http) {

    return {
      getEvents: getEvents
    };

    //Get all event data for an organizer
    function getEvents (organizerEmail) {
      organizerEmail = organizerEmail || 'test@org.com';
      var url = '/api/web/organizer/' + organizerEmail + '/events';
      return $http.get(url);
    }
  }
