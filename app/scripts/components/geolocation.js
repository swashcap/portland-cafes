(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .factory('Geolocation', ['Storage', '$q', function (Storage, $q) {
      /**
       * A collection of pre-defined locations accross the city. The user may
       * choose one of these instead of his/her current location.
       *
       * @type {Array}
       */
      var positionPresets = [{
        name: 'Downtown',
        coords: {
          latitude: 0,
          longitude: 0
        }
      }, {
        name: 'North',
        coords: {
          latitude: 0,
          longitude: 0
        }
      }, {
        name: 'Northeast',
        coords: {
          latitude: 0,
          longitude: 0
        },
      }, {
        name: 'Northwest',
        coords: {
          latitude: 0,
          longitude: 0
        }
      }, {
        name: 'Southeast',
        coords: {
          latitude: 0,
          longitude: 0
        }
      }, {
        name: 'Southwest',
        coords: {
          latitude: 0,
          longitude: 0
        }
      }];

      var geolocationOptions = {
        enableHighAccuracy: true,
        timeout: 5 * 1000,
        maximumAge: 600 * 1000
      };
      var getCoords = function (pos) {
        if (pos instanceof Object && 'coords' in pos && 'latitude' in pos.coords) {
          return {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          };
        }
      };

      // Get current position from cache if available
      var maybeGetCurrentPosition = function () {
        return Storage.getPosition();
      };

      var getCurrentPosition = function () {
        return $q(function (resolve, reject) {
          var currentPosition = maybeGetCurrentPosition();

          if (currentPosition) {
            resolve(currentPosition);
          } else if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
              function (position) {
                Storage.setPosition(JSON.stringify(position));

                resolve(getCoords(position));
              },
              function (err) {
                reject(err);
              },
              geolocationOptions
            );
          } else {
            reject('Browser doesn\'t support geolocation');
          }
        });
      };

      /**
       * Get the distance between to sets of coordinates.
       *
       * Stolen from GeoLib's `getDistanceSimple`.
       */
      var getDistance = function (start, end, accuracy) {
        accuracy = Math.floor(accuracy) || 1;
        var toRad = function (num) {
          return num * Math.PI / 180;
        };

        var distance =
          Math.round(
            Math.acos(
              Math.sin(
                toRad(end.latitude)
              ) *
              Math.sin(
                toRad(start.latitude)
              ) +
              Math.cos(
                toRad(end.latitude)
              ) *
              Math.cos(
                toRad(start.latitude)
              ) *
              Math.cos(
                toRad(start.longitude) - toRad(end.longitude)
              )
            ) * 6378137
          );

        return Math.floor(Math.round(distance/accuracy)*accuracy);
      };

      /**
       * Get a human-readable address from a position.
       *
       * @{@link  https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse}
       * @param  {object} position A coordinate set with properties `latitude` and `longitude`
       * @return {object}          $q-style promise, which resolves to a street address
       */
      var getHumanAddress = function (position) {
        return $q(function (resolve, reject) {
          if (
            ! (position instanceof Object) ||
            ! 'latitude' in position ||
            ! 'longitude' in position) {
            reject('Invalid position.');
            return;
          }

          var address = Storage.getAddress();
          var geocoder, latLng;

          // Try a stored value first
          if (address) {
            resolve(address);
            return;
          }

          geocoder = new google.maps.Geocoder();
          latLng = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

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

      var setCurrentPosition = function (locationName) {

      };

      // Public API
      return {
        maybeGetCurrentPosition: maybeGetCurrentPosition,
        getCurrentPosition: getCurrentPosition,
        getDistance: getDistance,
        getHumanAddress: getHumanAddress,
        setCurrentPosition: setCurrentPosition
      };
    }]);
})(window.angular);
