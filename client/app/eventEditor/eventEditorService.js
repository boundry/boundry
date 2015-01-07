angular
  .module('boundry.eventEditor', [])
  .factory('EventEditorFactory', EventEditorFactory);
  
  EventEditorFactory.$inject = ['$http'];

  function EventEditorFactory ($http) {
    var polygonOptions = {
      fillColor: '#ffff00',
      fillOpacity: 0.3,
      strokeWeight: 3,
      clickable: true,
      zIndex: 1,
      editable: true,
      draggable: true,
      strokeColor: 'red'
    };

    var mapOptions = { 
      center: { 
        latitude: 37.789174,
        longitude: -122.419292
      },
      zoom: 14,
      static: false
    };

    var out = {
      mapOptions: mapOptions,
      polygonOptions: polygonOptions,
      Polygon: Polygon,
      savePolygons: savePolygons,
      getPolygons: getPolygons
    };

    return out;

    //Polygon constructor. Takes gMaps path array, converts key strings, adds
    //our default properties, and returns the polygon object
    //Should generate unique hash ID
    function Polygon (pathArray) {
      //Convert keys to 'latitude' and 'longitude', from 'k' and 'B' (gmaps)
      var polygon = {
        region_name: null, //TODO: User sets this
        region_id: null,
        region_attr: {
          coordinates: [],
          fill: null,
          stroke: null
        }, 
        actions: []
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
        opacity: 0.3
      };
      polygon.region_attr.stroke = {
        color: color,
        weight: 3,
        opacity: 0.3
      };
      return polygon;
    }

    //Retrieves all polygons for a given eventId
    function getPolygons (eventId) {
      var scope = this;
      var request = $http({
        method: 'GET', 
        url: '/polygontest'
      });

      return request.then(function(result) {
        //Save polygons to scope. Validate missing data?
        result.data.forEach(function(polygon) {
          scope.polygons.push(polygon);
        });
      }, function(error) {
        console.log(error);
      });
    }

    //POSTs polygon data to server for saving
    //Needs Event ID and user auth
    function savePolygons () {
      var scope = this;
      var request = $http({
        method: 'POST', 
        url: '/polygontest',
        data: JSON.stringify(scope.polygons)
      });

      return request.then (function(success) {
        console.log(success);
      }, function(error) {
        console.log(error);
      });
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
