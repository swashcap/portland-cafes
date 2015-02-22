/* global console */
(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('RegionSingleCtrl',
      ['$scope', '$routeParams', 'Regions', 'Locations',
      function ($scope, $routeParams, Regions, Locations) {
        $scope.region = Regions.filter(function (region) {
          return region.slug === $routeParams.regionName;
        }).shift();

        if ('name' in $scope.region) {
          $scope.center = {
            coords: {
              latitude: $scope.region.center.latitude,
              longitude: $scope.region.center.longitude
            }
          };

          Locations.getByRegion($scope.region.slug).then(function (locations) {
            $scope.locations = locations;
          });
        } else {
          /** @todo  Add in-application message */
          console.log('Invalid region.');
        }
    }]);
})(window.angular);
