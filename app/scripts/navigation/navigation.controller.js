(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('NavigationCtrl', ['$scope', '$location', 'Geolocation', function ($scope, $location, Geolocation) {
      $scope.location = '';

      $scope.setLocation = function () {
        $scope.location = '&hellip';

        Geolocation.getCurrentPosition().then(function (pos) {
          $scope.location = pos.coords.latitude + ', ' + pos.coords.longitude;
        }).catch(function (err) {
          console.log(err);
        });
      };

      $scope.isActive = function (route) {
        if ($location.path().indexOf(route) !== -1) {
          return true;
        }
      };

      var currentPosition = Geolocation.maybeGetCurrentPosition();

      if (currentPosition) {
        $scope.location = currentPosition.latitude + ', ' + currentPosition.longitude;
      }
    }]);
})(window.angular);
