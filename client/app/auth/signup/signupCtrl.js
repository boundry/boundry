angular
  .module('boundry.authSignup')
  .controller('AuthSignupCtrl', AuthSignupCtrl);

AuthSignupCtrl.$inject = ['$scope', '$http'];
function AuthSignupCtrl($scope, $http) {

  //send the signup information to the server if valid
  $scope.submitSignup = function(name, email, firstPassword, secondPassword) {
    if (email && firstPassword === secondPassword) {
      var payload = { name: name, email: email, password: firstPassword };
      $http.post('/signup', payload);
    }
  };
}
