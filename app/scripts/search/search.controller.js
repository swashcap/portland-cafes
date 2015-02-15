(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('SearchCtrl', ['$scope', '$rootScope', 'Locations', function ($scope, $rootScope, Locations) {
      $scope.clearSearch = function () {
        $scope.searchText = '';
        $scope.results = [];
        $scope.message = '';
      };

      $scope.$watch('searchText', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          Locations.search(newValue).then(function (results) {
            if (results.length) {
              $scope.results = results;
              $scope.message = '';
            } else {
              $scope.results = [];
              $scope.message = 'No results.';
            }
          });
        }
      });

      // Initialize by setting to 'clear' state
      $scope.clearSearch();

      // Clear results and message when the app's route changes
      $rootScope.$on('$locationChangeSuccess', function (newLocation, oldLocation) {
        if (newLocation !== oldLocation) {
          $scope.results = [];
          $scope.message = '';
        }
      });

      // Clear results and message when `searchText` is empty
      $scope.$watch('searchText', function (newSearch, oldSearch) {
        if (newSearch !== oldSearch && newSearch.length === 0) {
          $scope.results = [];
          $scope.message = '';
        }
      });
    }]);
})(window.angular);
