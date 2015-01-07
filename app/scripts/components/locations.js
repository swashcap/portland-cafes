(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .service('Locations', function () {
      /** @todo Attach service's data to the browser's cache */

      var locations = [{
        id: 100,
        name: 'Crema Bakery',
        address: '2728 Southeast Ankeny Street\nPortland OR 97214',
        coords: {
          latitude: 45.5219961,
          longitude: -122.6374976
        },
        hours: {
          open: 6,
          close: 18
        }
      }, {
        id: 101,
        name: 'Green Beans Coffee and Tea',
        address: '2327 East Burnside Street\nPortland OR 97214',
        coords: {
          latitude: 45.5230551,
          longitude:  -122.6417661
        },
        hours: {
          open: 7,
          close: 20.5
        }
      }, {
        id: 102,
        name: 'Common Grounds Coffeehouse',
        address: '4321 Southeast Hawthorne Boulevard\nPortland OR 97215',
        coords: {
          latitude: 45.512208,
          longitude: -122.6178261
        },
        hours: {
          open: 6.5,
          close: 22
        }
      }, {
        id: 103,
        name: 'Floyd’s Coffee Shop Old Town',
        address: '118 Northwest Couch Street\nPortland, OR 97209',
        coords: {
          latitude: 45.5236509,
          longitude: -122.6716318
        },
        hours: {
          open: 8,
          close: 17
        }
      }, {
        id: 104,
        name: 'Milo’s Espresso',
        address: '16234 Southeast Division Street\nPortland, OR 97236',
        coords: {
          latitude: 45.5042416,
          longitude: -122.4961532
        },
        hours: {
          open: 5,
          close: 18
        }
      }, {
        id: 105,
        name: 'Tiny’s Coffee',
        address: '1412 Southeast 12th Avenue\nPortland, OR 97214',
        coords: {
          latitude: 45.5126021,
          longitude: -122.6534296
        },
        hours: {
          open: 10,
          close: 19
        }
      }];

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
    });
})(window.angular);
