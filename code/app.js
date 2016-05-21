var app = angular.module('tem',
    [   'ui.router',
        'angular-loading-bar',
        'ui.bootstrap',
        'ngMessages',
        'ngAnimate', 
        'toastr'
    ]);
app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.includeBar = true;
}]);

app.run(function ($rootScope, $location, userService) {

  var routesThatDontRequireAuth = ['/login'];
  var routeClean = function(route){
        if(routesThatDontRequireAuth.indexOf(route) === -1){
            for(var i=0;i<routesThatDontRequireAuth.length;i++){
                if(s.startsWith(route,routesThatDontRequireAuth[i])){
                    return true;
                }
            }
            return false;
        }else{
            return true;
        }
  };
  /*$rootScope.$on('$locationChangeStart', function (event, next, current) {
       if (!routeClean($location.url())){
           if(!userService.isLoggedIn()){
               $location.path('/login');
           }
       }
   });*/
});
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "login.html",
            controller: "login"
        })
        .state('home', {
            url: "/home",
            templateUrl: "home.html",
            controller: "home"
        })
        .state('settings', {
            url: "/settings",
            templateUrl: "settings.html",
            controller: "settings"
        })
        .state('slot', {
            url: "/slot",
            templateUrl: "slot.html",
            controller: "home"
        })
        .state('user', {
            url: "/user",
            templateUrl: "user.html",
            controller: "user"
        })
        .state('password', {
            url: "/password",
            templateUrl: "password.html"
        });
});
