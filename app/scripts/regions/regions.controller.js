(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('RegionCtrl', ['$scope', 'Locations', 'Regions', 'Geolib', function ($scope, Locations, Regions, Geolib) {
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

      $scope.streets = [{
        name: 'Alberta Street',
        searchTerms: ['albera'],
        locations: []
      }, {
        name: 'Belmont Street',
        searchTerms: ['belmont'],
        locations: []
      }, {
        name: 'Burnside Street',
        searchTerms: ['burnside'],
        locations: []
      }, {
        name: 'Division Street',
        searchTerms: ['division'],
        locations: []
      }, {
        name: 'Hawthorne Boulevard',
        searchTerms: ['hawthorne'],
        locations: []
      }];

      $scope.regions = Regions.map(function (region) {
        return {
          name: region.name,
          bounds: region.bounds,
          locations: []
        };
      });

      Locations.getAll().then(function (locations) {
        locations.forEach(function (location) {
          var vicinity = location.vicinity.toLowerCase();
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
