angular
  .module('boundry.auth')
  .controller('AuthSignupCtrl', AuthSignupCtrl);

AuthSignupCtrl.$inject = ['$scope', '$http', '$state', 'AuthFactory'];
function AuthSignupCtrl($scope, $http, $state, AuthFactory) {

  $scope.hasError = false;
  $scope.errorMessage = '';
  $scope.arePasswordsEqual = true;

  //submit signup information to factory if valid
  $scope.submitSignup = function(name, email, firstPassword, secondPassword) {
    if (email && firstPassword && firstPassword === secondPassword) {
      AuthFactory.signup(name, email, firstPassword, function(errorMessage) {
        $scope.hasError = true;
        $scope.errorMessage = errorMessage;
      });
    }
  };

  //verifies if the two passwords are equal
  $scope.arePasswordsEqual = function(first, second) {
    if (!second) {
      return true;
    }
    
    return second && first === second;
  };
}
