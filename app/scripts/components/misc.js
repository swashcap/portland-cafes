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
    .value('locationPresets', [{
      slug: 'north',
      name: 'North Portland',
      coords: {
        latitude: 45.5909413,
        longitude: -122.719752
      }
    }, {
      slug: 'northwest',
      name: 'Northwest Portland',
      coords: {
        latitude: 45.5677248,
        longitude: -122.7522498
      }
    }, {
      slug: 'northeast',
      name: 'Northeast Portland',
      coords: {
        latitude: 45.5659788,
        longitude: -122.5705639
      }
    }, {
      slug: 'downtown',
      name: 'Downtown Portland',
      coords: {
        latitude: 45.5186019,
        longitude: -122.6785419
      }
    }, {
      slug: 'southwest',
      name: 'Southwest Portland',
      coords: {
        latitude: 45.4783044,
        longitude: -122.702905
      }
    }, {
      slug: 'southeast',
      name: 'Southeast Portland',
      coords: {
        latitude: 45.4882427,
        longitude: -122.5751219
      }
    }]);

  angular.module('portlandcafes')
    .value('centerOfPortland', {
      coords: {
        latitude: 45.519999999999996,
        longitude: -122.68194444444445
      }
    });

  angular.module('portlandcafes')
    .constant('GOOGLE_MAPS_KEY', 'AIzaSyA4Wd2HKrDmdh_2HzqPqqa3gsFlqYnVkdo');

  angular.module('portlandcafes')
    .filter('toStars', function () {
      return function (input) {
        var rating = Math.round(parseFloat(input) * 10) * 2;

        if (rating) {
          return '<span class="rating-' + rating + '" title="' + input + ' stars">' + input + '</span>';
        } else {
          return input;
        }
      };
    });
})(window.angular);
