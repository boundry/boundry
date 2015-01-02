var mapVar = {
  drawingManager: new google.maps.drawing.DrawingManager({
    //drawingMode: the one that is selected
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      drawingModes:[
        google.maps.drawing.OverlayType.POLYGON
      ]
    },
    circleOptions: {
    fillColor: '#ffff00',
    fillOpacity: 1,
    strokeWeight: 5,
    clickable: true,
    zIndex: 1,
    editable: true
    }
  }),
  boundaries: []
};

$(document).ready(function() {
  setMap(); //give it lt, lg from form later
});

var getAddress = function() {
  var address = $('#addressInput').val();
  var geocoder = new google.maps.Geocoder();
  var mapOptions = {
    center: new google.maps.LatLng(37.789174, -122.419292),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map($('#map')[0], mapOptions);
  geocoder.geocode( { 'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log(results);
        map.setCenter(results[0].geometry.location);
        mapVar.drawingManager.setMap(map);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
};
//creates map
function setMap(lt, lg) {
  var lat = lt || 37.789174;
  var lng = lg || -122.419292;

  var mapCanvas = $('#map')[0];
  var mapOptions = {
    center: new google.maps.LatLng(lat, lng),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);

  mapVar.drawingManager.setMap(map);
  google.maps.event.addListener(mapVar.drawingManager, 'overlaycomplete', function(event){
      // vertexListener(event.overlay);
      mapVar.boundaries.push(event.overlay.getPath().getArray());
      $('#regionList').append('<div>'+ event.overlay.getPath().getArray() +'</div>');

  });
}