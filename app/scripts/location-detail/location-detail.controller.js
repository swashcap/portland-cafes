(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('LocationDetailCtrl', ['$scope', '$routeParams', 'Locations', function ($scope, $routeParams, Locations) {
      $scope.location = Locations.get($routeParams.locationId);
    }]);
})(window.angular);
