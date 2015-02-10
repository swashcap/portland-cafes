(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .service('Locations', ['$rootScope', '$q', function ($rootScope, $q) {
      var deferred = new $q.defer();
      var locations = deferred.promise;

      this._setLocations = function (values) {
        if (Array.isArray(values) && values.length) {
          deferred.resolve(values);
        } else {
          deferred.reject('No locations available');
        }
      };

      this.getAll = function () {
        return $q(function (resolve, reject) {
          locations.then(function (locations) {
            resolve(locations);
          }).catch(function (err) {
            reject(err);
          });
        });
      };
      this.get = function (id) {
        return $q(function (resolve, reject) {
          locations.then(function (locations) {
            var result = locations.filter(function (location) {
              return location.id === id;
            }).shift();

            if (result) {
              resolve(result);
            } else {
              reject('Couldn\'t find requested ID.');
            }
          }).catch(function (err) {
            reject(err);
          });
        });
      };
    }]);
})(window.angular);
