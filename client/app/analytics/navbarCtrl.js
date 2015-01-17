angular
  .module('boundry.analytics')
  .controller('NavbarCtrl', NavbarCtrl);

NavbarCtrl.$inject = ['$scope', '$http', 'AuthFactory'];
function NavbarCtrl($scope, $http, AuthFactory) {
  console.log('hi');
  $scope.user = {};
  $scope.user.email = AuthFactory.getEmail();

  $scope.user.logout = function() {
    console.log('hi');
    AuthFactory.logout();
  };
}
