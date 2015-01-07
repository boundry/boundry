angular
  .module('boundry.authSignup')
  .controller('AuthSignupCtrl', AuthSignupCtrl);

AuthSignupCtrl.$inject = ['$scope', '$http', '$state'];
function AuthSignupCtrl($scope, $http, $state) {
  $scope.hasError = false;
  $scope.errorMessage = '';

  //send the signup information to the server if valid
  $scope.submitSignup = function(name, email, firstPassword, secondPassword) {
    if (email && firstPassword && firstPassword === secondPassword) {
      var payload = { name: name, email: email, password: firstPassword };

      $http.post('/signup', payload)
        .success(success)
        .error(error);

      function success(data, status) {
        $state.go('eventEditor');
      }

      function error(data, status) {
        $scope.hasError = true;
        $scope.errorMessage = 'Email already in use';
      }
    }
  };
}
