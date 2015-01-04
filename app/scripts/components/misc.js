(function (angular) {
  'use strict';

  /** @todo Find a better home for these filters */
  angular.module('portlandcafes')
    .filter('humanTime', function () {
      return function (input) {
        var isPM = false;
        var hours = 0;
        var minutes = 0;

        if (input >= 12) {
          hours = Math.floor(input - 12);
          isPM = true;
        } else {
          hours = Math.floor(input);
        }

        minutes = input % 1 * 60;

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
})(window.angular);
