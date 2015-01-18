angular
  .module('boundry.analytics')
  .factory('HeatMapFactory', HeatMapFactory)
  .factory('AnalyticsFactory', AnalyticsFactory);

AnalyticsFactory.$inject = ['HeatMapFactory'];

function AnalyticsFactory(HeatMapFactory) {
  var lineChartData = {};
  var barChartData = {};
  var preprocessedSampleData = HeatMapFactory.preprocessedSampleData;
  var regions = ['sampleRegion1', 'sampleRegion2', 'sampleRegion3', 'sampleRegion4'];

	function prepareLineChartData() {
		var objectOfRegionData = filterDataByRegion(preprocessedSampleData);
		updateAllLineChartData(objectOfRegionData);
	}

  function prepareBarChartData() {
    var objectOfRegionData = filterDataByRegion(preprocessedSampleData);
    updateAllBarChartData(objectOfRegionData);
  }

	// filter data by region
	function filterDataByRegion(dataArray) {
		var objectOfRegionData = {};
		for (var i = 0; i < dataArray.length; i++) {
			if (!objectOfRegionData[dataArray[i].region]) {
				objectOfRegionData[dataArray[i].region] = [];
			}
			objectOfRegionData[dataArray[i].region].push(dataArray[i]);
		}
		return objectOfRegionData;
	}

  function updateAllLineChartData(dataObject) {
    for (var region in dataObject) {
      lineChartData[region] = generateLineChartData(dataObject[region]);
    }
  }

  function updateAllBarChartData(dataObject) {
    for (var region in dataObject) {
      barChartData[region] = generateBarChartData(dataObject[region]);
    }
  }

  function generateLineChartData(dataArray) {
    var objectOfEachTime = {};
    var processedArray = [];

    _.each(dataArray, function(element) {
      if (objectOfEachTime[element.timestamp]) {
        objectOfEachTime[element.timestamp]++;
      } else {
        objectOfEachTime[element.timestamp] = 1;
      }
    });

    for (var time in objectOfEachTime) {
      var temp = [];
      temp.push(parseInt(time));
      temp.push(objectOfEachTime[time]);
      processedArray.push(temp);
    }

    return processedArray;
  }

  function generateBarChartData(dataArray) {
    var objectOfEachTime = {};
    var processedArray = [];

    _.each(dataArray, function(element) {
      if (objectOfEachTime[element.timestamp]) {
        objectOfEachTime[element.timestamp]++;
      } else {
        objectOfEachTime[element.timestamp] = 1;
      }
    });

    return objectOfEachTime;
  }

	function numberOfUniqueUsers(dataArray) {
		var users = {};
		_.each(dataArray, function(element) {
			if (!users[element.userId]) {
				users[element.userId] = true;
			}
		});
		return Object.keys(users).length;
	}

	function filterDataByHour(hour, dataArray) {
		var filteredData = _.filter(dataArray, function(element){
			return hour <= element.timestamp && element.timestamp < (hour+1);
		});
		return filteredData;
	}

  var originalFilteredLineChartData = {};

  function renderLineChart(rangeArray) {
    var min = rangeArray[0];
    var max = rangeArray[1];
    var finalData = views[0].data;

    for (var i = 0; i < finalData.length; i++) {
      var filteredData = _.filter(lineChartData[finalData[i].key], function(tuple) {
        var time = tuple[0];
        return (min <= time && time <= max);
      });
      finalData[i].values = filteredData;
    }
  }

  function renderBarChart(time) {
    var finalData = views[1].data[0].values;
    for (var i = 0; i < finalData.length; i++) {
      finalData[i].value = barChartData[finalData[i].label][time];
    }
  }


	// filter data by time interval min < time < max
	function filterDataByTimeInterval(dataArray, min, max) {
		var filteredArray = [];
		for (var i = 0; i < dataArray.length; i++) {
			if (min <= dataArray[i].timestamp && dataArray[i].timestamp < max) {
				filteredArray.push(dataArray[i]);
			}
		}
		return filteredArray;
	}

  function changeMinutesToHour(minutes) {

    var time = changeToModTwelve( Math.floor(minutes/60) ) + //hour
    ':' +
    pad( minutes % 60 ) + //minutes
    determineAmOrPm( Math.floor(minutes/60) );
    
    function pad(n) {
        return (n < 10) ? ('0' + n) : n;
    }

    function changeToModTwelve(number) {
      if (number === 0 || number === 12 || number === 24) {
        return 12;
      } else {
        return number % 12;
      }
    }

    function determineAmOrPm(number) {
      if ( (0 <= number && number < 12) || number === 24) {
        return 'AM';
      } else if (12 <= number && number < 24) {
        return 'PM';
      }
    }

    return time;
  }

	var views = [{
      name: 'Line Chart',
      options: {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 65
                },
                x: function(d){ return d[0]; },
                y: function(d){ return d[1]; },
                average: function(d) { return d.mean; },

                color: d3.scale.category10().range(),
                transitionDuration: 1,
                useInteractiveGuideline: true,
                clipVoronoi: false,

                xAxis: {
                    axisLabel: 'Time',
                    tickFormat: function(d) {
                      return changeMinutesToHour(d);
                    	// return d3.format('')(d);
                        // return d3.time.format('%m/%d/%y')(new Date(d));
                    },
                    showMaxMin: false,
                    staggerLabels: true
                },

                yAxis: {
                    axisLabel: '# People',
                    tickFormat: function(d){
                        return d3.format('')(d);
                    },
                    axisLabelDistance: 20,
                    showMaxMin: false
                }
                // xDomain: [0, 24]
            }
        },
      data: [
            {
                key: 'First Stage',
                values: [
                ],
                mean: 7
            },
            {
                key: 'Second Stage',
                values: [
                ],
                mean: 12
            },
            {
                key: 'Entrance',
                values: [
                ],
                mean: 12
            },
            {
                key: 'Concessions',
                values: [
                ],
                mean: 12
            },
        ]
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
              return d3.format(',.0f')(d);
          },
          transitionDuration: 50,
          xAxis: {
              axisLabel: 'Regions'
          },
          yAxis: {
              tickFormat: function(d){
                  return d3.format('')(d);
              },
              axisLabel: 'Number of People',
              axisLabelDistance: 30,
              showMaxMin: false
          }
        }
      },
      data: [{
        key: 'Cumulative Return',
        values: [
            { 'label' : 'First Stage' , 'value' : 0 },
            { 'label' : 'Second Stage' , 'value' : 0 },
            { 'label' : 'Entrance' , 'value' : 0 },
            { 'label' : 'Concessions' , 'value' : 0 }
            ]
        }]
    },
    {
      name: 'Heat Map'
    }];
  return {views: views,
  	regions: regions,
  	filterDataByRegion: filterDataByRegion,
  	filterDataByTimeInterval: filterDataByTimeInterval,
    prepareLineChartData: prepareLineChartData,
  	prepareBarChartData: prepareBarChartData,
    renderLineChart: renderLineChart,
    renderBarChart: renderBarChart}; 
}



