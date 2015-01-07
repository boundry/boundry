angular
  .module('boundry.eventEditor', [])
  .factory('EventEditorFactory', EventEditorFactory);
  
  EventEditorFactory.$inject = ['$http'];

  function EventEditorFactory ($http) {
    var polygonOptions = {
      fillColor: '#ffff00', //TODO: Make random
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
      polygonOptions: polygonOptions
    };

    return out;

    //var mapVar = {
      //drawingManager: new google.maps.drawing.DrawingManager({
        ////drawingMode: the one that is selected
        //drawingMode: google.maps.drawing.OverlayType.POLYGON,
        //drawingControl: true,
        //drawingControlOptions: {
          //drawingModes:[
            //google.maps.drawing.OverlayType.POLYGON
          //]
        //},
        ////TODO: Consider making this whole thing a provider so we can set this
        ////stuff in app.config
        //circleOptions: {
          //fillColor: '#ffff00',
          //fillOpacity: 1,
          //strokeWeight: 5,
          //clickable: true,
          //zIndex: 1,
          //editable: true
        //}
      //}),
      //boundaries: []
    //};

    //var mapOptions = {
      //center: new google.maps.LatLng(37.789174, -122.419292),
      //zoom: 15,
      //mapTypeId: google.maps.MapTypeId.ROADMAP
    //};

    //var currLocation;

    //var out = {
      //getAddresses: getAddresses,
      //renderMap: renderMap
    //};
    //return out;


    //function getAddresses() {
      //console.log("called");
      //var address = $('#addressInput').val(); // Get address from input
      //var geocoder = new google.maps.Geocoder(); //Instantiate geocoder

      //var map = new google.maps.Map($('#map')[0], mapOptions); //Create a map and pass it our 'map' html element

      //geocoder.geocode( { 'address': address}, function(results, status) { //Geocode the grabbed address
        //if (status === google.maps.GeocoderStatus.OK) {
          //console.log("ADDRESS RESULTS", results);
          //currLocation = results[0];
          //return results;
        //} else {
          //console.log('Geocode failed: ' + status);
        //}
      //});
    //};

      ////geocoder.geocode( { 'address': address}, function(results, status) { //Geocode the grabbed address
        ////if (status === google.maps.GeocoderStatus.OK) {
          ////console.log("ADDRESS RESULTS", results);
          ////map.setCenter(results[0].geometry.location); //Set the center of our map
          ////mapVar.drawingManager.setMap(map); //Render the map
        ////} else {
          ////alert('Geocode was not successful for the following reason: ' + status);
        ////}
      ////});
    ////Largely redundant code. When called, it should look for an address data point
    ////and if it hasn't been set it should default to something. getAddresses() should
    ////merely set the data point. 
    ////An event listener should then listen for that data change and fire this
    ////function.
    //function renderMap() {

      //var mapCanvas = $('#map')[0]; //Grab our html map element

      //var map = new google.maps.Map(mapCanvas, mapOptions); //Same as above

      //if (currLocation !== undefined) {
        //map.setCenter(currLocation.geometry.location);
      //}
      //mapVar.drawingManager.setMap(map); //Render, same as above

      //google.maps.event.addListener(mapVar.drawingManager, 'overlaycomplete', function(event){
        //// vertexListener(event.overlay);
        ////Grab path and push to array in mapVar
        //mapVar.boundaries.push(event.overlay.getPath().getArray());
        //$('#regionList').append('<div>'+ event.overlay.getPath().getArray() +'</div>'); //Append path to DOM

      //});
    //}

}
