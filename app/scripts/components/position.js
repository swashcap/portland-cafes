(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .factory('Position', ['Storage', '$q', function (Storage, $q) {
      var geolocationOptions = {
        enableHighAccuracy: true,
        timeout: 5 * 1000,
        maximumAge: 600 * 1000
      };

      var latitude = function (position) {
        return parseFloat((((position || {}).coords || {}).latitude || {}));
      };
      var longitude = function (position) {
        return parseFloat((((position || {}).coords || {}).longitude || {}));
      };

      var getCurrentPosition = function () {
        return $q(function (resolve, reject) {
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
              function (position) {
                Storage.setPosition(JSON.stringify(position));

                resolve(position);
              },
              function (error) {
                reject(error);
              },
              geolocationOptions
            );
          } else {
            reject('Browser doesn\'t support geolocation');
          }
        });
      };

      /**
       * Get a human-readable address from a position.
       *
       * @{@link  https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse}
       */
      var getCurrentAddress = function (latitude, longitude) {
        return $q(function (resolve, reject) {
          var geocoder, latLng;

          if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            reject('Invalid position.');
            return;
          }

          geocoder = new google.maps.Geocoder();
          latLng = new google.maps.LatLng(latitude, longitude);

          /** @todo Use a more human-readable address */
          geocoder.geocode({latLng: latLng}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                Storage.setAddress(results[1].formatted_address);

                resolve(results[1].formatted_address);
              } else {
                reject('No address found.');
              }
            } else {
              reject('Address lookup failed: ' + status.toString());
            }
          });
        });
      };

      // Public API
      return {
        getPosition: function () {
          var storedPosition = Storage.getPosition();

          return {
            latitude: latitude(storedPosition),
            longitude: longitude(storedPosition)
          };
        },
        getAddress: function () {
          return Storage.getAddress();
        },
        updatePosition: function () {
          /** @todo Figure out how to not nest all this garbage. */
          return $q(function (resolve, reject) {
            getCurrentPosition().then(function (position) {
              getCurrentAddress(latitude(position), longitude(position))
                .then(function (address) {
                  resolve(
                    {
                      latitude: latitude(position),
                      longitude: longitude(position),
                    },
                    address
                  );
                }).catch(function (error) {
                  reject(error);
                });
            }).catch(function (error) {
              console.log(error);
            });
          });
        },

        // Set a position based on predefined options
        setPosition: function (slug) {

        }
      };
    }]);
})(window.angular);
