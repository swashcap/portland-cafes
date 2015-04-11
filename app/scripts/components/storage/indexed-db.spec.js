/* global module,inject */
describe('IndexedDB Component', function () {
  'use strict';

  /**
   * Use `mock-indexeddb` for testing the IndexedDB implementation.
   * @{@link  https://github.com/szimmers/mock-indexeddb}
   */
  var location1 = {
    id: 1,
    name: 'Test Location 1',
    region: 'north',
    isOpen: false
  };
  var location2 = {
    id: 2,
    name: 'Test Location 2',
    region: 'north',
    isOpen: true
  };
  var location3 = {
    id: 3,
    name: 'Test Location 3',
    region: 'downtown',
    isOpen: true
  };

  beforeEach(function () {
    module('pcStorage');

    // resetIndexedDBMock();
    // commitIndexedDBMockData(location1.id, location1);
    // commitIndexedDBMockData(location2.id, location2);
    // commitIndexedDBMockData(location3.id, location3);
  });

  xit('should store locations', function (done) {
    inject(function (IndexedDB) {
      IndexedDB.put([location1, location2, location3]).then(done).catch(done);
    });
  });
});
