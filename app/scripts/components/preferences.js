(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .factory('Preferences', ['$localStorage', function ($localStorage) {
      var DEFAULT_PREFERENCES = {
        hideClosed: true,
        distanceRange: 2,
        ratingLimit: 0,
        filterProperty: 'name',
        filterReverse: false
      };
      var POSITION_KEY = 'pc-position';
      var ADDRESS_KEY = 'pc-address';
      var PREFERENCES_KEY = 'pc-preferences';
      var STORAGE_TIMESTAMP_KEY = 'pc-storage-timestamp';

      var _getPreferences = function () {
        return $localStorage.getObject(PREFERENCES_KEY);
      };

      var _setPreferences = function (preferences) {
        $localStorage.setObject(PREFERENCES_KEY, preferences);

        return _getPreferences();
      };

      var _getPref = function (key) {
        var preferences = _getPreferences();

        if (key in preferences) {
          return preferences[key];
        }
      };
      var _setPref = function (key, value) {
        var preferences = _getPreferences();

        preferences[key] = value;

        _setPreferences(preferences);
      };

      var getPosition = function () {
        var position = $localStorage.getObject(POSITION_KEY);

        if (Object.keys(position).length) {
          return position;
        }
      };

      var setPosition = function (position) {
        $localStorage.setObject(POSITION_KEY, position);

        return getPosition();
      };

      var getAddress = function () {
        return $localStorage.get(ADDRESS_KEY);
      };

      var setAddress = function (address) {
        $localStorage.set(ADDRESS_KEY, address);

        return getAddress();
      };

      var distanceRange = function (distance) {
        if (typeof distance !== undefined && parseFloat(distance)) {
          _setPref('distanceRange', parseFloat(distance));
        }

        return _getPref('distanceRange');
      };
      var hideClosed = function (hide) {
        if (typeof hide !== 'undefined') {
          hide = (hide) ? true : false;

          _setPref('hideClosed', hide);
        }

        return _getPref('hideClosed');
      };
      var ratingLimit = function (rating) {
        if (typeof rating !== 'undefined' && typeof parseFloat(rating) === 'number') {
          _setPref('ratingLimit', parseFloat(rating));
        }

        return _getPref('ratingLimit');
      };
      var filterProperty = function (property) {
        if (typeof property === 'string') {
          _setPref('filterProperty', property);
        }

        return _getPref('filterProperty');
      };
      var filterReverse = function (reverse) {
        if (typeof reverse === 'boolean') {
          _setPref('filterReverse', reverse);
        }

        return _getPref('filterReverse');
      };
      var getStorageTimestamp = function () {
        return $localStorage.get(STORAGE_TIMESTAMP_KEY);
      };
      var setStorageTimestamp = function (timestamp) {
        timestamp = timestamp || (new Date()).getTime();

        $localStorage.set(STORAGE_TIMESTAMP_KEY, timestamp);

        return getStorageTimestamp();
      };


      /**
       * Initialize the service by ensuring preferences are set.
       *
       * @{@link  https://docs.angularjs.org/api/ng/function/angular.extend}
       */
      _setPreferences(angular.extend({}, DEFAULT_PREFERENCES, _getPreferences()));

      return {
        getPosition: getPosition,
        setPosition: setPosition,
        getAddress: getAddress,
        setAddress: setAddress,
        distanceRange: distanceRange,
        hideClosed: hideClosed,
        ratingLimit: ratingLimit,
        filterProperty: filterProperty,
        filterReverse: filterReverse,
        getStorageTimestamp: getStorageTimestamp,
        setStorageTimestamp: setStorageTimestamp
      };
    }]);
})(window.angular);
