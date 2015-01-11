/* global geolib */
(function (angular) {
  'use strict';

  /**
   * Factory wrapper for a few GeoLib methods.
   */
  angular.module('portlandcafes')
    .factory('Geolib', function () {
      return {
        getDistance: function (start, end) {
          return this.metersToMiles(geolib.getDistanceSimple(start, end, 10));
        },
        isPointInside: function (latlng, coords) {
          return geolib.isPointInside(latlng, coords);
        },
        metersToMiles: function (distance) {
          return geolib.convertUnit('mi', distance, 2);
        }
      };
    });
})(window.angular);
