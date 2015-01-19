angular
  .module('boundry.analytics')
  .directive('ngNavbar', navbar);


function navbar() {
  return {
    restrict: 'A',
/* jshint ignore:start */
    template: "<span id='nav'><span id='boundryName'>Boundry</span><a href='' class='nav-btn' id='navLogout' ng-click='user.logout()' style='float: right'>Logout</a><a href='/analytics' class='nav-btn' id='navAna' style='float: right'>Analytics</a><a href='' class='nav-btn' id='navEventDashboard' style='float: right'>Event Dashboard</a></span>",
/* jshint ignore:end */
    scope: {}
    // controller: 'NavbarCtrl'
  };
}