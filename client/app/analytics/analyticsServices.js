angular
  .module('boundry.analyticsServices', [])
  .factory('HeatMapFactory', HeatMapFactory)
  .factory('AnalyticsFactory', AnalyticsFactory);

AnalyticsFactory.$inject = ['HeatMapFactory'];

function AnalyticsFactory(HeatMapFactory) {
  var lineChartData = {};
  var preprocessedSampleData = HeatMapFactory.preprocessedSampleData;
  var regions = ['sampleRegion1', 'sampleRegion2', 'sampleRegion3', 'sampleRegion4'];

	function prepareData() {
		var objectOfRegionData = filterDataByRegion(preprocessedSampleData);
		updateAllLineChartData(objectOfRegionData);
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

	function generateLineChartData(dataArray) {
		var processedArray = [];
		for (var i = 0; i < 24; i++) {
			var temp = [];
			var users = {};

			var timeFiltered = _.filter(dataArray, function(element) {
				return i <= element.timestamp && element.timestamp < (i+1);
			});
			temp.push(i);
			temp.push(numberOfUniqueUsers(timeFiltered));
			processedArray.push(temp);
		}
		return processedArray;
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
        var time = tuple[0] * 60; // turn into minutes
        return (min <= time && time <= max);
      });
      finalData[i].values = filteredData;
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
                    	return d3.format('')(d);
                        // return d3.time.format('%m/%d/%y')(new Date(d))
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
                key: 'sampleRegion1',
                values: [
                ],
                mean: 7
            },
            {
                key: 'sampleRegion2',
                values: [
                ],
                mean: 12
            },
            {
                key: 'sampleRegion3',
                values: [
                ],
                mean: 12
            },
            {
                key: 'sampleRegion4',
                values: [
                ],
                mean: 12
            }
            // {
            //     key: 'Short',
            //     values: [ [ 1083297600000 , -0.77078283705125] , [ 1085976000000 , -1.8356366650335] , [ 1088568000000 , -5.3121322073127] , [ 1091246400000 , -4.9320975829662] , [ 1093924800000 , -3.9835408823225] , [ 1096516800000 , -6.8694685316805] , [ 1099195200000 , -8.4854877428545] , [ 1101790800000 , -15.933627197384] , [ 1104469200000 , -15.920980069544] , [ 1107147600000 , -12.478685045651] , [ 1109566800000 , -17.297761889305] , [ 1112245200000 , -15.247129891020] , [ 1114833600000 , -11.336459046839] , [ 1117512000000 , -13.298990907415] , [ 1120104000000 , -16.360027000056] , [ 1122782400000 , -18.527929522030] , [ 1125460800000 , -22.176516738685] , [ 1128052800000 , -23.309665368330] , [ 1130734800000 , -21.629973409748] , [ 1133326800000 , -24.186429093486] , [ 1136005200000 , -29.116707312531] , [ 1138683600000 , -37.188037874864] , [ 1141102800000 , -34.689264821198] , [ 1143781200000 , -39.505932105359] , [ 1146369600000 , -45.339572492759] , [ 1149048000000 , -43.849353192764] , [ 1151640000000 , -45.418353922571] , [ 1154318400000 , -44.579281059919] , [ 1156996800000 , -44.027098363370] , [ 1159588800000 , -41.261306759439] , [ 1162270800000 , -47.446018534027] , [ 1164862800000 , -53.413782948909] , [ 1167541200000 , -50.700723647419] , [ 1170219600000 , -56.374090913296] , [ 1172638800000 , -61.754245220322] , [ 1175313600000 , -66.246241587629] , [ 1177905600000 , -75.351650899999] , [ 1180584000000 , -81.699058262032] , [ 1183176000000 , -82.487023368081] , [ 1185854400000 , -86.230055113277] , [ 1188532800000 , -84.746914818507] , [ 1191124800000 , -100.77134971977] , [ 1193803200000 , -109.95435565947] , [ 1196398800000 , -99.605672965057] , [ 1199077200000 , -99.607249394382] , [ 1201755600000 , -94.874614950188] , [ 1204261200000 , -105.35899063105] , [ 1206936000000 , -106.01931193802] , [ 1209528000000 , -110.28883571771] , [ 1212206400000 , -119.60256203030] , [ 1214798400000 , -115.62201315802] , [ 1217476800000 , -106.63824185202] , [ 1220155200000 , -99.848746318951] , [ 1222747200000 , -85.631219602987] , [ 1225425600000 , -63.547909262067] , [ 1228021200000 , -59.753275364457] , [ 1230699600000 , -63.874977883542] , [ 1233378000000 , -56.865697387488] , [ 1235797200000 , -54.285579501988] , [ 1238472000000 , -56.474659581885] , [ 1241064000000 , -63.847137745644] , [ 1243742400000 , -68.754247867325] , [ 1246334400000 , -69.474257009155] , [ 1249012800000 , -75.084828197067] , [ 1251691200000 , -77.101028237237] , [ 1254283200000 , -80.454866854387] , [ 1256961600000 , -78.984349952220] , [ 1259557200000 , -83.041230807854] , [ 1262235600000 , -84.529748348935] , [ 1264914000000 , -83.837470195508] , [ 1267333200000 , -87.174487671969] , [ 1270008000000 , -90.342293007487] , [ 1272600000000 , -93.550928464991] , [ 1275278400000 , -85.833102140765] , [ 1277870400000 , -79.326501831592] , [ 1280548800000 , -87.986196903537] , [ 1283227200000 , -85.397862121771] , [ 1285819200000 , -94.738167050020] , [ 1288497600000 , -98.661952897151] , [ 1291093200000 , -99.609665952708] , [ 1293771600000 , -103.57099836183] , [ 1296450000000 , -104.04353411322] , [ 1298869200000 , -108.21382792587] , [ 1301544000000 , -108.74006900920] , [ 1304136000000 , -112.07766650960] , [ 1306814400000 , -109.63328199118] , [ 1309406400000 , -106.53578966772] , [ 1312084800000 , -103.16480871469] , [ 1314763200000 , -95.945078001828] , [ 1317355200000 , -81.226687340874] , [ 1320033600000 , -90.782206596168] , [ 1322629200000 , -89.484445370113] , [ 1325307600000 , -88.514723135326] , [ 1327986000000 , -93.381292724320] , [ 1330491600000 , -97.529705609172] , [ 1333166400000 , -99.520481439189] , [ 1335758400000 , -99.430184898669] , [ 1338436800000 , -93.349934521973] , [ 1341028800000 , -95.858475286491] , [ 1343707200000 , -95.522755836605] , [ 1346385600000 , -98.503848862036] , [ 1348977600000 , -101.49415251896] , [ 1351656000000 , -101.50099325672] , [ 1354251600000 , -99.487094927489]]
            //     ,
            //     mean: -60
            // },


            // {
            //     key: 'Gross',
            //     mean: 125,
            //     values: [ [ 1083297600000 , -3.7454058855943] , [ 1085976000000 , -3.6096667436314] , [ 1088568000000 , -0.8440003934950] , [ 1091246400000 , 2.0921565171691] , [ 1093924800000 , 3.5874194844361] , [ 1096516800000 , 13.742776534056] , [ 1099195200000 , 13.212577494462] , [ 1101790800000 , 24.567562260634] , [ 1104469200000 , 34.543699343650] , [ 1107147600000 , 36.438736927704] , [ 1109566800000 , 46.453174659855] , [ 1112245200000 , 43.825369235440] , [ 1114833600000 , 32.036699833653] , [ 1117512000000 , 41.191928040141] , [ 1120104000000 , 40.301151852023] , [ 1122782400000 , 54.922174023466] , [ 1125460800000 , 49.538009616222] , [ 1128052800000 , 61.911998981277] , [ 1130734800000 , 56.139287982733] , [ 1133326800000 , 71.780099623014] , [ 1136005200000 , 78.474613851439] , [ 1138683600000 , 90.069363092366] , [ 1141102800000 , 87.449910167102] , [ 1143781200000 , 87.030640692381] , [ 1146369600000 , 87.053437436941] , [ 1149048000000 , 76.263029236276] , [ 1151640000000 , 72.995735254929] , [ 1154318400000 , 63.349908186291] , [ 1156996800000 , 66.253474132320] , [ 1159588800000 , 75.943546587481] , [ 1162270800000 , 93.889549035453] , [ 1164862800000 , 106.18074433002] , [ 1167541200000 , 116.39729488562] , [ 1170219600000 , 129.09440567885] , [ 1172638800000 , 123.07049577958] , [ 1175313600000 , 129.38531055124] , [ 1177905600000 , 132.05431954171] , [ 1180584000000 , 148.86060871993] , [ 1183176000000 , 157.06946698484] , [ 1185854400000 , 155.12909573880] , [ 1188532800000 , 155.14737474392] , [ 1191124800000 , 159.70646945738] , [ 1193803200000 , 166.44021916278] , [ 1196398800000 , 159.05963386166] , [ 1199077200000 , 151.38121182455] , [ 1201755600000 , 132.02441123108] , [ 1204261200000 , 121.93110210702] , [ 1206936000000 , 112.64545460548] , [ 1209528000000 , 122.17722331147] , [ 1212206400000 , 133.65410878087] , [ 1214798400000 , 120.20304048123] , [ 1217476800000 , 123.06288589052] , [ 1220155200000 , 125.33598074057] , [ 1222747200000 , 103.50539786253] , [ 1225425600000 , 85.917420810943] , [ 1228021200000 , 71.250132356683] , [ 1230699600000 , 71.308439405118] , [ 1233378000000 , 52.287271484242] , [ 1235797200000 , 30.329193047772] , [ 1238472000000 , 44.133440571375] , [ 1241064000000 , 77.654211210456] , [ 1243742400000 , 73.749802969425] , [ 1246334400000 , 70.337666717565] , [ 1249012800000 , 102.69722724876] , [ 1251691200000 , 117.63589109350] , [ 1254283200000 , 128.55351774786] , [ 1256961600000 , 119.21420882198] , [ 1259557200000 , 139.32979337027] , [ 1262235600000 , 149.71606246357] , [ 1264914000000 , 144.42340669795] , [ 1267333200000 , 161.64446359053] , [ 1270008000000 , 180.23071774437] , [ 1272600000000 , 199.09511476051] , [ 1275278400000 , 180.10778306442] , [ 1277870400000 , 158.50237284410] , [ 1280548800000 , 177.57353623850] , [ 1283227200000 , 162.91091118751] , [ 1285819200000 , 183.41053361910] , [ 1288497600000 , 194.03065670573] , [ 1291093200000 , 201.23297214328] , [ 1293771600000 , 222.60154078445] , [ 1296450000000 , 233.35556801977] , [ 1298869200000 , 231.22452435045] , [ 1301544000000 , 237.84432503045] , [ 1304136000000 , 235.55799131184] , [ 1306814400000 , 232.11873570751] , [ 1309406400000 , 226.62381538123] , [ 1312084800000 , 219.34811113539] , [ 1314763200000 , 198.69242285581] , [ 1317355200000 , 168.90235629066] , [ 1320033600000 , 202.64725756733] , [ 1322629200000 , 203.05389378105] , [ 1325307600000 , 204.85986680865] , [ 1327986000000 , 229.77085616585] , [ 1330491600000 , 239.65202435959] , [ 1333166400000 , 242.33012622734] , [ 1335758400000 , 234.11773262149] , [ 1338436800000 , 221.47846307887] , [ 1341028800000 , 216.98308827912] , [ 1343707200000 , 218.37781386755] , [ 1346385600000 , 229.39368622736] , [ 1348977600000 , 230.54656412916] , [ 1351656000000 , 243.06087025523] , [ 1354251600000 , 244.24733578385]]
            // },
            // {
            //     key: 'S&P 1500',
            //     values: [ [ 1083297600000 , -1.7798428181819] , [ 1085976000000 , -0.36883324836999] , [ 1088568000000 , 1.7312581046040] , [ 1091246400000 , -1.8356125950460] , [ 1093924800000 , -1.5396564170877] , [ 1096516800000 , -0.16867791409247] , [ 1099195200000 , 1.3754263993413] , [ 1101790800000 , 5.8171640898041] , [ 1104469200000 , 9.4350145241608] , [ 1107147600000 , 6.7649081510160] , [ 1109566800000 , 9.1568499314776] , [ 1112245200000 , 7.2485090994419] , [ 1114833600000 , 4.8762222306595] , [ 1117512000000 , 8.5992339354652] , [ 1120104000000 , 9.0896517982086] , [ 1122782400000 , 13.394644048577] , [ 1125460800000 , 12.311842010760] , [ 1128052800000 , 13.221003650717] , [ 1130734800000 , 11.218481009206] , [ 1133326800000 , 15.565352598445] , [ 1136005200000 , 15.623703865926] , [ 1138683600000 , 19.275255326383] , [ 1141102800000 , 19.432433717836] , [ 1143781200000 , 21.232881244655] , [ 1146369600000 , 22.798299192958] , [ 1149048000000 , 19.006125095476] , [ 1151640000000 , 19.151889158536] , [ 1154318400000 , 19.340022855452] , [ 1156996800000 , 22.027934841859] , [ 1159588800000 , 24.903300681329] , [ 1162270800000 , 29.146492833877] , [ 1164862800000 , 31.781626082589] , [ 1167541200000 , 33.358770738428] , [ 1170219600000 , 35.622684613497] , [ 1172638800000 , 33.332821711366] , [ 1175313600000 , 34.878748635832] , [ 1177905600000 , 40.582332613844] , [ 1180584000000 , 45.719535502920] , [ 1183176000000 , 43.239344722386] , [ 1185854400000 , 38.550955100342] , [ 1188532800000 , 40.585368816283] , [ 1191124800000 , 45.601374057981] , [ 1193803200000 , 48.051404337892] , [ 1196398800000 , 41.582581696032] , [ 1199077200000 , 40.650580792748] , [ 1201755600000 , 32.252222066493] , [ 1204261200000 , 28.106390258553] , [ 1206936000000 , 27.532698196687] , [ 1209528000000 , 33.986390463852] , [ 1212206400000 , 36.302660526438] , [ 1214798400000 , 25.015574480172] , [ 1217476800000 , 23.989494069029] , [ 1220155200000 , 25.934351445531] , [ 1222747200000 , 14.627592011699] , [ 1225425600000 , -5.2249403809749] , [ 1228021200000 , -12.330933408050] , [ 1230699600000 , -11.000291508188] , [ 1233378000000 , -18.563864948088] , [ 1235797200000 , -27.213097001687] , [ 1238472000000 , -20.834133840523] , [ 1241064000000 , -12.717886701719] , [ 1243742400000 , -8.1644613083526] , [ 1246334400000 , -7.9108408918201] , [ 1249012800000 , -0.77002391591209] , [ 1251691200000 , 2.8243816569672] , [ 1254283200000 , 6.8761411421070] , [ 1256961600000 , 4.5060912230294] , [ 1259557200000 , 10.487179794349] , [ 1262235600000 , 13.251375597594] , [ 1264914000000 , 9.2207594803415] , [ 1267333200000 , 12.836276936538] , [ 1270008000000 , 19.816793904978] , [ 1272600000000 , 22.156787167211] , [ 1275278400000 , 12.518039090576] , [ 1277870400000 , 6.4253587440854] , [ 1280548800000 , 13.847372028409] , [ 1283227200000 , 8.5454736090364] , [ 1285819200000 , 18.542801953304] , [ 1288497600000 , 23.037064683183] , [ 1291093200000 , 23.517422401888] , [ 1293771600000 , 31.804723416068] , [ 1296450000000 , 34.778247386072] , [ 1298869200000 , 39.584883855230] , [ 1301544000000 , 40.080647664875] , [ 1304136000000 , 44.180050667889] , [ 1306814400000 , 42.533535927221] , [ 1309406400000 , 40.105374449011] , [ 1312084800000 , 37.014659267156] , [ 1314763200000 , 29.263745084262] , [ 1317355200000 , 19.637463417584] , [ 1320033600000 , 33.157645345770] , [ 1322629200000 , 32.895053150988] , [ 1325307600000 , 34.111544824647] , [ 1327986000000 , 40.453985817473] , [ 1330491600000 , 46.435700783313] , [ 1333166400000 , 51.062385488671] , [ 1335758400000 , 50.130448220658] , [ 1338436800000 , 41.035476682018] , [ 1341028800000 , 46.591932296457] , [ 1343707200000 , 48.349391180634] , [ 1346385600000 , 51.913011286919] , [ 1348977600000 , 55.747238313752] , [ 1351656000000 , 52.991824077209] , [ 1354251600000 , 49.556311883284]]
            // }
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
  return {views: views,
  	regions: regions,
  	filterDataByRegion: filterDataByRegion,
  	filterDataByTimeInterval: filterDataByTimeInterval,
  	prepareData: prepareData,
    renderLineChart: renderLineChart}; 
}



