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
        .when('/page/:pageNumber', {
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
        .when('/regions/:regionName', {
          templateUrl: 'scripts/region-single/region-single.html',
          controller: 'RegionSingleCtrl'
        })
        .when('/regions/streets/:streetName', {
          templateUrl: 'scripts/region-street/region-street.html',
          controller: 'RegionStreetCtrl'
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
  angular.module('portlandcafes')
    .config(['$locationProvider', function ($locationProvider) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
      });
    }]);
})(window.angular);
