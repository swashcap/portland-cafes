(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('MapCtrl', ['$scope', 'Locations', function ($scope, Locations) {
      $scope.coordinates = Locations.getAll().map(function (location) {
        return {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        };
      });
    }]);
})(window.angular);
