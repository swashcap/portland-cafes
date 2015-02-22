/* global console */
(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('LocationDetailCtrl',
      ['$scope', '$routeParams', 'Locations',
      function ($scope, $routeParams, Locations) {

      $scope.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      $scope.currentDay = (new Date()).getDay();
      $scope.getMapsLink = function (location) {
        if (typeof location !== 'undefined') {
          return 'https://maps.google.com?daddr=' + encodeURIComponent(location.vicinity);
        } else {
          return '';
        }
      };
      $scope.reviewLimit = 2;
      $scope.toggleReviewLimit = function () {
        if ($scope.reviewLimit === 2) {
          $scope.reviewLimit = $scope.location.reviews.length;
        } else {
          $scope.reviewLimit = 2;
        }
      };

      // Initialize
      Locations.get($routeParams.locationId).then(function (location) {
        $scope.location = location;

        Locations.getReviews(location.placeId).then(function (reviews) {
          $scope.location.reviews = reviews;
        });
      }).catch(function (error) {
        console.log(error);
      });
    }]);
})(window.angular);
