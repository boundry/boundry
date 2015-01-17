angular
  .module('boundry.auth')
  .controller('AuthLoginCtrl', AuthLoginCtrl);

AuthLoginCtrl.$inject = ['$scope', '$http', '$state', 'AuthFactory'];
function AuthLoginCtrl($scope, $http, $state, AuthFactory) {
  $scope.hasError = false;
  $scope.errorMessage = '';
    var el = document.getElementsByClassName('ng-scope');
      el[0].classList.add('loginHtml');
  //send the login information to the server if valid
  $scope.submitLogin = function(email, password) {
    if (email && password) {
      AuthFactory.login(email, password, function(errorMessage) {
        $scope.hasError = true;
        $scope.errorMessage = errorMessage;
      });
    }
  };
}
