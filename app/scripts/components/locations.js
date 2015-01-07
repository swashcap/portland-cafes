(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .service('Locations', ['$http', function ($http) {
      var now = new Date();

      /**
       * Format string-based time into a number
       * @param  {String} time Four-digit format, ex: '0845'
       * @return {Number}
       */
      var formatTime = function (time) {
        if (typeof time !== 'undefined') {
          return parseInt(time.slice(0,2), 10) + parseInt(time.slice(2), 10) / 60;
        }
      };

      var getTimeProperties = function (data) {
        var periods = ((((data).details || {}).opening_hours || {}).periods || {});
        var output, time;

        if (Array.isArray(periods) && periods.length === 7) {
          output = {
            hours: data.details.opening_hours.periods,
            todayHours: {
              open: data.details.opening_hours.periods[now.getDay()].open.time,
              close: data.details.opening_hours.periods[now.getDay()].close.time
            }
          };
          time = now.getHours() + now.getMinutes() / 60;

          if (
            formatTime(output.todayHours.open) < time &&
            time < formatTime(output.todayHours.close)
          ) {
            output.isOpen = true;
          } else {
            output.isOpen = false;
          }

          return output;
        }
      };

      // Retrieve locations from static file
      var locations = $http.get('results.json').then(function (data) {
        var locations = [];

        if ('data' in data && Array.isArray(data.data)) {
          data.data.forEach(function (data) {
            var location = {
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
              address: data.details.adr_address
            };

            angular.extend(location, getTimeProperties(data));

            locations.push(location);
          });
        }

        return locations;
      }).catch(function (error) {
        console.log(error);
      });

      /** @todo  Fix potential side-effects */
      this.getAll = function () {
        return locations;
      };
      this.get = function (id) {
        return locations.filter(function (location) {
          return location.id == id;
        }).shift();
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
