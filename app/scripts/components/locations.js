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
            var result = data;

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
              reviews: result.reviews,
              types: result.types,
              url: result.url,
              vicinity: result.vicinity,
              website: result.website
            };

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
