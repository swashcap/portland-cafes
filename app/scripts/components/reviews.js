(function (document, angular, google) {
  'use strict';

  angular.module('portlandcafes')
    .service('Reviews', ['$q', function ($q) {
      /**
       * @{@link https://developers.google.com/maps/documentation/javascript/places#place_details}
       */
      this.get = function (id) {
        return $q(function (resolve, reject) {
          if (typeof id === 'undefined') {
            reject('Invalid ID');
          }

          var service = new google.maps.places.PlacesService(document.createElement('div'));

          service.getDetails({ placeId: id }, function (place, status) {
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
})(document, window.angular, window.google);
