/* global google */
(function (angular) {
  'use strict';

  /**
   * Custom Maps Directive.
   *
   * @todo Find a separate file or better home.
   */
  angular.module('portlandcafes')
    .directive('pcMap', ['centerOfPortland', function (centerOfPortland) {
      var coordsPattern = /(\-?\d{1,3}\.\d+), ?(\-?\d{1,3}\.\d+)/;
      var coordsToObject = function (coords) {
        var output, matches;

        if (typeof coords !== 'string') {
          return;
        }

        if (coords.indexOf('[') !== -1 || coords.indexOf('{') !== -1) {
          try {
            output = eval(coords);
          } catch (err) {
            /** @todo  Try manually parsing? */
            console.log(err);
          }
        } else if (coordsPattern.test(coords)) {
          matches = coords.match(coordsPattern);

          output = {
            latitude: matches[1],
            longitude: matches[2]
          };
        } else {
          output = {
            latitude: null,
            longitude: null
          };
        }

        return output;
      };
      var addMarkers = function (markers, map) {
        var addSingleMarker = function (latitude, longitude) {
          return new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map,
            title: '' // @todo Figure this out
          });
        };
        var output;

        if (Array.isArray(markers)) {
          output = [];
          markers.forEach(function (marker) {
            output.push(addSingleMarker(marker.latitude, marker.longitude));
          });
        } else if ('latitude' in markers && 'longitude' in markers) {
          output = addSingleMarker(markers.latitude, markers.longitude);
        }

        return output;
      };

      return {
        link: function (scope, element, attrs) {
          var center = coordsToObject(attrs.center) || centerOfPortland;
          var markers = coordsToObject(attrs.markers) || [];
          var zoom = parseInt(attrs.zoom) || 12;
          var map;

          // Set up map
          map = new google.maps.Map(
            element.get().shift(),
            {
              zoom: zoom,
              center: new google.maps.LatLng(center.latitude, center.longitude)
            }
          );

          // Initialze
          addMarkers(markers, map);

          attrs.$observe('markers', function () {
            markers = coordsToObject(attrs.markers) || [];
            addMarkers(markers, map);
          });
        },
        restrict: 'E',
        template: '<div></div>'
      };
    }]);
})(window.angular);
