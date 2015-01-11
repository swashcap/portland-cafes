/* global console */
(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .service('Locations', ['$http', '$q', 'Hours', function ($http, $q, Hours) {

      // Retrieve locations from static file
      var locations = $http.get('results.json').then(function (data) {
        if ('data' in data && Array.isArray(data.data)) {
          /*jshint camelcase: false */
          return data.data.map(function (data) {
            var output = {
              id: data.id,
              name: data.name,
              rating: data.rating,
              reviews: data.details.reviews,
              coords: {
                latitude: data.geometry.location.lat,
                longitude: data.geometry.location.lng
              },
              types: data.types,
              placeId: data.place_id,
              website: data.details.website,
              address: data.details.adr_address,
              vicinity: data.vicinity
            };

            var periods = ((((data).details || {}).opening_hours || {}).periods || []);

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
        } else {
          return [];
        }
      }).catch(function (error) {
        console.log(error);
      });

      /** @todo  Fix potential side-effects */
      this.getAll = function () {
        return locations;
      };
      this.get = function (id) {
        return $q(function (resolve, reject) {
          locations.then(function (locations) {
            var result = locations.filter(function (location) {
              return location.id === id;
            }).shift();

            if (result) {
              resolve(result);
            } else {
              reject('Couldn\'t find requested ID.');
            }
          }).catch(function (error) {
            reject(error);
          });
        });
      };
      this.getOpen = function () {
        /** @todo This trusts the client's time, which is usually a no-no. */
        var now = new Date();
        var currentHour = now.getHours() + now.getMinutes() / 60;

        return locations.filter(function (location) {
          return (location.hours.open < currentHour && location.hours.closed > currentHour);
        });
      };
    }]);
})(window.angular);
