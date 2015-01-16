/* global jasmine, describe, it, xit, expect, beforeEach, afterEach, module, inject */
describe('The Hours component', function () {
  'use strict';

  /**
   * Initialize the application before each `it` test.
   *
   * Use ngMock's global `module` and `inject` methods to provide the `Hours`
   * component.
   *
   * @{@link http://stackoverflow.com/a/16567868}
   */
  beforeEach(module('portlandcafes'));

  /**
   * Sample `periods` property directly from Google's Details API.
   *
   * Human-readable results _should_ follow the `weekday_text` property:
   *
   *     [
   *       "Monday: 9:00 am – 3:00 pm",
   *       "Tuesday: 9:00 am – 3:00 pm",
   *       "Wednesday: 9:00 am – 3:00 pm, 5:00 pm – 12:00 am",
   *       "Thursday: 9:00 am – 3:00 pm, 5:00 pm – 12:00 am",
   *       "Friday: 9:00 am – 3:00 pm, 5:00 pm – 12:00 am",
   *       "Saturday: 9:00 am – 3:00 pm, 5:00 pm – 12:00 am",
   *       "Sunday: 9:00 am – 3:00 pm"
   *     ]
   *
   * @type {Array}
   */
  var samplePeriods;

  /** Reset `samplePeriods` to avoid side effects. */
  beforeEach(function () {
    samplePeriods = [{
      'close': {
        'day': 0,
        'time': '1500'
      },
      'open': {
        'day': 0,
        'time': '0900'
      }
    }, {
      'close': {
        'day': 1,
        'time': '1500'
      },
      'open': {
        'day': 1,
        'time': '0900'
      }
    }, {
      'close': {
        'day': 2,
        'time': '1500'
      },
      'open': {
        'day': 2,
        'time': '0900'
      }
    }, {
      'close': {
        'day': 3,
        'time': '1500'
      },
      'open': {
        'day': 3,
        'time': '0900'
      }
    }, {
      'close': {
        'day': 4,
        'time': '0000'
      },
      'open': {
        'day': 3,
        'time': '1700'
      }
    }, {
      'close': {
        'day': 4,
        'time': '1500'
      },
      'open': {
        'day': 4,
        'time': '0900'
      }
    }, {
      'close': {
        'day': 5,
        'time': '0000'
      },
      'open': {
        'day': 4,
        'time': '1700'
      }
    }, {
      'close': {
        'day': 5,
        'time': '1500'
      },
      'open': {
        'day': 5,
        'time': '0900'
      }
    }, {
      'close': {
        'day': 6,
        'time': '0000'
      },
      'open': {
        'day': 5,
        'time': '1700'
      }
    }, {
      'close': {
        'day': 6,
        'time': '1500'
      },
      'open': {
        'day': 6,
        'time': '0900'
      }
    }, {
      'close': {
        'day': 0,
        'time': '0000'
      },
      'open': {
        'day': 6,
        'time': '1700'
      }
    }];
  });

  it('should return correct day names', inject(function (Hours) {
    expect(Hours.getDayName(0)).toEqual('Sunday');
    expect(Hours.getDayName(3)).toEqual('Wednesday');
    expect(Hours.getDayName(7)).toBeUndefined();
  }));

  it('should convert time-based strings to numbers', inject(function (Hours) {
    expect(Hours.strToTime('0000')).toEqual(0);
    expect(Hours.strToTime('0700')).toEqual(7);
    expect(Hours.strToTime('0900')).toEqual(9);
    expect(Hours.strToTime('2030')).toEqual(20.5);
  }));

  it('should convert number-based time into human-readable time', inject(function (Hours) {
    expect(Hours.formatTime(8.25)).toEqual('8:15 AM');
    expect(Hours.formatTime(0)).toEqual('12:00 AM');
    expect(Hours.formatTime(23.22)).toEqual('11:13 PM');
    expect(Hours.formatTime(18)).toEqual('6:00 PM');
  }));


  it('should return proper hour ranges for a day', inject(function (Hours) {
    expect(Hours.getHoursByDay(samplePeriods, 0)).toEqual('9:00 AM - 3:00 PM');
    expect(Hours.getHoursByDay(samplePeriods, 5))
      .toEqual('9:00 AM - 3:00 PM, 5:00 PM - 12:00 AM');
  }));

  /**
   * Use Jasmine's clock to test methods that are tied to `Date`.
   * @{@link http://jasmine.github.io/edge/introduction.html#section-Jasmine_Clock}
   */
  describe('should show correct day/time', function () {
    beforeEach(function () {
      jasmine.clock().install();
    });

    afterEach(function () {
      jasmine.clock().uninstall();
    });

    it('for the day', inject(function (Hours) {
      /** January 1st, 2015 was a Thursday. */
      jasmine.clock().mockDate(new Date(2015, 0, 1));
      expect(Hours.getCurrentDay()).toEqual(4);

      /** January 4th, 2015 was a Sunday. */
      jasmine.clock().mockDate(new Date(2015, 0, 4));
      expect(Hours.getCurrentDay()).toEqual(0);

      /** January 10th, 2015 was a Saturday. */
      jasmine.clock().mockDate(new Date(2015, 0, 10));
      expect(Hours.getCurrentDay()).toEqual(6);
    }));

    it('for the current time', inject(function (Hours) {
      jasmine.clock().mockDate(new Date(2015, 0, 1, 8, 30));
      expect(Hours.getCurrentTime()).toEqual(8.5);

      jasmine.clock().mockDate(new Date(2015, 0, 1, 15, 15));
      expect(Hours.getCurrentTime()).toEqual(15.25);

      jasmine.clock().mockDate(new Date(2015, 0, 1, 0, 45));
      expect(Hours.getCurrentTime()).toEqual(0.75);
    }));

    it('for the opening time', inject(function (Hours) {
      jasmine.clock().mockDate(new Date(2015, 0, 4, 8, 45));
      expect(Hours.getOpenTime(samplePeriods)).toEqual(9);

      jasmine.clock().mockDate(new Date(2015, 0, 1, 9, 15));
      expect(Hours.getOpenTime(samplePeriods)).toEqual(9);

      jasmine.clock().mockDate(new Date(2015, 0, 1, 16, 0));
      expect(Hours.getOpenTime(samplePeriods)).toEqual(17);

      jasmine.clock().mockDate(new Date(2015, 0, 10));
      expect(Hours.getOpenTime(samplePeriods)).toEqual(9);
    }));

    it('for the closing time', inject(function (Hours) {
      jasmine.clock().mockDate(new Date(2015, 0, 1, 8, 0));
      expect(Hours.getCloseTime(samplePeriods)).toEqual(15);

      jasmine.clock().mockDate(new Date(2015, 0, 1, 14, 45));
      expect(Hours.getCloseTime(samplePeriods)).toEqual(15);

      jasmine.clock().mockDate(new Date(2015, 0, 1, 16, 0));
      expect(Hours.getCloseTime(samplePeriods)).toEqual(0);

      jasmine.clock().mockDate(new Date(2015, 0, 1, 23));
      expect(Hours.getCloseTime(samplePeriods)).toEqual(0);
    }));

    it('should determine whether a location is currently open', inject(function (Hours) {
      jasmine.clock().mockDate(new Date(2015, 0, 1, 8, 30));
      expect(Hours.isOpen(samplePeriods)).toBe(false);

      jasmine.clock().mockDate(new Date(2015, 0, 1, 9, 15));
      expect(Hours.isOpen(samplePeriods)).toBe(true);

      jasmine.clock().mockDate(new Date(2015, 0, 1, 16, 0));
      expect(Hours.isOpen(samplePeriods)).toBe(false);

      jasmine.clock().mockDate(new Date(2015, 0, 1, 17, 15));
      expect(Hours.isOpen(samplePeriods)).toBe(true);
    }));

    it ('should determine whether a location is closing soon', inject(function (Hours) {
      jasmine.clock().mockDate(new Date(2015, 0, 1, 23, 30));
      expect(Hours.isClosingSoon(samplePeriods, 0.25)).toBe(false);

      jasmine.clock().mockDate(new Date(2015, 0, 1, 23, 46));
      expect(Hours.isClosingSoon(samplePeriods, 0.25)).toBe(true);
    }));
  });
});
