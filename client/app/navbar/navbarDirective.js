angular
  .module('boundry.navbar')
  .directive('ngNavbar', navbar);

function navbar() {
  return {
    templateUrl: './app/navbar/navbar.html',
    scope: {},
    controller: 'NavbarCtrl'
  };
}