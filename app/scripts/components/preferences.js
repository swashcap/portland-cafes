(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .service('Preferences', ['Storage', function (Storage) {
      var defaults = {
        hideClosed: false,
        distanceRange: 1,
        ratingLimit: 0,
        filterProperty: 'name',
        filterReverse: false
      };
      var preferences;

      var save = function () {
        Storage.setPreferences(preferences);
      };

      /**
       * Initialize by retrieving the preferences. If nothing's there, save the
       * defaults.
       */
      preferences = Storage.getPreferences();

      if (! preferences) {
        preferences = angular.extend(defaults);
        save();
      }

      // Public API
      this.distanceRange = function (distance) {
        if (typeof distance !== undefined && parseFloat(distance)) {
          preferences.distanceRange = parseFloat(distance);
          save();
        }
        return preferences.distanceRange;
      };
      this.hideClosed = function (hide) {
        if (typeof hide !== 'undefined') {
          hide = (hide) ? true : false;

          preferences.hideClosed = hide;
          save();
        }

        return preferences.hideClosed;
      };
      this.ratingLimit = function (rating) {
        if (typeof rating !== 'undefined' && typeof parseFloat(rating) === 'number') {
          preferences.ratingLimit = parseFloat(rating);
          save();
        }

        return preferences.ratingLimit;
      };
      this.filterProperty = function (property) {
        if (typeof property === 'string') {
          preferences.filterProperty = property;
          save();
        }

        return preferences.filterProperty;
      };
      this.filterReverse = function (reverse) {
        if (typeof reverse === 'boolean') {
          preferences.filterReverse = reverse;
          save();
        }

        return preferences.filterReverse;
      };
    }]);
})(window.angular);
