(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('NavigationCtrl', ['$scope', '$location', 'Geolocation', function ($scope, $location, Geolocation) {
      $scope.hasLocation = false;
      $scope.location = '';
      $scope.setLocation = function () {
        $scope.hasLocation = true;

        Geolocation.getCurrentPosition().then(function (pos) {
          $scope.hasLocation = true;
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

      if (Geolocation.hasCurrentPosition()) {
        Geolocation.getCurrentPosition().then(function (pos) {
          $scope.location = pos.coords.latitude + ', ' + pos.coords.longitude;
        });
      }
    }]);
})(window.angular);
