/* Application Module */
var scalesApp = angular.module("scalesApp", [
   'ngRoute',
   'ui.mask',
   'scalesControllers',
   'scalesFilters',
   'scalesFactories'
]);

scalesApp.config(['$routeProvider',
   function($routeProvider) {
      $routeProvider.
         when('/home', {
            templateUrl: 'views/home.html',
            controller: 'ScalesFormCtrl'
         }).
         when('/preview', {
            templateUrl: 'views/preview.html',
            controller: 'ScalesPreviewCtrl'
         }).
         otherwise({
            redirectTo: '/home'
         });
   }]);
