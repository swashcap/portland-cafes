(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('RegionCtrl', ['$scope', 'Locations', function ($scope, Locations) {
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

      $scope.regions = [{
        name: 'North',
        searchTerms: [],
        locations: []
      }, {
        name: 'Northwest',
        searchTerms: ['northwest'],
        locations: []
      }, {
        name: 'Northeast',
        searchTerms: ['northeast'],
        locations: []
      }, {
        name: 'Downtown',
        searchTerms: [],
        locations: []
      }, {
        name: 'Southwest',
        searchTerms: ['southwest'],
        locations: []
      }, {
        name: 'Southeast',
        searchTerms: ['southeast'],
        locations: []
      }];

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



      Locations.getAll().then(function (locations) {
        locations.forEach(function (location) {
          var vicinity = location.vicinity.toLowerCase();
          var streets = $scope.streets;
          var regions = $scope.regions;

          for (var i = 0; i < streets.length; i++) {
            if (isMatch(location.vicinity, streets[i].searchTerms)) {
              streets[i].locations.push(location);
              break;
            }
          }
          for (var j = 0; j < streets.length; j++) {
            if (isMatch(location.vicinity, regions[j].searchTerms)) {
              regions[j].locations.push(location);
              break;
            }
          }
        });
      });
    }]);
})(window.angular);
