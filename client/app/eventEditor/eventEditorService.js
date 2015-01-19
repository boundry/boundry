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
      streetViewControl: false,
      styles: [{'stylers':[{'saturation':-100},{'gamma':1}]},{'elementType':'labels.text.stroke','stylers':[{'visibility':'off'}]},{'featureType':'poi.business','elementType':'labels.text','stylers':[{'visibility':'off'}]},{'featureType':'poi.business','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'poi.place_of_worship','elementType':'labels.text','stylers':[{'visibility':'off'}]},{'featureType':'poi.place_of_worship','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'road','elementType':'geometry','stylers':[{'visibility':'simplified'}]},{'featureType':'water','stylers':[{'visibility':'on'},{'saturation':50},{'gamma':0},{'hue':'#50a5d1'}]},{'featureType':'administrative.neighborhood','elementType':'labels.text.fill','stylers':[{'color':'#333333'}]},{'featureType':'road.local','elementType':'labels.text','stylers':[{'weight':0.5},{'color':'#333333'}]},{'featureType':'transit.station','elementType':'labels.icon','stylers':[{'gamma':1},{'saturation':50}]}]
    };


    //EXPORTS
    return {
      basicOptions: basicOptions,
      extraOptions: extraOptions,

      polygonOptions: polygonOptions,
      Polygon: Polygon,

      deletePolygon: deletePolygon, //TODO: We use region / polygon interchangeably; we should be consistent
      grabEventData: grabEventData
    };

    //Polygon constructor. Takes gMaps path array, converts key strings, adds
    //our default properties, and returns the polygon object
    //Should generate unique hash ID
    function Polygon (pathArray) {
      //Convert keys to 'latitude' and 'longitude', from 'k' and 'B' (gmaps)
      this.region_name = null; //TODO: User sets this
      this.id = null;

      var coordinates = [];
      pathArray.forEach(function(latlong) {
        coordinates.push({
          'latitude': latlong.k, //TODO: Brittle. What if 'k' and 'B', change?
          'longitude': latlong.B
        });
      });

      this.region_attr = {
        coordinates: coordinates,
        fill: null,
        stroke: null
      };

      //Generate a random color
      var color = getRandomColor();
      this.region_attr.fill = {
        color: color,
        opacity: 0.6
      };
      this.region_attr.stroke = {
        color: color,
        weight: 3,
        opacity: 0.2
      };
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

    function deletePolygon(regionId) {
      console.log('deleting ', regionId);
      //If regionId is not null, then make server request
      if (regionId === undefined || regionId === null) {
        console.log('No need to delete region with null ID');
      } else {
        $http.delete('api/web/organizer/regions/' + regionId)
          .success(function(data, status) {
            console.log('Deleted Region, ', regionId);
          })
          .error(function(error) {
            console.log(error);
          });
      }
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
