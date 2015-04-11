/* global module,inject */
describe('Preferences component', function () {
  'use strict';

  var storage;

  beforeEach(module('portlandcafes'));

  beforeEach(module(function ($provide) {
    /** Mock the `$localStorage` service. */
    $provide.factory('$localStorage', function () {
      return {
        set: function(key, value) {
          storage[key] = value;
        },
        get: function(key, defaultValue) {
          return storage[key] || defaultValue;
        },
        setObject: function(key, value) {
          storage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
          return JSON.parse(storage[key] || '{}');
        }
      };
    });
  }));

  beforeEach(function () {
    storage = {};
  });

  it('should get/set position', inject(function (Preferences) {
    Preferences.setPosition({
      latitude: 45,
      longitude: -122
    });
    expect(Preferences.getPosition()).toEqual({
      latitude: 45,
      longitude: -122
    });
  }));

  it('should get/set address', inject(function (Preferences) {
    var testAddress = 'North Portland';

    Preferences.setAddress(testAddress);
    expect(Preferences.getAddress()).toEqual(testAddress);
  }));

  it('should retain distance range', inject(function (Preferences) {
    expect(Preferences.distanceRange()).toBeDefined();

    Preferences.distanceRange(2);
    expect(Preferences.distanceRange()).toEqual(2);
  }));

  it('should retain hide closed', inject(function (Preferences) {
    expect(Preferences.hideClosed()).toBeDefined();

    Preferences.hideClosed(false);
    expect(Preferences.hideClosed()).toBeFalsy();
  }));

  it('should retain rating limit', inject(function (Preferences) {
    expect(Preferences.ratingLimit()).toBeDefined();

    Preferences.ratingLimit(4);
    expect(Preferences.ratingLimit()).toEqual(4);
  }));

  it('should retain filter property', inject(function (Preferences) {
    expect(Preferences.filterProperty()).toBeDefined();

    Preferences.filterProperty('testing');
    expect(Preferences.filterProperty()).toEqual('testing');
  }));

  it('should retiain filter direction', inject(function (Preferences) {
    expect(Preferences.filterReverse()).toBeDefined();

    Preferences.filterReverse(true);
    expect(Preferences.filterReverse()).toBeTruthy();
  }));

  it('should get/set timestamp', inject(function (Preferences) {
    Preferences.setStorageTimestamp(1000);
    expect(Preferences.getStorageTimestamp()).toEqual(1000);
  }));
});
