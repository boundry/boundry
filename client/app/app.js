angular
  .module('boundry', [
    'boundry.eventEditor',
    'ui.router'
  ])
.config(function($stateProvider, $httpProvider) {
    $stateProvider
     .state('signin', {
        url : '/signin',
        templateUrl: 'app/auth/signin.html',
        controller: 'AuthController',
     })
     .state('signup', {
        templateUrl: 'app/auth/signup.html',
        controller: 'AuthController',
        url:'/signup'
     })
     .state('eventEditor', {
        templateUrl: 'app/eventEditor/eventEditor.html',
        controller: 'eventEditorCtrl',
        url:'/event'
     })

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    //$httpProvider.interceptors.push('AttachTokens');
});

//Store user/event data
//.service()


//.run(function ($rootScope, $state, Auth) {
  //$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    ////$$route.authenticate refers to the authentication requirement in above router
    //if (toState && toState.authenticate && !Auth.isAuth()) {
      ////Need to preventDefault to keep from going to unauthorized page before .go is called
      //event.preventDefault();
      //$state.go('signin');
    //}
  //});


