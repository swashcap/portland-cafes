(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('MapCtrl', ['$scope', 'Locations', function ($scope, Locations) {

      // Initialize
      Locations.getAll().then(function (locations) {
        $scope.locations = locations.map(function (location) {
          return {
            id: location.id,
            name: location.name,
            coords: location.coords,
            address: location.address,
            todayHours: location.todayHours || {}
          };
        });
      });
    }]);
})(window.angular);
