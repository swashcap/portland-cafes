(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .service('Geolocation', function ($q, $cacheFactory) {
      var CACHE_NAME = 'portlandcafes-user';
      var CACHE_POSITION_KEY = 'position';

      var geolocationOptions = {
        enableHighAccuracy: true,
        timeout: 4 * 1000,
        maximumAge: 600 * 1000
      };

      var cache = $cacheFactory(CACHE_NAME);

      this.hasCurrentPosition = function () {
        if (cache.get(CACHE_POSITION_KEY)) {
          return true;
        } else {
          return false;
        }
      };
      this.getCurrentPosition = function () {
        return $q(function (res, rej) {
          if (cache.get(CACHE_POSITION_KEY)) {
            res(cache.get(CACHE_POSITION_KEY));
          } else if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
              function (position) {
                // Place response in the cache
                cache.put(CACHE_POSITION_KEY, position);

                res(position);
              },
              function (err) {
                rej(err);
              },
              geolocationOptions
            );
          } else {
            rej('Browser doesn\'t support geolocation');
          }
        });
      };
      /**
       * Stolen from GeoLib's `getDistanceSimple`.
       */
      this.getDistance = function (start, end, accuracy) {
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
    });
})(window.angular);
