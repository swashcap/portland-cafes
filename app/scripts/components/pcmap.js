/* global google */
(function (angular) {
  'use strict';

  /**
   * Custom Maps Directive.
   *
   * @todo Find a separate file or better home.
   */
  angular.module('portlandcafes')
    .directive('pcMap', function (centerOfPortland) {
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
      var addMarker = function (marker, map) {
        return new google.maps.Marker({
          position: new google.maps.LatLng(marker.latitude, marker.longitude),
          map: map,
          title: '' // @todo Figure this out
        });
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

          // Add marker(s)
          if (markers instanceof Array) {
            markers.forEach(function (marker) {
              addMarker(marker, map);
            });
          } else if ('latitude' in markers && 'longitude' in markers) {
            addMarker(markers, map);
          }
        },
        restrict: 'E',
        template: '<div></div>'
      };
    });
})(window.angular);
