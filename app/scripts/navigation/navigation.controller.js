(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('NavigationCtrl', ['$scope', '$location', 'Geolocation', function ($scope, $location, Geolocation) {
      var LOCATION_FILLER = '…';
      var setLocationToAddress = function () {
        var currentPosition = Geolocation.maybeGetCurrentPosition();

        if (currentPosition) {
          $scope.location = LOCATION_FILLER;
          Geolocation.getHumanAddress(currentPosition).then(function (address) {
            $scope.location = address;
          }).catch(function (err) {
            console.log(err)
          });
        }
      };

      $scope.location = '';

      $scope.setLocation = function (locationName) {
        $scope.location = LOCATION_FILLER;

        Geolocation.getCurrentPosition().then(function (position) {
          setLocationToAddress();
        }).catch(function (err) {
          console.log(err);
        });
      };

      $scope.isActive = function (route) {
        if ($location.path().indexOf(route) !== -1) {
          return true;
        }
      };

      // Init
      setLocationToAddress();
    }]);
})(window.angular);
