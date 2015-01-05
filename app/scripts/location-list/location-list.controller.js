(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('LocationListCtrl', ['$scope', 'Locations', 'Geolocation', function ($scope, Locations, Geolocation) {
      $scope.locations = Locations.getAll();
      $scope.orderByField = 'name';
      $scope.reverseSort = false;


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
