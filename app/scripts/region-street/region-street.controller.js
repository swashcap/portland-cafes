(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('RegionStreetCtrl', ['$scope', '$routeParams', 'Streets', 'Locations', 'Geolib', function ($scope, $routeParams, Streets, Locations, Geolib) {
      /**
       * @todo This controller shares much with the 'RegionSingleCtrl'. Look
       *       into a manner of sharing functions, initialization, etc.
       */

      var getCenterObject = function (center) {
        return {
          coords: {
            latitude: center.latitude,
            longitude: center.longitude
          }
        };
      };

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

        $scope.center = getCenterObject(Geolib.getCenter($scope.locations.map(function (location) {
          return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          };
        })));
      });
    }]);
})(window.angular);
