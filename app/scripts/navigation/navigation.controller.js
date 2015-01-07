(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('NavigationCtrl', ['$scope', '$location', 'Position', function ($scope, $location, Position) {
      var ADDRESS_FILLER = '…';

      $scope.isActive = function (route) {
        if ($location.path().indexOf(route) !== -1) {
          return true;
        }
      };
      $scope.setPosition = function (locationName) {
        $scope.address = ADDRESS_FILLER;

        Position.updatePosition().then(function (position) {
          $scope.address = Position.getAddress();
        }).catch(function (error) {
          /** @todo  Add app-level error messaging with UI */
          console.log(error);
        });
      };

      // Initialize
      $scope.address = Position.getAddress();
    }]);
})(window.angular);
