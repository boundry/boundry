angular
  .module('boundry.analyticsServices', [])
  .factory('AnalyticsFactory', AnalyticsFactory)
  .factory('HeatMapFactory', HeatMapFactory);

function AnalyticsFactory() {
	var views = [{
      name: 'Discrete Bar Chart',
      options: {
        chart: {
          type: 'discreteBarChart',
          height: 450,
          margin : {
              top: 20,
              right: 20,
              bottom: 60,
              left: 55
          },
          x: function(d){ return d.label; },
          y: function(d){ return d.value; },
          showValues: true,
          valueFormat: function(d){
              return d3.format(',.4f')(d);
          },
          transitionDuration: 500,
          xAxis: {
              axisLabel: 'X Axis'
          },
          yAxis: {
              axisLabel: 'Y Axis',
              axisLabelDistance: 30
          }
        }
      },
      data: [{
        key: 'Cumulative Return',
        values: [
            { 'label' : 'A' , 'value' : -29.765957771107 },
            { 'label' : 'B' , 'value' : 0 },
            { 'label' : 'C' , 'value' : 32.807804682612 },
            { 'label' : 'D' , 'value' : 196.45946739256 },
            { 'label' : 'E' , 'value' : 0.19434030906893 },
            { 'label' : 'F' , 'value' : -98.079782601442 },
            { 'label' : 'G' , 'value' : -13.925743130903 },
            { 'label' : 'H' , 'value' : -5.1387322875705 }
            ]
        }]
    },
    {
      name: 'Bar Chart',
      options: {
        chart: {
          type: 'discreteBarChart',
          height: 450,
          margin : {
              top: 20,
              right: 20,
              bottom: 60,
              left: 55
          },
          x: function(d){ return d.label; },
          y: function(d){ return d.value; },
          showValues: true,
          valueFormat: function(d){
              return d3.format(',.4f')(d);
          },
          transitionDuration: 500,
          xAxis: {
              axisLabel: 'X Axis'
          },
          yAxis: {
              axisLabel: 'Y Axis',
              axisLabelDistance: 30
          }
        }
      },
      data: [{
        key: 'Cumulative Return',
        values: [
            { 'label' : 'A' , 'value' : -22 },
            { 'label' : 'B' , 'value' : 0 },
            { 'label' : 'C' , 'value' : 2.807804682612 },
            { 'label' : 'D' , 'value' : 16.45946739256 },
            { 'label' : 'E' , 'value' : 13 },
            { 'label' : 'F' , 'value' : -8.079782601442 },
            { 'label' : 'G' , 'value' : -1.925743130903 },
            { 'label' : 'H' , 'value' : -1.1387322875705 }
            ]
        }]
    },
    {
      name: 'Heat Map'
    }];
  return {views: views}; 
}







