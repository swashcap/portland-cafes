/* global google,console */
(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .factory('Position', ['$rootScope', '$q', 'Storage', 'locationPresets', function ($rootScope, $q, Storage, locationPresets) {
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
      var setPosition = function (position) {
        Storage.setPosition(JSON.stringify(position));

        /**
         * Broadcast a location-set event to the application. Other
         * components can subscribe to this event and use the data.
         *
         * @todo  Roll this into a component or possibly integrate on
         *        the `Storage` layer.
         */
        $rootScope.$broadcast('pc.newPosition', {
          latitude: latitude(position),
          longitude: longitude(position)
        });
      };
      var setAddress = function (address) {
        Storage.setAddress(address);

        /** @todo  Integrate in separate component or `Storage` */
        $rootScope.$broadcast(
          'pc.newAddress',
          address
        );
      };

      var getCurrentPosition = function () {
        return $q(function (resolve, reject) {
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
              function (position) {
                setPosition(position);

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
            /*jshint eqeqeq: false */
            if (status == google.maps.GeocoderStatus.OK) {
            /*jshint eqeqeq: true */
              if (results[1]) {
                /*jshint camelcase: false */
                setAddress(results[1].formatted_address);

                resolve(results[1].formatted_address);
                /*jshint camelcase: true */
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

          if (storedPosition) {
            return {
              latitude: latitude(storedPosition),
              longitude: longitude(storedPosition)
            };
          }
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
          return $q(function (resolve, reject) {
            var location = locationPresets.filter(function (location) {
              return location.slug === slug;
            }).shift();

            if (location) {
              setPosition(location);
              setAddress(location.name);

              resolve({
                latitude: latitude(location),
                longitude: longitude(location)
              });
            } else {
              reject('Couldn’t locate position preset.');
            }
          });
        }
      };
    }]);
})(window.angular);
