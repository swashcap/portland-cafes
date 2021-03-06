(function (angular) {
  'use strict';

  /** @{@link  http://stackoverflow.com/a/14796206} */
  angular.module('portlandcafes')
    .filter('paginate', function () {
      return function (array, pageNumber, itemsPerPage) {
        array = Array.isArray(array) ? array : [];
        pageNumber = pageNumber || 1;
        itemsPerPage = itemsPerPage || 20;

        return array.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);
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
          return '<span class="rating rating-' + rating + '" title="' + input + ' stars">' + input + '</span>';
        } else {
          return input;
        }
      };
    });

  angular.module('portlandcafes')
    .value('Streets', [{
      name: 'Alberta Street',
      searchTerms: ['albera'],
      slug: 'alberta'
    }, {
      name: 'Belmont Street',
      searchTerms: ['belmont'],
      slug: 'belmont'
    }, {
      name: 'Burnside Street',
      searchTerms: ['burnside'],
      slug: 'burnside'
    }, {
      name: 'Division Street',
      searchTerms: ['division'],
      slug: 'division'
    }, {
      name: 'Hawthorne Boulevard',
      searchTerms: ['hawthorne'],
      slug: 'hawthorne'
    }, {
      name: 'Mississippi Avenue',
      searchTerms: ['mississippi'],
      slug: 'mississippi'
    }, {
      name: 'Sandy Boulevard',
      searchTerms: ['sandy'],
      slug: 'sandy'
    }, {
      name: 'Woodstock Boulevard',
      searchTerms: ['woodstock'],
      slug: 'woodstock'
    }]);
})(window.angular);
