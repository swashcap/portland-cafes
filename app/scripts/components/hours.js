(function (angular) {
  'use strict';

  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

    time = parseInt(time, 10);

    if (typeof time !== 'number') {
      hours = Math.floor(time);
      minutes = time - hours;

      if (hours === 0) {
        hours = 12;
      } else if (hours >= 12) {
        hours = hours - 12;
        isPM = true;
      }

      minutes = Math.round(minutes / 60);

      if (minutes < 10) {
        minutes = '0' + minutes;
      }

      output = hours + ':' + minutes + ' ' + (isPM ? 'PM' : 'AM');
    }

    return output;
  };

  var pluckByDay = function (day, period) {
    return (((period).open || {}).day || undefined) === day;
  };

  angular.module('portlandcafes')
    .filter('humanTime', function () {
      return formatTime
    });

  angular.module('portlandcafes')
    .factory('Hours', function () {
      return {
        formatTime: formatTime,
        getCurrentDay: function () {
          return (new Date()).getDay();
        },
        getCurrentTime: function () {
          var now = new Date();

          return now.getHours() + now.getMinutes() / 60;
        },
        getHoursByDay: function (periods, dayNumber) {
          periods = periods || [];
          dayNumber = dayNumber || 0;

          return periods.filter(function (period) {
            if (period.open.day === dayNumber) {
              return true;
            }
          }).map(function (period) {
            if ('open' in period && 'close' in period) {
              return formatTime(strToTime(period.open.time)) + ' – ' + formatTime(strToTime(period.close.time));
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
        },

        /** @todo Possible remove this method? */
        getCurrentHours: function (periods) {
          var test = periods.filter(function (period) {
            if (period.open.day === currentDay) {
              return true;
            }
          });

          for (var i = 0; i < test.length; i++) {
            if (
              (
                strToTime(test[i].open.time) < currentTime &&
                currentTime < strToTime(test[i].close.time)
              ) ||
              i === test.length - 1
            ) {
              return formatTime(test[i].open.time) + ' – ' + formatTime(test[i].close.time);
            }
          }
        },
        getOpenTime: function (periods) {
          var currentDay = this.getCurrentDay();
          var currentTime = this.getCurrentTime();

          return periods
            .filter(pluckByDay.bind(this, currentDay))
            .map(function (period) {
              return strToTime(period.open.time);
            })
            .reduce(function (previous, current, index) {
              if (previous < current) {
                return previous;
              } else {
                return current;
              }
            }, 24);
        },
        getCloseTime: function (periods) {
          var currentDay = this.getCurrentDay();
          var currentTime = this.getCurrentTime();

          return periods
            .filter(pluckByDay.bind(this, currentDay))
            .map(function (period) {
              return strToTime(period.close.time);
            })
            .reduce(function (previous, current, index) {
              if (previous > current) {
                return previous
              } else {
                return current
              }
            }, 0);
        },

        /**
         * Retrieve 'open' status from the available periods.
         * @param  {Array}   periods
         * @return {Boolean}
         */
        isOpen: function (periods) {
          var currentTime = this.getCurrentTime();
          var openTime = this.getOpenTime(periods);
          var closeTime = this.getCloseTime(periods);

          if (openTime < currentTime && currentTime < closeTime) {
            return true;
          } else {
            return false;
          }
        },

        isClosingSoon: function (periods) {
          var currentTime = this.getCurrentTime();
          var closeTime = this.getCloseTime(periods);

          if (currentTime < closeTime && currentTime + .25 >= closeTime) {
            return true;
          } else {
            return false;
          }
        }
      };
    });
})(window.angular);
