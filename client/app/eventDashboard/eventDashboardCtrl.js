angular
  .module('boundry.eventDashboard')
  .controller('EventDashboardCtrl', EventDashboardCtrl);

  EventDashboardCtrl.$inject = [
    '$scope',
    'EventDashboardFactory'
  ];

  function EventDashboardCtrl ($scope, EventDashboardFactory, uiGmapGoogleMapApi) {
    angular.extend($scope, EventDashboardFactory);
     
      $scope.options = {scrollwheel: false}; 
    //    $scope.map = {
    //   center: {latitude: 51.219053, longitude: 4.404418 },
    //   zoom: 14 
    // };
      //fix map size
      $scope.styleTest = {
        'width' : '500px',
        // 'height' : '200px',
        'background' : 'gray'
      };

    // uiGmapGoogleMapApi.then(function(maps) {  

    // });

    $scope.getEvents($scope.currentOrganizerEmail) //Get events for organizer, passing in email pulled from dashboard factory which is pulled from auth factory 
      .success(function(data) {
        $scope.setEventData(data); //Set data on factory
        $scope.eventData = $scope.getEventData();
        console.log('evdat', $scope.eventData);
      })
      .error(function(error) {
        console.log(error);
      });
    //create regions on map
    $scope.populateMap = function(ind) {
      $scope.polygons = [];
      // $scope.getPolygons(ind);
      var eventObj = $scope.eventData[ind];
      var centerCoord = JSON.parse(eventObj.event_center);

var reg = [{'region_name':null,'region_id':null,'region_attr':{'coordinates':[{'latitude':37.79170425245727,'longitude':-122.42099737578428},{'latitude':37.79455293845994,'longitude':-122.40451788359678},{'latitude':37.781258130780266,'longitude':-122.41842245512998}],'fill':{'color':'#058EA5 ','opacity':0.3},'stroke':{'color':'#058EA5 ','weight':3,'opacity':0.3}},'actions':[]},
{'region_name':null,'region_id':null,'region_attr':{'coordinates':[{'latitude':37.791161633146736,'longitude':-122.4055478518585},{'latitude':37.79516335688493,'longitude':-122.40185713225401},{'latitude':37.786888366824975,'longitude':-122.40228628569639},{'latitude':37.78871979693672,'longitude':-122.40735029631651}],'fill':{'color':'#3B8AAC ','opacity':0.3},'stroke':{'color':'#3B8AAC ','weight':3,'opacity':0.3}},'actions':[]},
{'region_name':null,'region_id':null,'region_attr':{'coordinates':[{'latitude':37.787702341367115,'longitude':-122.40880941802061},{'latitude':37.785599555464046,'longitude':-122.40391706877745},{'latitude':37.78186865903556,'longitude':-122.41258596831358},{'latitude':37.784310721627,'longitude':-122.41447424346006}],'fill':{'color':'#E507D2 ','opacity':0.3},'stroke':{'color':'#E507D2 ','weight':3,'opacity':0.3}},'actions':[]}
  ];
      // if (centerCoord) {
        // console.log('q',eventObj.regions);
        for (var i = 0; i < eventObj.regions.length; i++) {
          console.log(reg[i].region_attr);
          eventObj.regions[i].region_attr =  reg[i].region_attr;
          $scope.polygons.push(reg[i].region_attr);
        }
        console.log('eo',eventObj);
        var regionArr = [];

        $scope.map = {
          center: JSON.parse(eventObj.event_center),
          zoom: 14
        };
     
      // } else {
      // $scope.polygons = [];
      // $scope.map = {};
      // }
     // $scope.polygons = [
     //        {
     //            id: 1,
     //            path: [{'latitude':37.8031975582087,'longitude':-122.41825103759766},{'latitude':37.80211248443386,'longitude':-122.41026878356934},{'latitude':37.79709381086916,'longitude':-122.41498947143555}],
     //            // [
     //            //     {
     //            //         latitude: 50,
     //            //         longitude: -80
     //            //     },
     //            //     {
     //            //         latitude: 30,
     //            //         longitude: -120
     //            //     },
     //            //     {
     //            //         latitude: 20,
     //            //         longitude: -95
     //            //     }
     //            // ]
     //            //,
     //            stroke: {
     //                color: 'blue',
     //                weight: 2
     //            },
     //            editable: false,
     //            draggable: false,
     //            geodesic: false,
     //            visible: true,
     //            fill: {
     //                color: 'blue',
     //                opacity: 0.4
     //            }
     //        }
     //    ];
    };

  }
// var reg1 = {'region_name':null,'region_id':null,'region_attr':{'coordinates':[{'latitude':37.79170425245727,'longitude':-122.42099737578428},{'latitude':37.79455293845994,'longitude':-122.40451788359678},{'latitude':37.781258130780266,'longitude':-122.41842245512998}],'fill':{'color':'#058EA5 ','opacity':0.3},'stroke':{'color':'#058EA5 ','weight':3,'opacity':0.3}},'actions':[]};
// var reg2 = {'region_name':null,'region_id':null,'region_attr':{'coordinates':[{'latitude':37.791161633146736,'longitude':-122.4055478518585},{'latitude':37.79516335688493,'longitude':-122.40185713225401},{'latitude':37.786888366824975,'longitude':-122.40228628569639},{'latitude':37.78871979693672,'longitude':-122.40735029631651}],'fill':{'color':'#3B8AAC ','opacity':0.3},'stroke':{'color':'#3B8AAC ','weight':3,'opacity':0.3}},'actions':[]};
// var req3 = {'region_name':null,'region_id':null,'region_attr':{'coordinates':[{'latitude':37.787702341367115,'longitude':-122.40880941802061},{'latitude':37.785599555464046,'longitude':-122.40391706877745},{'latitude':37.78186865903556,'longitude':-122.41258596831358},{'latitude':37.784310721627,'longitude':-122.41447424346006}],'fill':{'color':'#E507D2 ','opacity':0.3},'stroke':{'color':'#E507D2 ','weight':3,'opacity':0.3}},'actions':[]};
// region_attr: '{'coordinates':
// [{'latitude':37.8031975582087,'longitude':-122.41825103759766},{'latitude':37.80211248443386,'longitude':-122.41026878356934},{'latitude':37.79709381086916,'longitude':-122.41498947143555}],
// 'fill':{'color':'#DDA078 ','opacity':0.3},'stroke':{'color':'#DDA078 ','weight':3,'opacity':0.3}}'region_name: 'regName1'updated_at: '2015-01-09T19:39:18.000Z'__proto__: Object1: Objectlength: 2__proto__: Array[0]start_time: '2004-05-23T21:25:10.000Z'updated_at: '2015-01-09T19:39:18.000Z'__proto__: Object
