/* global IDBStore */
(function (angular) {
  'use strict';

  angular.module('pcStorage')
    .factory('IndexedDB', ['$q', function ($q) {
      var DB_VERSION = 2;
      var STORE_NAME = 'pc-locations';

      var store = $q(function (resolve, reject) {
        var idbStore = new IDBStore({
          dbVersion: DB_VERSION,
          storeName: STORE_NAME,
          keyPath: 'id',
          indexes: [{
            name: 'name',
            unique: false
          }, {
            name: 'placeId',
            unique: true
          }],
          onStoreReady: function () {
            resolve(idbStore);
          },
          onError: function (err) {
            reject(err);
          }
        });
      });

      var IndexedDBResponse = function (fn) {
        this._deferred = $q.defer();

        store.then(fn.bind(this)).catch(this.errorHandler);

        return this._deferred.promise;
      };
      IndexedDBResponse.prototype.successHandler = function (data) {
        this._deferred.resolve(data);
      };
      IndexedDBResponse.prototype.errorHandler = function (err) {
        this._deferred.reject(err);
      };


      return {
        count: function () {
          return new IndexedDBResponse(function (store) {
            var that = this;
            store.count(
              that.successHandler.bind(that),
              { onError: that.errorHandler.bind(that) }
            );
          });
        },
        clear: function () {
          return new IndexedDBResponse(function (store) {
            var that = this;

            store.clear(
              that.successHandler.bind(that),
              that.errorHandler.bind(that)
            );
          });
        },
        put: function (data) {
          // return $q(function (resolve) {
          //   resolve(data);
          // });

          return new IndexedDBResponse(function (store) {
            var that = this;

            if (Array.isArray(data)) {
              store.putBatch(
                data,
                that.successHandler.bind(that),
                that.errorHandler.bind(that)
              );
            } else if ('id' in data) {
              store.put(
                data,
                that.successHandler.bind(that),
                that.errorHandler.bind(that)
              );
            }
          });
        },
        get: function (id) {
          return new IndexedDBResponse(function (store) {
            var that = this;
            store.get(
              id,
              that.successHandler.bind(that),
              that.errorHandler.bind(that)
            );
          });
        },
        getAll: function () {
          return new IndexedDBResponse(function (store) {
            var that = this;
            store.getAll(
              that.successHandler.bind(that),
              that.errorHandler.bind(that)
            );
          });
        },
        filter: function (index, callback) {
          return new IndexedDBResponse(function (store) {
            var that = this;
            var items = [];
            var itemFilter = function (item) {
              if (callback(item)) {
                items.push(item);
              }
            };

            store.iterate(itemFilter, {
              index: index,
              onEnd: that.successHandler.bind(that, items),
              onError: that.errorHandler.bind(that)
            });
          });
        },
        query: function (index, id) {
          /**
           * @todo This only queries by a single key. Expand to offer more query
           *       options.
           */
          return new IndexedDBResponse(function (store) {
            var that = this;
            store.query(
              that.successHandler.bind(that), {
              index: index,
              keyRange: store.keyRange.only(id),
              onError: that.errorHandler.bind(that)
            });
          });
        }
      };
    }]);
})(window.angular);