function HeatMapFactory() {
	var map, heatmap, pointArray;

	var sampleData = processData(preprocessedSampleData);

  var regionLatLongs = {
    firstStage: {
      latMin: 37.768643,
      latMax: 37.767727,
      longMin: -122.495531,
      longMax: -122.493814
    },

    concessions: {
      latMin: 37.769593,
      latMax: 37.767235,
      longMin: -122.493814,
      longMax: -122.491883
    },

    entrance: {
      latMin: 37.769627,
      latMax: 37.768745,
      longMin: -122.491883,
      longMax: -122.491046
    },

    secondStage: {
      latMin: 37.768728,
      latMax: 37.767269,
      longMin: -122.491883,
      longMax: -122.490188
    }
  };

// fetch data for event

//rerender with filteredData
  function renderHeatmap(timePoint){
    var filteredData = filterDataByTime(timePoint, preprocessedSampleData);
    var processedData = processData(filteredData);
    pointArray = new google.maps.MVCArray(processedData);
    var oldHeatmap = heatmap;
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: pointArray
    });

    heatmap.setMap(map);

    setTimeout(function() {oldHeatmap.setMap(null);}, 50);
  }

// filter data
	function filterDataByTime(timePoint, dataArray) {
		var filteredData = _.filter(dataArray, function(element){
			return (timePoint - 1/2) <= element.timestamp && element.timestamp < (timePoint + 1/2);
      //1 is the bucket size
		});
		return filteredData;
	}

