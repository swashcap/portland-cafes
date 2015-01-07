(function (angular) {
  'use strict';

  /**
   * Application storage.
   *
   * This serves as a single-point access to Local Storage with a fallback to
   * AngularJS's cache.
   */
  angular.module('portlandcafes')
    .factory('Storage', ['$cacheFactory', function ($cacheFactory) {
      var cache = $cacheFactory('pc-storage');

      var storageShim = {
        clear: function () {
          return cache.removeAll();
        },
        getItem: function (key) {
          return cache.get(key);
        },
        length: (function () {
          return cache.info().size;
        }()),
        removeItem: function (key) {
          return cache.remove(key);
        },
        setItem: function (key, value) {
          return cache.put(key, value);
        }
      };

      var localStorage = window.localStorage || storageShim;

      var POSITION_KEY = 'pc-position';
      var ADDRESS_KEY = 'pc-address';
      var PREFERENCES_KEY = 'pc-preferences';

      return {
        getPosition: function () {
          return JSON.parse(localStorage.getItem(POSITION_KEY));
        },
        setPosition: function (position) {
          if (position instanceof Object) {
            position = JSON.stringify(position);
          }

          return localStorage.setItem(POSITION_KEY, position);
        },
        getAddress: function () {
          return localStorage.getItem(ADDRESS_KEY);
        },
        setAddress: function (address) {
          if (address instanceof Object) {
            address = JSON.stringify(address);
          }

          return localStorage.setItem(ADDRESS_KEY, address);
        },
        getPreferences: function () {
          return JSON.parse(localStorage.getItem(PREFERENCES_KEY));

        },
        setPreferences: function (prefs) {
          return localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
        }
      };
    }]);
})(window.angular);
