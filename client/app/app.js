angular
  .module('boundry', [
    'boundry.eventDashboard',
    'boundry.eventEditor',
    'boundry.auth',
    'boundry.navbar',
    'ui.router',
    'uiGmapgoogle-maps'
  ])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'uiGmapGoogleMapApiProvider', function($stateProvider, $urlRouterProvider, $httpProvider, uiGmapGoogleMapApiProvider) {
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
   .state('eventDashboard', {
      url: '/events',
      templateUrl: 'app/eventDashboard/eventDashboard.html',
      controller: 'EventDashboardCtrl',
   })
   .state('eventEditor', {
      url: '/editor/{eventId}',
      templateUrl: 'app/eventEditor/eventEditor.html',
      controller: 'EventEditorCtrl',
    })
    .state('analytics', {
      templateUrl: 'app/analytics/analytics.html',
      controller: 'analytics',
      url:'/analytics'
    });

  //send base url to either login or dashboard depending if user is authenticated
  $urlRouterProvider.when('', ['$state', 'AuthFactory', function($state, AuthFactory) {
    if (AuthFactory.isLoggedIn()) {
      $state.go('eventDashboard');
    } else {
      $state.go('login');      
    }
  }]);

   uiGmapGoogleMapApiProvider.configure({
     v: '3.18',
     libraries: 'drawing, geometry, places'
   });
  // We add our $httpInterceptor into the array
  // of interceptors. Think of it like middleware for your ajax calls
  //$httpProvider.interceptors.push('AttachTokens');
}])

.run(function ($rootScope, $state, AuthFactory) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    AuthFactory.checkSession();

    if (!toState) {
      return;
    }

    //redirect logged in user to dashboard if attempted access to login or signup pages
    if (AuthFactory.isLoggedIn()) {
      if (toState.name === 'login' || toState.name === 'signup') {
        event.preventDefault();
        $state.go('eventDashboard');
      }
    }

    //redirect un-logged in user to login page
    if (!AuthFactory.isLoggedIn()) {
      if (toState.name !== 'login' && toState.name !== 'signup') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
});