function HeatMapFactory() {
	var map, heatmap, pointArray;

	var preprocessedSampleData = 	[
	  {
	  	latitude: 37.782551,
	  	longitude: -122.445368,
	  	timestamp: 0,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.782745,
	  	longitude: -122.444586,
	  	timestamp: 1,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.782842,
	  	longitude: -122.443688,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.782919,
	  	longitude: -122.442815,
	  	timestamp: 4,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.782992,
	  	longitude: -122.442112,
	  	timestamp: 4,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.783100,
	  	longitude: -122.441461,
	  	timestamp: 4,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.783206,
	  	longitude: -122.440829,
	  	timestamp: 4,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.783273,
	  	longitude: -122.440324,
	  	timestamp: 4,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.783316,
	  	longitude: -122.440023,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.783357,
	  	longitude: -122.439794,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.783371,
	  	longitude: -122.439687,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.783368,
	  	longitude: -122.439666,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.783383,
	  	longitude: -122.439594,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.783508,
	  	longitude: -122.439525,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.783842,
	  	longitude: -122.439591,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.784147,
	  	longitude: -122.439668,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.784206,
	  	longitude: -122.439686,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.784386,
	  	longitude: -122.439790,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.784701,
	  	longitude: -122.439902,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.784965,
	  	longitude: -122.439938,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.785010,
	  	longitude: -122.439947,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.785360,
	  	longitude: -122.439952,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.785715,
	  	longitude: -122.440030,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.786117,
	  	longitude: -122.440119,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.786564,
	  	longitude: -122.440209,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},

	  {
	  	latitude: 37.789551,
	  	longitude: -122.449368,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789745,
	  	longitude: -122.449586,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789842,
	  	longitude: -122.449688,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789919,
	  	longitude: -122.449815,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789992,
	  	longitude: -122.449112,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789100,
	  	longitude: -122.449461,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789206,
	  	longitude: -122.449829,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789273,
	  	longitude: -122.449324,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789316,
	  	longitude: -122.449023,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789357,
	  	longitude: -122.439794,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789371,
	  	longitude: -122.439687,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789368,
	  	longitude: -122.439666,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789383,
	  	longitude: -122.439594,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789508,
	  	longitude: -122.439525,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789842,
	  	longitude: -122.439591,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789147,
	  	longitude: -122.439668,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789206,
	  	longitude: -122.439686,
	  	timestamp: 17,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789386,
	  	longitude: -122.439790,
	  	timestamp: 7,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789701,
	  	longitude: -122.439902,
	  	timestamp: 7,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789965,
	  	longitude: -122.439938,
	  	timestamp: 12,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789010,
	  	longitude: -122.439947,
	  	timestamp: 12,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789360,
	  	longitude: -122.439952,
	  	timestamp: 12,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789715,
	  	longitude: -122.449030,
	  	timestamp: 12,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789117,
	  	longitude: -122.449119,
	  	timestamp: 12,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.789564,
	  	longitude: -122.449209,
	  	timestamp: 12,
	  	region: 'sampleRegion1'
	  	},

	  {
	  	latitude: 37.780551,
	  	longitude: -122.440368,
	  	timestamp: 12,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780745,
	  	longitude: -122.440586,
	  	timestamp: 12,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780842,
	  	longitude: -122.440688,
	  	timestamp: 12,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780919,
	  	longitude: -122.440815,
	  	timestamp: 12,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780992,
	  	longitude: -122.440112,
	  	timestamp: 12,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780100,
	  	longitude: -122.440461,
	  	timestamp: 12,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780206,
	  	longitude: -122.440829,
	  	timestamp: 12,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780273,
	  	longitude: -122.440324,
	  	timestamp: 12,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780316,
	  	longitude: -122.440023,
	  	timestamp: 12,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780357,
	  	longitude: -122.430794,
	  	timestamp: 12,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780371,
	  	longitude: -122.430687,
	  	timestamp: 7,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780368,
	  	longitude: -122.430666,
	  	timestamp: 7,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780383,
	  	longitude: -122.430594,
	  	timestamp: 7,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780508,
	  	longitude: -122.430525,
	  	timestamp: 7,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780842,
	  	longitude: -122.430591,
	  	timestamp: 7,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780147,
	  	longitude: -122.430668,
	  	timestamp: 7,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780206,
	  	longitude: -122.430686,
	  	timestamp: 7,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780386,
	  	longitude: -122.430790,
	  	timestamp: 7,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780701,
	  	longitude: -122.430902,
	  	timestamp: 7,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780965,
	  	longitude: -122.430938,
	  	timestamp: 7,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780010,
	  	longitude: -122.430947,
	  	timestamp: 7,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780360,
	  	longitude: -122.430952,
	  	timestamp: 7,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780715,
	  	longitude: -122.440030,
	  	timestamp: 7,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780117,
	  	longitude: -122.440119,
	  	timestamp: 7,
	  	region: 'sampleRegion1'
	  	},
	  {
	  	latitude: 37.780564,
	  	longitude: -122.440209,
	  	timestamp: 7,
	  	region: 'sampleRegion1'
	  	}
	];

	var sampleData = processData(preprocessedSampleData);

// fetch data for event
// filter data
	function filterDataByHour(hour, dataArray) {
		var filteredData = _.filter(dataArray, function(element){
			console.log(hour);
			console.log(element.timestamp);
			return hour <= element.timestamp && element.timestamp < (hour+1);
		});
		return filteredData;
	}

//rerender with filteredData
	function reRender(hour){
		var filteredData = filterDataByHour(hour, preprocessedSampleData);
		var processedData = processData(filteredData);
		pointArray = new google.maps.MVCArray(processedData);
		console.log('hehehehe', pointArray);
		heatmap.setMap(null);
		heatmap = new google.maps.visualization.HeatmapLayer({
		  data: pointArray
		});

		heatmap.setMap(map);
	}

// takes in array tuples, [[lat,long]]
	function processData(dataArray) {
		var outputArray = [];
		for (var i = 0; i < dataArray.length; i++) {
			var dataPoint = new google.maps.LatLng(dataArray[i].latitude, dataArray[i].longitude);
			outputArray.push(dataPoint);
		}
		console.log(outputArray);
		return outputArray;
	}


	function initialize() {
	  var mapOptions = {
	    zoom: 13,
	    center: new google.maps.LatLng(37.774546, -122.433523),
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };

	  map = new google.maps.Map(document.getElementById('map'),
	      mapOptions);

	  pointArray = new google.maps.MVCArray(sampleData);

	  heatmap = new google.maps.visualization.HeatmapLayer({
	    data: pointArray
	  });

	  heatmap.setMap(map);
	}

	function toggleHeatmap() {
	  heatmap.setMap(heatmap.getMap() ? null : map);
	}

	function changeGradient() {
	  var gradient = [
	    'rgba(0, 255, 255, 0)',
	    'rgba(0, 255, 255, 1)',
	    'rgba(0, 191, 255, 1)',
	    'rgba(0, 127, 255, 1)',
	    'rgba(0, 63, 255, 1)',
	    'rgba(0, 0, 255, 1)',
	    'rgba(0, 0, 223, 1)',
	    'rgba(0, 0, 191, 1)',
	    'rgba(0, 0, 159, 1)',
	    'rgba(0, 0, 127, 1)',
	    'rgba(63, 0, 91, 1)',
	    'rgba(127, 0, 63, 1)',
	    'rgba(191, 0, 31, 1)',
	    'rgba(255, 0, 0, 1)'
	  ];
	  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
	}

	function changeRadius() {
	  heatmap.set('radius', heatmap.get('radius') ? null : 20);
	}

	function changeOpacity() {
	  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
	}

  // google.maps.event.addDomListener(window, 'load', initialize);

  return {
  	initialize: initialize,
  	toggleHeatmap: toggleHeatmap,
  	changeGradient: changeGradient,
  	changeRadius: changeRadius,
  	changeOpacity: changeOpacity,
  	reRender: reRender
  }; 
}