function HeatMapFactory() {
	var map, heatmap, pointArray;

	var preprocessedSampleData = 	[
	  {
	  	latitude: 37.782551,
	  	longitude: -122.445368,
	  	timestamp: 0,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.782745,
	  	longitude: -122.444586,
	  	timestamp: 4,
	  	region: 'sampleRegion4',
	  	userId: 5
	  	},
	  {
	  	latitude: 37.782842,
	  	longitude: -122.443688,
	  	timestamp: 5,
	  	region: 'sampleRegion1',
	  	userId: 2
	  	},
	  {
	  	latitude: 37.782919,
	  	longitude: -122.442815,
	  	timestamp: 4,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.782992,
	  	longitude: -122.442112,
	  	timestamp: 4,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.783100,
	  	longitude: -122.441461,
	  	timestamp: 4,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.783206,
	  	longitude: -122.440829,
	  	timestamp: 4,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.783273,
	  	longitude: -122.440324,
	  	timestamp: 4,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.783316,
	  	longitude: -122.440023,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.783357,
	  	longitude: -122.439794,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.783371,
	  	longitude: -122.439687,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.783368,
	  	longitude: -122.439666,
	  	timestamp: 17,
	  	region: 'sampleRegion3',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.783383,
	  	longitude: -122.439594,
	  	timestamp: 17,
	  	region: 'sampleRegion3',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.783508,
	  	longitude: -122.439525,
	  	timestamp: 4,
	  	region: 'sampleRegion3',
	  	userId: 3
	  	},
	  {
	  	latitude: 37.783842,
	  	longitude: -122.439591,
	  	timestamp: 4,
	  	region: 'sampleRegion3',
	  	userId: 2
	  	},
	  {
	  	latitude: 37.784147,
	  	longitude: -122.439668,
	  	timestamp: 17,
	  	region: 'sampleRegion3',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.784206,
	  	longitude: -122.439686,
	  	timestamp: 17,
	  	region: 'sampleRegion3',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.784386,
	  	longitude: -122.439790,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.784701,
	  	longitude: -122.439902,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.784965,
	  	longitude: -122.439938,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.785010,
	  	longitude: -122.439947,
	  	timestamp: 17,
	  	region: 'sampleRegion2',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.785360,
	  	longitude: -122.439952,
	  	timestamp: 17,
	  	region: 'sampleRegion2',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.785715,
	  	longitude: -122.440030,
	  	timestamp: 17,
	  	region: 'sampleRegion2',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.786117,
	  	longitude: -122.440119,
	  	timestamp: 17,
	  	region: 'sampleRegion3',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.786564,
	  	longitude: -122.440209,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},

	  {
	  	latitude: 37.789551,
	  	longitude: -122.449368,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789745,
	  	longitude: -122.449586,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789842,
	  	longitude: -122.449688,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789919,
	  	longitude: -122.449815,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789992,
	  	longitude: -122.449112,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789100,
	  	longitude: -122.449461,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789206,
	  	longitude: -122.449829,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789273,
	  	longitude: -122.449324,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789316,
	  	longitude: -122.449023,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789357,
	  	longitude: -122.439794,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789371,
	  	longitude: -122.439687,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789368,
	  	longitude: -122.439666,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789383,
	  	longitude: -122.439594,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789508,
	  	longitude: -122.439525,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789842,
	  	longitude: -122.439591,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789147,
	  	longitude: -122.439668,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789206,
	  	longitude: -122.439686,
	  	timestamp: 17,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789386,
	  	longitude: -122.439790,
	  	timestamp: 7,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789701,
	  	longitude: -122.439902,
	  	timestamp: 7,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789965,
	  	longitude: -122.439938,
	  	timestamp: 12,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789010,
	  	longitude: -122.439947,
	  	timestamp: 12,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789360,
	  	longitude: -122.439952,
	  	timestamp: 12,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789715,
	  	longitude: -122.449030,
	  	timestamp: 12,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789117,
	  	longitude: -122.449119,
	  	timestamp: 12,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.789564,
	  	longitude: -122.449209,
	  	timestamp: 12,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},

	  {
	  	latitude: 37.780551,
	  	longitude: -122.440368,
	  	timestamp: 12,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780745,
	  	longitude: -122.440586,
	  	timestamp: 12,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780842,
	  	longitude: -122.440688,
	  	timestamp: 12,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780919,
	  	longitude: -122.440815,
	  	timestamp: 12,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780992,
	  	longitude: -122.440112,
	  	timestamp: 12,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780100,
	  	longitude: -122.440461,
	  	timestamp: 12,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780206,
	  	longitude: -122.440829,
	  	timestamp: 12,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780273,
	  	longitude: -122.440324,
	  	timestamp: 12,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780316,
	  	longitude: -122.440023,
	  	timestamp: 12,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780357,
	  	longitude: -122.430794,
	  	timestamp: 12,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780371,
	  	longitude: -122.430687,
	  	timestamp: 7,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780368,
	  	longitude: -122.430666,
	  	timestamp: 7,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780383,
	  	longitude: -122.430594,
	  	timestamp: 7,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780508,
	  	longitude: -122.430525,
	  	timestamp: 7,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780842,
	  	longitude: -122.430591,
	  	timestamp: 7,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780147,
	  	longitude: -122.430668,
	  	timestamp: 7,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780206,
	  	longitude: -122.430686,
	  	timestamp: 7,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780386,
	  	longitude: -122.430790,
	  	timestamp: 7,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780701,
	  	longitude: -122.430902,
	  	timestamp: 7,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780965,
	  	longitude: -122.430938,
	  	timestamp: 7,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780010,
	  	longitude: -122.430947,
	  	timestamp: 7,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780360,
	  	longitude: -122.430952,
	  	timestamp: 7,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780715,
	  	longitude: -122.440030,
	  	timestamp: 7,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780117,
	  	longitude: -122.440119,
	  	timestamp: 7,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	},
	  {
	  	latitude: 37.780564,
	  	longitude: -122.440209,
	  	timestamp: 7,
	  	region: 'sampleRegion1',
	  	userId: 1
	  	}
	];

	var sampleData = processData(preprocessedSampleData);

// fetch data for event
// filter data
	function filterDataByTime(timePoint, dataArray) {
		var filteredData = _.filter(dataArray, function(element){
			return (timePoint - 60/2)/60 <= element.timestamp && element.timestamp < (timePoint + 60/2)/60;
		});
		return filteredData;
	}

//rerender with filteredData
	function renderHeatmap(timePoint){
		var filteredData = filterDataByTime(timePoint, preprocessedSampleData);
		var processedData = processData(filteredData);
		pointArray = new google.maps.MVCArray(processedData);
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

	var initializeOnce = _.once(initialize);

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