(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('MapCtrl', ['$scope', 'Locations', function ($scope, Locations) {

      // Initialize
      Locations.getAll().then(function (locations) {
        $scope.coordinates = locations.map(function (location) {
          return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          };
        });
      });
    }]);
})(window.angular);