// takes in array tuples, [[lat,long]]
	function processData(dataArray) {
		var outputArray = [];
		for (var i = 0; i < dataArray.length; i++) {
			var dataPoint = new google.maps.LatLng(dataArray[i].latitude, dataArray[i].longitude);
			outputArray.push(dataPoint);
		}
		return outputArray;
	}


	function initialize() {
    var region1, region2, region3, region4;
    var filteredData = filterDataByTime(1020, preprocessedSampleData); //1020 is starting point
    var processedData = processData(filteredData);

	  var mapOptions = {
	    zoom: 17,
	    center: new google.maps.LatLng(37.768066, -122.492953),
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };

	  map = new google.maps.Map(document.getElementById('map'),
	      mapOptions);

    //set polygons on map
    setPolygons(regionLatLongs);


    //set heat map
    pointArray = new google.maps.MVCArray(processedData);

    heatmap = new google.maps.visualization.HeatmapLayer({
      data: pointArray
    });

    heatmap.setMap(map);


	}

	var initializeOnce = _.once(initialize);

  function setPolygons(latLongsObject) {
    // var colors = ['blue', 'red', 'green', 'purple', 'orange', 'yellow'];
    for (var region in latLongsObject) {
      var latMin = latLongsObject[region].latMin,
          latMax = latLongsObject[region].latMax,
          longMin = latLongsObject[region].longMin,
          longMax = latLongsObject[region].longMax;

      var tempCoords = [
        new google.maps.LatLng(latMax, longMin),
        new google.maps.LatLng(latMax, longMax),
        new google.maps.LatLng(latMin, longMax),
        new google.maps.LatLng(latMin, longMin),
        new google.maps.LatLng(latMax, longMin)
      ];

      var tempLabel = region;

      makePolygon(tempCoords, tempLabel);
    }

      function makePolygon(polyCoords, polyLabel) {
        var marker = new MarkerWithLabel({
         position: new google.maps.LatLng(0,0),
         draggable: false,
         raiseOnDrag: false,
         map: map,
         labelContent: polyLabel,
         labelAnchor: new google.maps.Point(30, 20),
         labelClass: 'labels', // the CSS class for the label
         labelStyle: {opacity: 1.0},
         icon: 'http://placehold.it/1x1',
         visible: false
        });

        var tempRegion = new google.maps.Polygon({
          paths: polyCoords,
          strokeColor: 'black',
          strokeOpacity: 0.2,
          strokeWeight: 4,
          fillColor: 'red',
          fillOpacity: 0.1,
          map: map
        });

        google.maps.event.addListener(tempRegion, 'mousemove', function(event) {
          marker.setPosition(event.latLng);
          marker.setVisible(true);
        });

        google.maps.event.addListener(tempRegion, 'mouseout', function(event) {
          marker.setVisible(false);
        });
        
        // function randomUniqueColor() {
        //   var index = Math.floor(Math.random() * colors.length);
        //   console.log(colors);
        //   var color = colors.splice(1, 1);
        //   console.log(colors, color);
        //   return color[0];
        // }
      }

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
  	initializeOnce: initializeOnce,
  	toggleHeatmap: toggleHeatmap,
  	changeGradient: changeGradient,
  	changeRadius: changeRadius,
  	changeOpacity: changeOpacity,
  	renderHeatmap: renderHeatmap,
  	preprocessedSampleData: preprocessedSampleData
  }; 
}