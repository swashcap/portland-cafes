/* jshint devel:true */
(function (angular) {
  'use strict';

  angular.module('portlandcafes', ['ngRoute', 'ngSanitize'])
    .run(['$http', 'Hours', 'Locations', function ($http, Hours, Locations) {
      $http.get('results.json').then(function (data) {
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
        }

        Locations._setLocations(results);
      }).catch(function (error) {
        console.log(error);
      });
    }]);
})(window.angular);
