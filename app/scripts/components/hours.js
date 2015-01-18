(function (angular) {
  'use strict';

  /**
   * [DAYS description]
   * @type {Array}
   */
  var DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  /**
   * Get a day's name by its index.
   * @param  {String} index The day's 0-based index
   * @return {String}
   */
  var getDayName = function (index) {
    return DAYS[index];
  };

  /**
   * Format string-based time into a number
   * @param  {String} string Four-digit format, ex: '0845'
   * @return {Number}
   */
  var strToTime = function (string) {
    if (typeof string === 'string') {
      return parseInt(string.slice(0,2), 10) + parseInt(string.slice(2), 10) / 60;
    }
  };

  /**
   * Format a number-based time into something human-readable.
   * @param  {Number} number
   * @return {String}
   */
  var formatTime = function (time) {
    var isPM = false;
    var output = '';
    var hours;
    var minutes;

    if (typeof time === 'number') {
      hours = Math.floor(time);
      minutes = time - hours;

      if (hours === 0) {
        hours = 12;
      } else if (hours >= 12) {
        hours = hours - 12;
        isPM = true;
      }

      minutes = Math.round(minutes * 60);

      if (minutes < 10) {
        minutes = '0' + minutes;
      }

      output = hours + ':' + minutes + ' ' + (isPM ? 'PM' : 'AM');
    }

    return output;
  };

  /**
   * Is a location open 24 hours, every day?
   *
   * Google's Details API returns a specific `opening_hours.periods` property
   * when a place is open 24 hours a day, 7 days a week. There will only be one
   * child object, and it will *not* contain a `close` property. Example:
   *
   *     ...
   *     periods: [{
   *       open: {
   *         day: 0,
   *         time: '0000'
   *       }
   *     }]
   *     ...
   *
   * @{@link  https://developers.google.com/places/documentation/details#PlaceDetailsResults}
   *
   * @param  {Object}  periods API's `opening_hours.periods` object
   * @return {Boolean}         Whether place is open 24 hours a day, every day
   */
  var isAlwaysOpen = function (periods) {
    if (
      periods.length === 1 &&
      (((periods[0]).open || {}).day || 0) === 0 &&
      (((periods[0]).open || {}).time || '') === '0000' &&
      ! ('close' in periods[0])
    ) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * [getCurrentDay description]
   * @return {[type]} [description]
   */
  var getCurrentDay = function () {
    var now = new Date();

    return now.getDay();
  };

  /**
   * [getCurrentTime description]
   * @return {[type]} [description]
   */
  var getCurrentTime = function () {
    var now = new Date();

    return now.getHours() + now.getMinutes() / 60;
  };

  /** [getHoursByDay description] */
  var getHoursByDay = function (periods, dayNumber) {
    periods = periods || [];
    dayNumber = dayNumber || 0;

    return periods.filter(function (period) {
      if (period.open.day === dayNumber) {
        return true;
      }
    }).map(function (period) {
      if ('open' in period && 'close' in period) {
        return formatTime(strToTime(period.open.time)) + ' - ' + formatTime(strToTime(period.close.time));
      } else {
        return '';
      }
    }).reduce(function (previous, current) {
      if (previous) {
        return previous + ', ' + current;
      } else {
        return current;
      }
    }, '');
  };

  /**
   * Get the opening time.
   * @param  {Object} periods
   * @return {Number}
   */
  var getOpenTime = function (periods) {
    var currentDay = this.getCurrentDay();
    var currentTime = this.getCurrentTime();

    return periods.filter(function (period) {
      return (((period).open || {}).day || 0) === currentDay;
    }).filter(function (period, index, array) {
      var closeTime = strToTime(((period).close || {}).time || 0);

      if (currentTime < closeTime || index === array.length - 1) {
        return true
      }
    }).map(function (period) {
      return strToTime(period.open.time);
    }).shift();
  };

  /**
   * Get the closing time.
   * @param  {Object} periods
   * @return {Number}
   */
  var getCloseTime = function (periods) {
    var currentDay = this.getCurrentDay();
    var currentTime = this.getCurrentTime();

    /** @todo `getOpenTime` shares these filters' code. Remove duplication. */
    return periods.filter(function (period) {
      return (((period).open || {}).day || 0) === currentDay;
    }).filter(function (period, index, array) {
      var closeTime = strToTime(((period).close || {}).time || 0);

      if (currentTime < closeTime || index === array.length - 1) {
        return true
      }
    }).map(function (period) {
      return strToTime(period.close.time);
    }).shift();
  };

  /**
   * Retrieve 'open' status from the available periods.
   * @param  {Array}   periods
   * @return {Boolean}
   */
  var isOpen = function (periods) {
    var currentTime = this.getCurrentTime();
    var openTime = this.getOpenTime(periods);
    var closeTime = this.getCloseTime(periods);

    closeTime = (closeTime === 0) ? 24 : closeTime;

    if (openTime < currentTime && currentTime < closeTime) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * [isClosingSoon description]
   * @param  {[type]}  periods [description]
   * @param  {[type]}  margin  [description]
   * @return {Boolean}         [description]
   */
  var isClosingSoon = function (periods, margin) {
    margin = margin || .25;

    var currentTime = this.getCurrentTime();
    var closeTime = this.getCloseTime(periods);

    closeTime = (closeTime === 0) ? 24 : closeTime;

    if (currentTime < closeTime && currentTime + margin >= closeTime) {
      return true;
    } else {
      return false;
    }
  };

  angular.module('portlandcafes')
    .filter('humanTime', function () {
      return formatTime;
    });

  angular.module('portlandcafes')
    .factory('Hours', function () {
      return {
        getDayName: getDayName,
        strToTime: strToTime,
        formatTime: formatTime,
        getCurrentDay: getCurrentDay,
        getCurrentTime: getCurrentTime,
        getHoursByDay: getHoursByDay,
        getOpenTime: getOpenTime,
        getCloseTime: getCloseTime,
        isOpen: isOpen,
        isClosingSoon: isClosingSoon,
        isAlwaysOpen: isAlwaysOpen
      };
    });
})(window.angular);
