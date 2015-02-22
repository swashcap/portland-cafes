(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('RegionCtrl',
      ['$scope', 'Locations', 'Regions', 'Streets',
      function ($scope, Locations, Regions, Streets) {
        var isMatch = function (term, searchTerms) {
          if (Array.isArray(searchTerms) && searchTerms.length) {
            for (var i = 0; i < searchTerms.length; i++) {
              if (term.toLowerCase().indexOf(searchTerms[i].toLowerCase()) !== -1) {
                return true;
              }
            }
          }

          return false;
        };

        $scope.streets = Streets.map(function (street) {
          street.locations = [];

          return street;
        });


        Locations.getAll().then(function (locations) {
          locations.forEach(function (location) {
            var streets = $scope.streets;

            for (var i = 0; i < streets.length; i++) {
              if (isMatch(location.vicinity, streets[i].searchTerms)) {
                streets[i].locations.push(location);
                break;
              }
            }
          });
        });

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
