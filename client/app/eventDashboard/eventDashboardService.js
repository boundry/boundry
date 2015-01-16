angular
  .module('boundry.eventDashboard', [])
  .factory('EventDashboardFactory', EventDashboardFactory);

  EventDashboardFactory.$inject = ['$rootScope', '$http', 'AuthFactory'];

  function EventDashboardFactory ($rootScope, $http, AuthFactory) {
    var eventData; //Set by controller after promise returns
    //TODO: This should be called anew from the controller, so the email doesn't
    //persist here after the user logs out. 
    var currentOrganizerEmail = AuthFactory.getEmail(); 

    return {
      currentOrganizerEmail: currentOrganizerEmail,
      getEvents: getEvents,
      setEventData: setEventData,
      getEventData: getEventData
    };


    //Getter/setter for eventData
    function setEventData (data) {
      eventData = data;
      $rootScope.$emit('eventDataUpdated');
    }
    function getEventData () {
      return eventData;
    }
    //TODO: This smells bad. Data should be resolved in the factory, not the in
    //the controller. Plus now all controllers that import that need to know
    //that getEvents returns a promise. 

    //Get all event data for an organizer
    function getEvents (organizerEmail) {
      organizerEmail = organizerEmail || 'test@org.com';
      var url = '/api/web/organizer/' + organizerEmail + '/events';
      return $http.get(url);
    }
  }
