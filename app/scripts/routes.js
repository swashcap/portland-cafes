(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    // Set application routes
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'scripts/location-list/location-list.html',
          controller: 'LocationListCtrl'
        })
        .when('/location/:locationId', {
          templateUrl: 'scripts/location-detail/location-detail.html',
          controller: 'LocationDetailCtrl'
        })
        .when('/regions', {
          templateUrl: 'scripts/regions/regions.html',
          controller: 'RegionCtrl'
        })
        .when('/map', {
          templateUrl: 'scripts/map/map.html',
          controller: 'MapCtrl'
        })
        .when('/about', {
          templateUrl: 'scripts/about/about.html',
          controller: 'AboutCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]);

  // Enable HTML5 history
  // angular.module('portlandcafes')
  //   .config(['$locationProvider', function ($locationProvider) {
  //     $locationProvider.html5Mode({
  //       enabled: true,
  //       requireBase: false
  //     });
  //   }]);
})(window.angular);
