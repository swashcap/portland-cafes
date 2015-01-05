(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .factory('Geolocation', ['$q', '$http', function ($q, $http) {
      var POSITION_KEY = 'position';
      var geolocationOptions = {
        enableHighAccuracy: true,
        timeout: 4 * 1000,
        maximumAge: 600 * 1000
      };
      var getCoords = function (pos) {
        if (pos instanceof Object && 'coords' in pos && 'latitude' in pos.coords) {
          return {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          };
        }
      };

      // Get current position from cache if available
      var maybeGetCurrentPosition = function () {
        if ('localStorage' in window) {
          return getCoords(JSON.parse(localStorage.getItem(POSITION_KEY)));
        }
      };

      var getCurrentPosition = function () {
        return $q(function (resolve, reject) {
          var currentPosition = maybeGetCurrentPosition();

          if (currentPosition) {
            resolve(currentPosition);
          } else if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
              function (position) {
                // Place response in the cache
                if ('localStorage' in window) {
                  localStorage.setItem(POSITION_KEY, JSON.stringify(position));
                }

                resolve(getCoords(position));
              },
              function (err) {
                reject(err);
              },
              geolocationOptions
            );
          } else {
            reject('Browser doesn\'t support geolocation');
          }
        });
      };

      /**
       * Get the distance between to sets of coordinates.
       *
       * Stolen from GeoLib's `getDistanceSimple`.
       */
      var getDistance = function (start, end, accuracy) {
        accuracy = Math.floor(accuracy) || 1;
        var toRad = function (num) {
          return num * Math.PI / 180;
        };

        var distance =
          Math.round(
            Math.acos(
              Math.sin(
                toRad(end.latitude)
              ) *
              Math.sin(
                toRad(start.latitude)
              ) +
              Math.cos(
                toRad(end.latitude)
              ) *
              Math.cos(
                toRad(start.latitude)
              ) *
              Math.cos(
                toRad(start.longitude) - toRad(end.longitude)
              )
            ) * 6378137
          );

        return Math.floor(Math.round(distance/accuracy)*accuracy);
      };

      // Public API
      return {
        maybeGetCurrentPosition: maybeGetCurrentPosition,
        getCurrentPosition: getCurrentPosition,
        getDistance: getDistance
      };
    }]);
})(window.angular);
