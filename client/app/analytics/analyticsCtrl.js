angular
  .module('boundry.analytics', ['nvd3', 'boundry.analyticsServices'])
  .controller('analyticsCtrl', analyticsCtrl);

  analyticsCtrl.$inject = ['$scope', '$http', 'AnalyticsFactory', 'HeatMapFactory'];

  function analyticsCtrl ($scope, $http, AnalyticsFactory, HeatMapFactory) {

    $scope.views = AnalyticsFactory.views;
    $scope.events = [{name: 'event1'}, {name: 'event2'}];
    $scope.regions = AnalyticsFactory.regions;

    // $scope.changeEvent = function() {
    // }

    $scope.changeView = function() {
      if($scope.dataViewSelection.name === 'Heat Map') {
        $scope.renderHeatmapSlider();
        HeatMapFactory.initializeOnce();
      } else if ($scope.dataViewSelection.name === 'Line Chart') {
        AnalyticsFactory.prepareData();
        $scope.renderLineChartSlider();
        AnalyticsFactory.renderLineChart([$('#slider-range').slider('values', 0), $('#slider-range').slider('values', 1)]);
      }
    };

    $scope.renderHeatmapSlider = function() {
      var bucketSize = 1 * 60; //turn hours to minutes
      var startTime = 0;
      var endTime = 24 * 60; //turn hours to minutes
      var step = 1; //minutes

      $('#slider').slider({
        min: startTime + bucketSize/2,
        max: endTime - bucketSize/2,
        step: step,
        animate: 'fast'
      });

      $('#slider').slider({
        slide: function (event, ui) {

          $('#heatmapSlider').val( 
            changeToModTwelve( Math.floor(( ui.value - bucketSize/2 )/60) ) + //hour
            ':' +
            pad( ( ui.value - bucketSize/2 ) % 60 ) + //minutes
            determineAmOrPm( Math.floor(( ui.value - bucketSize/2 )/60) ) +
            ' - ' +
            changeToModTwelve( Math.floor(( ui.value + bucketSize/2 )/60) ) + //hour
            ':' +
            pad( ( ui.value + bucketSize/2 ) % 60 ) + //minutes
            determineAmOrPm( Math.floor(( ui.value + bucketSize/2 )/60) )
          );

          $scope.$apply(function () {
            //rerender heat map with each value
            HeatMapFactory.renderHeatmap(ui.value);
          });

        }     
      });

      $('#heatmapSlider').val( $('#slider').slider('value') );

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