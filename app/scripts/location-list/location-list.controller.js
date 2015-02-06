(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('LocationListCtrl', [
      '$scope',
      'Locations',
      'Position',
      'Preferences',
      'Geolib',
      function ($scope, Locations, Position, Preferences, Geolib) {

      var setDistances = function (latitude, longitude) {
        $scope.locations.forEach(function (location) {
          location.distance = Geolib.getDistance({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }, {
            latitude: latitude,
            longitude: longitude
          });
        });
      };

      $scope.locations = [];
      $scope.orderByField = 'name';
      $scope.reverseSort = false;
      $scope.hideClosed = Preferences.hideClosed();
      $scope.distanceRange = Preferences.distanceRange();

      $scope.hideFilter = true;
      $scope.ratingFloor = null;

      $scope.maybeHideClosed = function (location) {
        if ($scope.hideClosed && ! location.isOpen) {
          return false;
        } else {
          return true;
        }
      };

      $scope.rangeFilter = function (location) {
        /** @todo Do something about miles/meters unit consistency */
        if ('distance' in location && parseInt($scope.distanceRange, 10) !== 0) {
          if (location.distance > $scope.distanceRange) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      };

      $scope.ratingFilter = function (location) {
        return (
          $scope.ratingFloor === null ||
          ('rating' in location && location.rating > $scope.ratingFloor)
        );
      };

      // Persist UI controls back to preferences
      $scope.$watch('hideClosed', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          Preferences.hideClosed($scope.hideClosed);
        }
      });
      $scope.$watch('distanceRange', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          Preferences.distanceRange($scope.distanceRange);
        }
      });

      // Listen and react to new positions
      $scope.$on('pc.newPosition', function (event, position) {
        setDistances(position.latitude, position.longitude);
      });

      // Initialize
      Locations.getAll().then(function (locations) {
        $scope.locations = locations;

        // Set distance if available
        if (Position.getPosition()) {
          setDistances(
            Position.getPosition().latitude,
            Position.getPosition().longitude
          );
        }
      });
    }]);
})(window.angular);
