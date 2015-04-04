/* jshint devel:true */
(function (angular) {
  'use strict';

  angular.module('portlandcafes', ['pcStorage', 'ngRoute', 'ngSanitize'])
    .run([
      'IndexedDB', '$http', 'Hours', '$route', 'Preferences', '$q',
      function (IndexedDB, $http, Hours, $route, Preferences, $q) {
        var getResults = function () {
          var deferred = $q.defer();

          console.log('Fetching results.json...');

          $http.get('results.json').then(function (data) {
            var results = [];

            if ('data' in data && Array.isArray(data.data)) {
              results = data.data.map(function (result) {
                var output = {
                  address: result.adr_address, // jshint ignore:line
                  phoneNumber: result.formatted_phone_number, // jshint ignore:line
                  coords: {
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng
                  },
                  id: result.id,
                  name: result.name,
                  placeId: result.place_id, // jshint ignore:line
                  rating: result.rating,
                  region: result.region,
                  types: result.types,
                  url: result.url,
                  vicinity: result.vicinity,
                  website: result.website
                };

                var periods = (((result).opening_hours || {}).periods || []); // jshint ignore:line

                if (periods.length) {
                  output.isOpen = Hours.isOpen(periods);
                  output.isClosingSoon = Hours.isClosingSoon(periods);
                  output.todayHours = {
                    open: Hours.getOpenTime(periods),
                    close: Hours.getCloseTime(periods)
                  };
                  output.hours = [];

                  [0, 1, 2, 3, 4, 5, 6].forEach(function (number) {
                    output.hours.push(Hours.getHoursByDay(periods, number));
                  });
                }

                return output;
              });
            }

            deferred.resolve(results);
          }).catch(function (err) {
            deferred.reject(err);
          });

          return deferred.promise;
        };

        /** @todo Add application-level error handler */
        var errorHandler = function (err) {
          console.error('Error!', err);
        };

        IndexedDB.count().then(function (count) {
          var now = (new Date()).getTime();
          var storageTimestamp = parseInt(Preferences.getStorageTimestamp(), 10);

          if (! count || storageTimestamp + 24 * 60 * 60 * 1000 < now) {
            getResults().then(function (results) {
              IndexedDB.put(results).then(function (transaction) {
                // Reload the route when the data is set.
                $route.reload();

                Preferences.setStorageTimestamp(now);

                console.log('Success:', transaction);
              }).catch(errorHandler);
            }).catch(errorHandler);
          } else if (! storageTimestamp) {
            /**
             * If there's a count but no `storageTimestamp` something wrong must
             * have occurred. Set a timestamp to ensure the cache will be
             * refreshed in the next date.
             */
            Preferences.setStorageTimestamp(now);
          }
        }).catch(errorHandler);
    }]);

  angular.module('portlandcafes')
    .controller('AppCtrl', ['$scope', function ($scope) {
      /**
       * Application-level menu 'state' variables.
       *
       * These control classes through a `ng-class` directive on the
       * controller's root element.
       */
      $scope.isMenu = false;
      $scope.isSearch = false;
      $scope.isLocation = false;

      $scope.setMenuState = function (state) {
        switch (state) {
          case 'menu':
            $scope.isMenu = !$scope.isMenu;
            break;
          case 'search':
            $scope.isSearch = !$scope.isSearch;
            break;
          case 'location':
            $scope.isLocation = !$scope.isLocation;
            break;
          default:
            $scope.isMenu = $scope.isSearch = $scope.isLocation = false;
        }
      };

      /** Clear the menu state on route changes */
      $scope.$on('$locationChangeStart', function () {
        $scope.setMenuState();
      });
    }]);
})(window.angular);
