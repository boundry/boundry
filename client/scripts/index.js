$(document).ready(function() {
  setMap(); //give it lt, lg from form later


});

//creates map
function setMap(lt, lg) {
  var lat = 37.789174;
  var lng = -122.419292;
  // var lat = lt || 37.789174;
  // var lng = lg || -122.419292;
  var mapCanvas = document.getElementById('map');
  var mapOptions = {
    center: new google.maps.LatLng(lat, lng),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);

  var drawingManager = new google.maps.drawing.DrawingManager({
    //drawingMode: the one that is selected
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      drawingModes:[
        google.maps.drawing.OverlayType.POLYGON
      ]
    },
    // markerOptions: {
    //   icon: 'images/something.png'
    // }
  });
  drawingManager.setMap(map);
  google.maps.event.addListener(drawingManager, "overlaycomplete", function(event){
      vertexListener(event.overlay);
      $('#vertices').val(event.overlay.getPath().getArray());
  });
  function vertexListener(overlay) {
    google.maps.event.addListener(drawingManager, "mouseup", function(event) {
      $('#vertices').val(event.overlay.getPath().getArray());
    });
  };
};

