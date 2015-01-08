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

    // $scope.changeEvent = function() {
    // }

    $scope.changeView = function() {
      if($scope.dataViewSelection.name === 'Heat Map') {
        console.log('yeeeee');
        $scope.renderSlider('hours');
        HeatMapFactory.initialize();
      }
    };

    $scope.renderSlider = function(timeMetric) {
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

    $scope.toggleHeatmap = HeatMapFactory.toggleHeatmap;
    $scope.changeGradient = HeatMapFactory.changeGradient;
    $scope.changeRadius = HeatMapFactory.changeRadius;
    $scope.changeOpacity = HeatMapFactory.changeOpacity; 
  }