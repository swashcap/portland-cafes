(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .value('Regions', [{
      name: 'Downtown Portland',
      slug: 'downtown',
      center: { latitude: 45.518583, longitude: -122.678532 }
    }, {
      name: 'North Portland',
      slug: 'north',
      center: { latitude: 45.590936, longitude: -122.717692 }
    }, {
      name: 'Northwest Portland',
      slug: 'northwest',
      center: { latitude: 45.532473, longitude: -122.699121 }
    }, {
      name: 'Northeast Portland',
      slug: 'northeast',
      center: { latitude: 45.566493, longitude: -122.679294 }
    }, {
      name: 'Southeast Portland',
      slug: 'southeast',
      bounds: [
        { latitude: 45.523041, longitude: -122.667390 },
        { latitude: 45.523523, longitude: -122.623101 },
        { latitude: 45.522621, longitude: -122.566367 },
        { latitude: 45.522200, longitude: -122.497617 },
        { latitude: 45.518351, longitude: -122.483798 },
        { latitude: 45.475695, longitude: -122.485257 },
        { latitude: 45.461369, longitude: -122.510835 },
        { latitude: 45.457516, longitude: -122.566024 },
        { latitude: 45.461129, longitude: -122.641212 },
        { latitude: 45.455409, longitude: -122.646619 },
        { latitude: 45.457516, longitude: -122.660781 },
        { latitude: 45.477140, longitude: -122.665759 },
        { latitude: 45.501208, longitude: -122.664557 }
      ],
      center: { latitude: 45.505290, longitude: -122.601703 }
    }, {
      name: 'Southwest Portland',
      slug: 'southwest',
      center: { latitude: 45.478346, longitude: -122.701232 }
    }]);
})(window.angular);
