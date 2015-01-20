angular
  .module('boundry.eventDashboard', [])
  .factory('EventDashboardFactory', EventDashboardFactory);

  EventDashboardFactory.$inject = [
    '$rootScope',
    '$http',
    'AuthFactory',
  ];

  function EventDashboardFactory ($rootScope, $http, AuthFactory) {
    var eventData; //Set by controller after promise returns
    //TODO: This should be watching the value in AuthFactory, updating whenever
    //it changes

    return {
      createNewEvent: createNewEvent,
      deleteEvent: deleteEvent,
      sendEventDataToServerAndRefresh: sendEventDataToServerAndRefresh,
      getEvents: getEvents,
      setEventData: setEventData,
      getEventData: getEventData
    };

    //Makes a new event, saves to server to generate an ID, gets back the ID,
    //and then routes to editor control passing ID along in $stateParams
    function createNewEvent() {
      var newEvent = {
        name: 'New Event',
        start_time: null,
        event_center: {
          latitude: 37.789174,
          longitude: -122.419292
        }
      };
      sendEventDataToServerAndRefresh(newEvent);
    }

    function deleteEvent(eventId) {
      $http.delete('api/web/organizer/events/' + eventId)
        .success(function(data, status) {
          var organizerEmail = AuthFactory.getEmail();
          getEvents(organizerEmail)
          .success(function(data) {
            //Set it on the factory
            setEventData(data);
          }) 
          .error(function(error) {
            console.log(error);
          });
        })
      .error(function(error) {
        console.log(error);
      });
    }

    //Takes an event data object, sends it to server, then refreshes dashboard
    //factory with the latest data (and newly server-generated IDs)
    function sendEventDataToServerAndRefresh (data) {
      var organizerEmail = AuthFactory.getEmail();

      $http.post('/api/web/organizer/' + organizerEmail + '/events', data)
        .success(function(data, status) {
          $rootScope.$emit('eventDataSaved');
          //Get the fresh data from the server, with the server-generated IDs
          //for newly created regions
          getEvents(organizerEmail)
            .success(function(data) {
              //Set it on the factory
              setEventData(data);
            }) 
          .error(function(error) {
            console.log(error);
          });
        })
      .error(function(error) {
        console.log(error);
      });
    }

    //Getter/setter for eventData
    function setEventData (data) {
      eventData = data;
      if (data.length === 0) {
        createNewEvent();
      }
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
