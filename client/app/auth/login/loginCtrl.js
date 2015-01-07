angular
  .module('boundry.authLogin')
  .controller('AuthLoginCtrl', AuthLoginCtrl);

AuthLoginCtrl.$inject = ['$scope', '$http', '$state'];
function AuthLoginCtrl($scope, $http, $state) {
  $scope.hasError = false;
  $scope.errorMessage = '';

  //send the login information to the server if valid
  $scope.submitLogin = function(email, password) {
    if (email && password) {
      var payload = { email: email, password: password };

      $http.post('/login', payload)
        .success(success)
        .error(error);

      function success(data, status) {
        $state.go('eventEditor');
      }

      function error(data, status) {
        $scope.hasError = true;
        $scope.errorMessage = 'Incorrect email and password';
      }
    }
  };
}
