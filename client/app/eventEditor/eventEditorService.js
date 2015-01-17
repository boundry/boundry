angular
  .module('boundry.eventEditor', [])
  .factory('EventEditorFactory', EventEditorFactory);
  
  EventEditorFactory.$inject = ['AuthFactory', '$http', 'EventDashboardFactory'];

  function EventEditorFactory (AuthFactory, $http, EventDashboardFactory) {
    //TODO: Break all these options into a separate config file
    var polygonOptions = {
      fillColor: '#ffff00',
      fillOpacity: 0.6,
      strokeWeight: 3,
      clickable: true,
      zIndex: 1,
      editable: true,
      draggable: true,
      strokeColor: 'red'
    };

    var basicOptions = { 
      center: { 
        latitude: 37.789174,
        longitude: -122.419292
      },
      zoom: 14,
    };

    var extraOptions = {
      zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.LARGE,
                    position: google.maps.ControlPosition.RIGHT_CENTER
                },
      panControl: false,
      streetViewControl: false
    };


    //EXPORTS
    return {
      basicOptions: basicOptions,
      extraOptions: extraOptions,

      polygonOptions: polygonOptions,
      Polygon: Polygon,

      grabEventData: grabEventData
    };

    //Polygon constructor. Takes gMaps path array, converts key strings, adds
    //our default properties, and returns the polygon object
    //Should generate unique hash ID
    function Polygon (pathArray) {
      //Convert keys to 'latitude' and 'longitude', from 'k' and 'B' (gmaps)
      var polygon = {
        region_name: null, //TODO: User sets this
        id: null,
        region_attr: {
          coordinates: [],
          fill: null,
          stroke: null
        }, 
      };
      pathArray.forEach(function(latlong) {
        polygon.region_attr.coordinates.push({
          'latitude': latlong.k, //TODO: Brittle. What if 'k' and 'B', change?
          'longitude': latlong.B
        });
      });

      //Generate a random color
      var color = getRandomColor();
      polygon.region_attr.fill = {
        color: color,
        opacity: 0.6
      };
      polygon.region_attr.stroke = {
        color: color,
        weight: 3,
        opacity: 0.2
      };
      return polygon;
    }

    //Gets event data for specific event from Dashboard Factory
    function grabEventData(eventId) {
      //Grab all event data from Dashboard Service
      var allEvents = EventDashboardFactory.getEventData();

      //Match with the given eventId
      for (var i = 0; i < allEvents.length; i++) {
        if (parseInt(eventId) === allEvents[i].id) {
          return allEvents[i];
        }
      }
      console.log('Could not get event data for event id: ', eventId);
    }
    
    function getRandomColor() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
}
