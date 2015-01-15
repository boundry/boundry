angular
  .module('boundry.eventEditor')
  .directive('ngRegionEditor', ngRegionEditor);

  function ngRegionEditor () {
    var directive = {
      controller: 'RegionEditorCtrl',
      transclude: true,
      scope: false,
      templateUrl: './app/regionEditor/regionEditor.html',
      restrict: 'EA',
    };
    return directive;
  }
