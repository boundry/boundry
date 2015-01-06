angular
  .module('boundry', [
    'boundry.eventEditor',
    'boundry.authLogin',
    'boundry.authSignup',
    'ui.router',
    'uiGmapgoogle-maps'
  ])
.config(['$stateProvider', '$httpProvider', 'uiGmapGoogleMapApiProvider', function($stateProvider, $httpProvider, uiGmapGoogleMapApiProvider) {
  $stateProvider
   .state('login', {
      url : '/login',
      templateUrl: 'app/auth/login/login.html',
      controller: 'AuthLoginCtrl',
   })
   .state('signup', {
      url: '/signup',
      templateUrl: 'app/auth/signup/signup.html',
      controller: 'AuthSignupCtrl',
   })
   .state('eventEditor', {
      url: '/event',
      templateUrl: 'app/eventEditor/eventEditor.html',
      controller: 'EventEditorCtrl',
   })
   .state('analytics', {
      templateUrl: 'app/analytics/analytics.html',
      controller: 'analytics',
      url:'/analytics'
   });

   uiGmapGoogleMapApiProvider.configure({
     v: '3.18',
     libraries: 'drawing, geometry, places'
   });
  // We add our $httpInterceptor into the array
  // of interceptors. Think of it like middleware for your ajax calls
  //$httpProvider.interceptors.push('AttachTokens');
}]);

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


