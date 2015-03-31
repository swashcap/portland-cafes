(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('RegionCtrl',
      ['$scope', 'Locations', 'Regions',
      function ($scope, Locations, Regions) {

        /** Initialize regions */

        $scope.regions = Regions.map(function (region) {
          region.locations = [];

          return region;
        });

        $scope.regions.forEach(function (region) {
          Locations.getByRegion(region.slug).then(function (locations) {
            region.locations = locations;
          });
        });
    }]);
})(window.angular);
