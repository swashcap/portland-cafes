(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('RegionStreetCtrl', ['$scope', '$routeParams', 'Streets', 'Locations', function ($scope, $routeParams, Streets, Locations) {
      $scope.street = Streets.filter(function (street) {
        return street.slug === $routeParams.streetName;
      }).shift();

      // Initialize
      Locations.getAll().then(function (locations) {
        $scope.locations = locations.filter(function (location) {
          var searchTerms = $scope.street.searchTerms;

          for (var i = 0; i < searchTerms.length; i++) {
            if (location.vicinity.toLowerCase().indexOf(searchTerms[i]) !== -1) {
              return true;
            }
          }
        });
      });
    }]);
})(window.angular);
