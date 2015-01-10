(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('NavigationCtrl', ['$scope', '$location', 'Position', function ($scope, $location, Position) {
      var ADDRESS_FILLER = '…';
      var setAddress = function () {
        $scope.address = Position.getAddress();
      };

      $scope.isActive = function (route) {
        if (
          $location.path().indexOf(route) !== -1 ||
          route.indexOf('location') !== -1 && $location.path() === '/'
        ) {
          return true;
        }
      };
      $scope.setPosition = function (locationName) {
        $scope.address = ADDRESS_FILLER;

        if (typeof locationName === 'undefined') {
          Position.updatePosition().then(setAddress).catch(function (error) {
            /** @todo  Add app-level error messaging with UI */
            console.log(error);
          });
        } else {
          Position.setPosition(locationName).then(setAddress)
            .catch(function (error) {
              console.log(error);
            });
        }
      };

      // Initialize
      setAddress();
    }]);
})(window.angular);
