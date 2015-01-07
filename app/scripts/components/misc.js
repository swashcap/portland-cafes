(function (angular) {
  'use strict';

  /** @todo Find a better home for these filters */
  angular.module('portlandcafes')
    .filter('humanTime', function () {
      return function (time) {
        if (! time) {
          return;
        }

        var isPM = false;
        var hours = parseInt(time.slice(0,2), 10);
        var minutes = parseInt(time.slice(2), 10);

        if (hours >= 12) {
          hours = hours - 12;
          isPM = true;
        }

        minutes = Math.round(minutes / 60);

        if (minutes < 10) {
          minutes = '0' + minutes;
        }

        return hours + ':' + minutes + ' ' + (isPM ? 'PM' : 'AM');
      };
    });

  angular.module('portlandcafes')
    .filter('toMiles', function () {
      return function (input) {
        if (input) {
          return Math.round(input * 6.21371e-2) / 100 + ' mi.';
        }
      };
    });

  angular.module('portlandcafes')
    .value('centerOfPortland', {
      latitude: 45.5119316,
      longitude: -122.61836459999999
    });

  angular.module('portlandcafes')
    .constant('GOOGLE_MAPS_KEY', 'AIzaSyA4Wd2HKrDmdh_2HzqPqqa3gsFlqYnVkdo');

  /**
   * Get the distance between to sets of coordinates.
   *
   * Stolen from GeoLib's `getDistanceSimple`.
   */
  angular.module('portlandcafes')
    .factory('Distance', function () {
      var toRad = function (num) {
        return num * Math.PI / 180;
      };

      return function getDistance(start, end, accuracy) {
        accuracy = Math.floor(accuracy) || 1;

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
