(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('LocationDetailCtrl', ['$scope', '$routeParams', 'Locations', function ($scope, $routeParams, Locations) {
      $scope.location = Locations.get($routeParams.locationId);
      $scope.isClosed = false;
      $scope.isClosingSoon = false;

      // Set up time-related `$scope` properties
      var now = new Date();
      now = now.getHours() + now.getMinutes() / 60;

      if ($scope.location.hours.open > now || now > $scope.location.hours.close) {
        $scope.isClosed = true;
      } else if (now + .5 >= location.hours.close) {
        $scope.isClosingSoon = true;
      }
    }]);
})(window.angular);
