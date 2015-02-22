/* global google */
(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .service('Locations', ['$q', 'IndexedDB', function ($q, IndexedDB) {
      var nameFilter = function (location) {
        if (
          location instanceof Object &&
          'name' in location &&
          location.name.toLowerCase().indexOf(this.toLowerCase()) !== -1
        ) {
          return true;
        } else {
          return false;
        }
      };

      this.getAll = function () {
        return IndexedDB.getAll();
      };

      this.get = function (id) {
        return IndexedDB.get(id);
      };

      this.search = function (search) {
        return $q(function (resolve, reject) {
          if (typeof search !== 'string' || search.length === 0) {
            reject('Invalid search.');
          }

          IndexedDB.query('name', nameFilter.bind(search))
            .then(function (results) {
              resolve(results);
            }).catch(function (err) {
              reject(err);
            });
        });
      };

      /**
       * Retrieve a location's reviews from Google's Places Details API.
       *
       * @{@link https://developers.google.com/maps/documentation/javascript/places#place_details}
       */
      this.getReviews = function (placeId) {
        return $q(function (resolve, reject) {
          if (typeof placeId === 'undefined') {
            reject('Invalid ID');
          }

          var service = new google.maps.places.PlacesService(document.createElement('div'));

          service.getDetails({ placeId: placeId }, function (place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              var reviews = place.reviews || [];
              resolve(reviews);
            } else {
              reject('Places API failure:' + status.toString());
            }
          });
        });
      };
    }]);
})(window.angular);
