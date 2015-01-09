angular
  .module('boundry.navbar')
  .controller('NavbarCtrl', NavbarCtrl);

NavbarCtrl.$inject = ['$scope', '$http', 'AuthFactory'];
function NavbarCtrl($scope, $http, AuthFactory) {
  $scope.user = {};
  $scope.user.email = AuthFactory.getEmail();

  $scope.user.logout = function() {
    AuthFactory.logout();
  };
}