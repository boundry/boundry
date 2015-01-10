angular
  .module('boundry.analytics', ['nvd3', 'boundry.analyticsServices'])
  .controller('analyticsCtrl', analyticsCtrl);

  analyticsCtrl.$inject = ['$scope', '$http', 'AnalyticsFactory', 'HeatMapFactory'];

  function analyticsCtrl ($scope, $http, AnalyticsFactory, HeatMapFactory) {

    $scope.sample = 0;
    $scope.timeIntervalString = function(){
      var amOrPm = '';
      if ($scope.sample < 12) {
        amOrPm = 'AM';
      } else {
        amOrPm = 'PM';
      }
      var hour = ($scope.sample === 0 || $scope.sample === 12) ? 12 : ($scope.sample % 12);
      var str = '' + hour + ':00' + amOrPm;
      return str;
    };

    $scope.views = AnalyticsFactory.views;
    $scope.events = [{name: 'event1'}, {name: 'event2'}];
    $scope.regions = AnalyticsFactory.regions;

    // $scope.changeEvent = function() {
    // }

    $scope.changeView = function() {
      if($scope.dataViewSelection.name === 'Heat Map') {
        $scope.renderHeatSlider('hours');
        HeatMapFactory.initializeOnce();
      } else if ($scope.dataViewSelection.name === 'Line Chart') {
        AnalyticsFactory.prepareData();
        $scope.renderLineChartSlider();
        AnalyticsFactory.renderLineChart([$('#slider-range').slider('values', 0), $('#slider-range').slider('values', 1)]);
      }
    };

    $scope.renderHeatSlider = function(timeMetric) {
      var min = 0;
      var max = 0;

      if (timeMetric === 'hours') {
        min = 0;
        max = 23;
      }
      //else if other incremental option

      $('#slider').slider({
        min: min,
        max: max
      });

      $('#slider').slider({
        slide: function (event, ui) {
          $scope.$apply(function () {
            $scope.sample = $('#slider').slider('value');
            //rerender heat map with each value
            console.log(ui.value);
            // console.log(HeatMapFactory.reRender);
            HeatMapFactory.reRender(ui.value);
          });
        }     
      });
    };

    $scope.renderLineChartSlider = function() {

      $('#slider-range').slider({
        animate: true,
        range: true,
        min: 0,
        max: 24,
        values: [ 10, 16 ],
        slide: function( event, ui ) {
          $('#timeIntervalSlider').val( 
            changeToModTwelve(ui.values[0]) +  ':00' + determineAmOrPm(ui.values[0]) +
            ' - ' + 
            changeToModTwelve(ui.values[1])+  ':00' + determineAmOrPm(ui.values[1]));
          $scope.$apply(function () {
            AnalyticsFactory.renderLineChart(ui.values);
          });
        }
      });
      $('#timeIntervalSlider').val( 
        changeToModTwelve( $('#slider-range').slider('values', 0) ) + ':00' + 
        determineAmOrPm( $('#slider-range').slider('values', 0) ) +
        ' - ' + 
        changeToModTwelve( $('#slider-range').slider('values', 1) ) + ':00' + 
        determineAmOrPm( $('#slider-range').slider('values', 0) ));
  
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

    };

    $scope.toggleHeatmap = HeatMapFactory.toggleHeatmap;
    $scope.changeGradient = HeatMapFactory.changeGradient;
    $scope.changeRadius = HeatMapFactory.changeRadius;
    $scope.changeOpacity = HeatMapFactory.changeOpacity; 
  }