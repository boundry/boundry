angular
  .module('boundry.auth', ['ngCookies'])
  .factory('AuthFactory', AuthFactory);

AuthFactory.$inject = ['$http', '$state', '$cookies'];
function AuthFactory($http, $state, $cookies) {

  var user = {};
  var factory = {};

  //sets the state of the angular app to reflect the session
  factory.checkSession = function() {
    user.email = $cookies.email;
  };

  //checks if the user is logged in
  factory.isLoggedIn = function() {
    return Boolean(user.email);
  };

  //gets the user's email address
  factory.getEmail = function() {
    return user.email;
  };

  /*
    SIGNUP -> attempts to signup on server and invokes provided error callback if there was an error
    errorCallback should take an error message as an argument
  */
  factory.signup = function(name, email, password, errorCallback) {
    if (!name || !email || !password) {
      errorCallback('All fields are required');
      return;
    }

    //create payload to send to server
    var payload = {
      name: name,
      email: email,
      password: password
    };

    //post signup information to server
    $http.post('/signup', payload)
      .success(success)
      .error(error);

    //callback for successful signup
    function success() {
      user.email = email;
      $state.go('eventEditor');
    }

    //callback for unsuccessful signup
    function error() {
      errorCallback('Email already in use');
    }
  };

  /*
    LOGIN -> attempts to login on server and invokes provided error callback if there was an error
    errorCallback should take an error message as an argument
  */
  factory.login = function(email, password, errorCallback) {
    if (!email || !password) {
      errorCallback('All fields are required');
      return;
    }

    //create payload to send to server
    var payload = {
      email: email,
      password: password
    };

    //post login information to server
    $http.post('/login', payload)
      .success(success)
      .error(error);

    //callback for successful login
    function success(data, status) {
      user.email = email;
      $cookies.email = email;
      $state.go('eventDashboard');
    }

    //callback for unsuccessful login
    function error(data, status) {
      errorCallback('Incorrect email and password');
    }
  };

  /*
    LOGOUT -> attempts to login on server and invokes provided error callback if there was an error
    errorCallback should take an error message as an argument
  */
  factory.logout = function() {
    $http.get('/logout').success(success);

    //callback for successful logout
    function success() {
      delete user.email;
      delete $cookies.email;
      
      $state.go('login');
    }
  };

  return factory;
}