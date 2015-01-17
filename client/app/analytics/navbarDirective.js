angular
  .module('boundry.analytics')
  .directive('ngNavbar', navbar);


function navbar() {
  return {
    restrict: 'A',
/* jshint ignore:start */
    template: "<span id='nav'><span id='boundryName'>Boundry</span><a href='' ng-click='user.logout()' style='float: right'>Logout</a><a href='/analytics' style='float: right'>Analytics</a></span>",
/* jshint ignore:end */
    scope: {}
    // controller: 'NavbarCtrl'
  };
}
