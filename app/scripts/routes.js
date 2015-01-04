(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    // Set application routes
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '/scripts/location-list/location-list.html',
          controller: 'LocationListCtrl'
        })
        .when('/location/:locationId', {
          templateUrl: '/scripts/location-detail/location-detail.html',
          controller: 'LocationDetailCtrl'
        })
        .when('/regions', {
          templateUrl: '/scripts/regions/regions.html',
          controller: 'RegionCtrl'
        })
        .when('/map', {
          templateUrl: '/scripts/map/map.html',
          controller: 'MapCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    });

    // Enable HTML5 history
    // .config(function ($locationProvider) {
    //   $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    //   });
    // });
})(window.angular);
