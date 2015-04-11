(function (window, angular) {
  'use strict';

  /**
   * Wrap `localStorage` in a service.
   *
   * @{@link  http://learn.ionicframework.com/formulas/localstorage/#angularjs-service}
   */
  angular.module('pcStorage', [])
    .factory('$localStorage', ['$window', function ($window) {
      var localStorage = $window.localStorage;

      return {
        set: function(key, value) {
          localStorage[key] = value;
        },
        get: function(key, defaultValue) {
          return localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
          localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
          return JSON.parse(localStorage[key] || '{}');
        }
      };
    }]);
})(window, window.angular);
