/* global module,inject */
describe('Local Storage', function () {
  'use strict';

  /**
   * Mock out the global `localStorage` for testing.
   * @{@link  http://www.sitepoint.com/mocking-dependencies-angularjs-tests/#mocking-global-objects}
   * @{@link  http://ngokevin.com/blog/angular-unit-testing/}
   */
  var store;

  beforeEach(function () {
    module('pcStorage');

    store = {
      'foo': 'bar',
      'biz': JSON.stringify({foo: 'bar'})
    };

    module(function ($provide) {
      $provide.value('$window', {
        localStorage: store
      });
    });
  });

  it ('should get value by key', inject(function ($localStorage) {
    expect($localStorage.get('foo')).toEqual('bar');
  }));

  it('should set key/value pairs', inject(function ($localStorage) {
    $localStorage.set('foo', 'baz');
    expect($localStorage.get('foo')).toEqual('baz');
  }));

  it('should get object by key', inject(function ($localStorage) {
    expect($localStorage.getObject('biz')).toEqual({foo: 'bar'});
  }));

  it('should set object by key', inject(function ($localStorage) {
    var sampleObject = {what: 'ever'};

    $localStorage.setObject('biz', sampleObject);
    expect($localStorage.getObject('biz')).toEqual(sampleObject);
  }));
});
