/* jshint devel:true */
(function (angular) {
  'use strict';

  angular.module('portlandcafes', ['pcStorage', 'ngRoute', 'ngSanitize'])
    .run([
      'IndexedDB', '$http', 'Hours', '$route', 'Preferences', '$q', 'Regions', 'Geolib',
      function (IndexedDB, $http, Hours, $route, Preferences, $q, Regions, Geolib) {
        var getRegions = function () {
          return Regions.map(function (region) {
            Geolib.preparePolygonForIsPointInsideOptimized(region.bounds);

            return {
              slug: region.slug,
              polygon: region.bounds
            };
          });
        };
        var getLocationRegion = function (location, regions) {
          var latlng = location.coords;

          for (var i = 0, il = regions.length; i < il; i++) {
            if (Geolib.isPointInsideWithPreparedPolygon(latlng, regions[i].polygon)) {
              return regions[i].slug;
            }
          }
        };

        var getResults = function () {
          var deferred = $q.defer();

          console.log('Fetching results.json...');

          $http.get('results.json').then(function (data) {
            var regions = getRegions();
            var results = [];

            if ('data' in data && Array.isArray(data.data)) {
              /*jshint camelcase: false */
              results = data.data.map(function (result) {
                var output = {
                  address: result.adr_address,
                  phoneNumber: result.formatted_phone_number,
                  coords: {
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng
                  },
                  id: result.id,
                  name: result.name,
                  placeId: result.place_id,
                  rating: result.rating,
                  types: result.types,
                  url: result.url,
                  vicinity: result.vicinity,
                  website: result.website
                };

                // Add `region` property
                output.region = getLocationRegion(output, regions);

                var periods = (((result).opening_hours || {}).periods || []);

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
                /*jshint camelcase: true */

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

        /**
         * Handle migration to IndexedDB `region` index.
         *
         * @todo Remove this once databases naturally refresh, after 24 hours.
         */
        IndexedDB.count('region').then(function (count) {
          var regions = getRegions();

          if (count === 0) {
            IndexedDB.getAll().then(function (locations) {
              locations.forEach(function (location) {
                location.region = getLocationRegion(location, regions);
              });

              IndexedDB.put(locations).then(function (transaction) {
                console.log('Added "region" property to all locations', transaction);
                $route.reload();
              }).catch(errorHandler);
            }).catch(errorHandler);
          }
        }).catch(errorHandler);
    }]);
})(window.angular);
