(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('LocationListCtrl', ['$scope', 'Locations', 'Position', 'Preferences', 'Distance', function ($scope, Locations, Position, Preferences, distance) {
      var setLocationDistances = function (latitude, longitude) {
        $scope.locations.forEach(function (location) {
          return location.distance = distance({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }, {
            latitude: latitude,
            longitude: longitude
          });
        });
      };

      $scope.orderByField = 'name';
      $scope.reverseSort = false;
      $scope.hideClosed = Preferences.hideClosed();
      $scope.distanceRange = Preferences.distanceRange();

      $scope.maybeHideClosed = function (location) {
        if ($scope.hideClosed && ! location.isOpen) {
          return false;
        } else {
          return true;
        }
      };

      $scope.rangeFilter = function (location) {
        /** @todo Do something about miles/meters unit consistency */
        if ('distance' in location && $scope.distanceRange != 0) {
          if (location.distance * 6.21371e-4 > $scope.distanceRange) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      };

      // Persist UI controls back to preferences
      $scope.$watch('hideClosed', function () {
        Preferences.hideClosed($scope.hideClosed);
      });
      $scope.$watch('distanceRange', function () {
        Preferences.distanceRange($scope.distanceRange);
      });

      // Initialize
      Locations.getAll().then(function (locations) {
        console.log(locations);
        $scope.locations = locations;
      });

      // var currentPosition = Position.getPosition();

      // if (currentPosition) {
      //   setLocationDistances(currentPosition.latitude, currentPosition.longitude);
      // }
    }]);
})(window.angular);
