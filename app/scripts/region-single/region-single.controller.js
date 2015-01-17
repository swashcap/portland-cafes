/* global console */
(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('RegionSingleCtrl', ['$scope', '$routeParams', 'Regions', 'Locations', 'Geolib', function ($scope, $routeParams, Regions, Locations, Geolib) {
      $scope.region = Regions.filter(function (region) {
        return region.slug === $routeParams.regionName;
      }).shift();

      if ('name' in $scope.region) {
        Locations.getAll().then(function (locations) {
          $scope.locations = locations.filter(function (location) {
            var coords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            };

            return Geolib.isPointInside(coords, $scope.region.bounds);
          });
        });
      } else {
        /** @todo  Add in-application message */
        console.log('Invalid region.');
      }
    }]);
})(window.angular);
