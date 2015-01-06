angular
  .module('boundry.authLogin')
  .controller('AuthLoginCtrl', AuthLoginCtrl)

AuthLoginCtrl.$inject = ['$scope', '$http'];
function AuthLoginCtrl($scope, $http) {

  //send the login information to the server if valid
  $scope.submitLogin = function(email, password) {
    if (email && password) {
      var payload = { email: email, password: password };
      $http.post('/login', payload);
    }
  };
}
