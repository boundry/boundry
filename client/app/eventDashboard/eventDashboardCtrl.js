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
        'background' : 'red'
      };

    // uiGmapGoogleMapApi.then(function(maps) {  

    // });

    $scope.getEvents($scope.currentOrganizerEmail) //Get events for organizer, passing in email pulled from dashboard factory which is pulled from auth factory 
      .success(function(data) {
        $scope.setEventData(data); //Set data on factory
        $scope.eventData = $scope.getEventData();
      })
      .error(function(error) {
        console.log(error);
      });
    //create regions on map
    $scope.populateMap = function(ind) {
      // $scope.getPolygons(ind);
      var eventObj = $scope.eventData[ind];
      var centerCoord = JSON.parse(eventObj.event_center);
      console.log(eventObj.regions);
      var regionArr = [];

      $scope.map = {
        center: JSON.parse(eventObj.event_center),
        zoom: 14
      };
     

     $scope.polygons = [
            {
                id: 1,
                path: [{'latitude':37.8031975582087,'longitude':-122.41825103759766},{'latitude':37.80211248443386,'longitude':-122.41026878356934},{'latitude':37.79709381086916,'longitude':-122.41498947143555}],
                // [
                //     {
                //         latitude: 50,
                //         longitude: -80
                //     },
                //     {
                //         latitude: 30,
                //         longitude: -120
                //     },
                //     {
                //         latitude: 20,
                //         longitude: -95
                //     }
                // ]
                //,
                stroke: {
                    color: '#6060FB',
                    weight: 3
                },
                editable: true,
                draggable: true,
                geodesic: false,
                visible: true,
                fill: {
                    color: '#ff0000',
                    opacity: 0.8
                }
            }
        ];
    };



  }


// region_attr: '{'coordinates':[{'latitude':37.8031975582087,'longitude':-122.41825103759766},{'latitude':37.80211248443386,'longitude':-122.41026878356934},{'latitude':37.79709381086916,'longitude':-122.41498947143555}],'fill':{'color':'#DDA078 ','opacity':0.3},'stroke':{'color':'#DDA078 ','weight':3,'opacity':0.3}}'region_name: 'regName1'updated_at: '2015-01-09T19:39:18.000Z'__proto__: Object1: Objectlength: 2__proto__: Array[0]start_time: '2004-05-23T21:25:10.000Z'updated_at: '2015-01-09T19:39:18.000Z'__proto__: Object
