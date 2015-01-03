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

//We should render a map ASAP, and then async get the address
$(document).ready(function() {
  setMap(); //give it lt, lg from form later
});

//TODO: isolate address retrieval functionality and separate from rendering functionality
var getAddress = function() {
  var address = $('#addressInput').val(); // Get address from input
  var geocoder = new google.maps.Geocoder(); //Instantiate geocoder

  var mapOptions = {
    center: new google.maps.LatLng(37.789174, -122.419292),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map($('#map')[0], mapOptions); //Create a map and pass it our 'map' html element

  geocoder.geocode( { 'address': address}, function(results, status) { //Geocode the grabbed address
      if (status === google.maps.GeocoderStatus.OK) {
        console.log(results);
        map.setCenter(results[0].geometry.location); //Set the center of our map
        mapVar.drawingManager.setMap(map); //Render the map
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
};

//Largely redundant code. When called, it should look for an address data point
//and if it hasn't been set it should default to something. getAddress() should
//merely set the data point. 
//An event listener should then listen for that data change and fire this
//function.
function setMap(lt, lg) {
  var lat = lt || 37.789174;
  var lng = lg || -122.419292;

  var mapCanvas = $('#map')[0]; //Grab our html map element

  var mapOptions = { //Same as above
    center: new google.maps.LatLng(lat, lng),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(mapCanvas, mapOptions); //Same as above

  mapVar.drawingManager.setMap(map); //Render, same as above

  google.maps.event.addListener(mapVar.drawingManager, 'overlaycomplete', function(event){
      // vertexListener(event.overlay);
      //Grab path and push to array in mapVar
      mapVar.boundaries.push(event.overlay.getPath().getArray());
      $('#regionList').append('<div>'+ event.overlay.getPath().getArray() +'</div>'); //Append path to DOM

  });
}
