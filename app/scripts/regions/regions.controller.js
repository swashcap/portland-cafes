(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('RegionCtrl', ['$scope', 'Locations', 'Regions', 'Geolib', 'Streets', function ($scope, Locations, Regions, Geolib, Streets) {
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

      $scope.regions = Regions.map(function (region) {
        region.locations = [];

        return region;
      });

      Locations.getAll().then(function (locations) {
        locations.forEach(function (location) {
          var coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          };
          var streets = $scope.streets;
          var regions = $scope.regions;

          for (var i = 0; i < streets.length; i++) {
            if (isMatch(location.vicinity, streets[i].searchTerms)) {
              streets[i].locations.push(location);
              break;
            }
          }
          for (var j = 0; j < regions.length; j++) {
            if (Geolib.isPointInside(coords, regions[j].bounds)) {
              regions[j].locations.push(location);
              break;
            }
          }
        });
      });
    }]);
})(window.angular);
