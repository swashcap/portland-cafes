/* global console */
(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('MenuCtrl', ['$scope', '$location', 'Position', function ($scope, $location, Position) {
      var ADDRESS_FILLER = '…';
      var setAddress = function () {
        $scope.address = Position.getAddress();
      };

      $scope.address = false;
      $scope.toggleDropdown = false;
      $scope.navbarOpen = false;
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
        $scope.toggleDropdown = false;

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
      $scope.toggleNavbar = function () {
        $scope.navbarOpen = ! $scope.navbarOpen;
      };

      // Initialize
      setAddress();
    }]);
})(window.angular);
