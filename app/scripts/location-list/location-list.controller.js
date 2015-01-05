(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('LocationListCtrl', ['$scope', 'Locations', 'Geolocation', function ($scope, Locations, Geolocation) {
      $scope.locations = Locations.getAll();
      $scope.orderByField = 'name';
      $scope.reverseSort = false;
      $scope.hideClosed = false;
      $scope.range = 0;

      /**
       * Add `isOpen` property to each location.
       *
       * @todo  This should be a dynamically updating property. Update it
       *        every minute or so.
       */
      var now = new Date();
      now = now.getHours() + now.getMinutes() / 60;

      $scope.locations.forEach(function (location) {
        if (location.hours.open < now && now < location.hours.close) {
          location.isOpen = false;
        } else {
          location.isOpen = true;
        }
      });

      $scope.maybeHideClosed = function (location) {
        if ($scope.hideClosed && location.isOpen) {
          return false;
        } else {
          return true;
        }
      };

      $scope.rangeFilter = function (location) {
        /** @todo Do something about miles/meters unit consistency */
        if ('distance' in location && $scope.range != 0) {
          if (location.distance * 6.21371e-4 > $scope.range) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      };

      var setLocationDistances = function (latitude, longitude) {
        $scope.locations.forEach(function (location) {
          return location.distance = Geolocation.getDistance({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }, {
            latitude: latitude,
            longitude: longitude
          });
        });
      };

      var currentPosition = Geolocation.maybeGetCurrentPosition();

      if (currentPosition) {
        setLocationDistances(currentPosition.latitude, currentPosition.longitude);
      }
    }]);
})(window.angular);
