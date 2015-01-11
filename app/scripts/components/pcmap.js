/* global google,console */
(function (angular) {
  'use strict';

  /**
   * Helper object for the maps.
   *
   * @todo  Integrate within the app?
   */
  var Pos = function (position) {
    var latitude;
    var longitude;

    this.lat = undefined;
    this.lng = undefined;

    if (typeof position !== 'undefined') {
      latitude = (((position).coords || {}).latitude || {});
      longitude = (((position).coords || {}).longitude || {});
    }

    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    if (! isNaN(latitude)) {
      this.lat = latitude;
    }
    if (! isNaN(longitude)) {
      this.lng = longitude;
    }
  };
  Pos.prototype.isValid = function () {
    return typeof this.lat === 'number' && typeof this.lng === 'number';
  };

  /**
   * Custom Maps Directive.
   */
  angular.module('portlandcafes')
    .directive('pcMap', ['centerOfPortland', 'Hours', function (centerOfPortland, Hours) {

      var getProp = function (prop, object) {
        var props = prop.split('.');
        var output = '';

        if (Array.isArray(props) && object instanceof Object) {
          for (var i = 0; i < props.length; i++) {
            if (props[i] in object) {
              if (i === props.length - 1) {
                output = object[props[i]];
              } else {
                object = object[props[i]];
              }
            } else {
              break;
            }
          }
        }

        return output;
      };

      /** @todo Figure out to use `$compile` */
      var infoWindowTemplate = function (location) {
        return '<div class="info-window">' +
          '<h2><a href="#/location/' + getProp('id', location) + '">' + getProp('name', location) + '</a></h2>' +
          '<div class="info-window__address">' + getProp('address', location) + '</div>' +
          '<div class="info-window__hours">' +
            '<h5><small>Open:</small> ' + Hours.formatTime(getProp('todayHours.open', location)) + '</h5>' +
            '<h5><small>Close:</small> ' + Hours.formatTime(getProp('todayHours.close', location)) + '</h5>' +
          '</div>' +
        '</div>';
      };

      var getMarker = function (map, location) {
        var pos = new Pos(location);

        if (pos.isValid()) {
          return new google.maps.Marker({
            position: new google.maps.LatLng(pos.lat, pos.lng),
            map: map,
            title: getProp('name', location)
          });
        }
      };
      var getInfoWindow = function (location) {
        return new google.maps.InfoWindow({
          content: infoWindowTemplate(location),
          maxWidth: 200
        });
      };

      var setLocations = function (map, locations) {
        var allMarkers = [];
        var allInfoWindows = [];
        var setSingleLocation = function (location) {
          /**
           * @todo Make sure a marker isn't set in the same position as another
           *       marker.
           */
          var marker = getMarker(map, location);
          var infoWindow = getInfoWindow(location);

          allMarkers.push(marker);
          allInfoWindows.push(infoWindow);

          google.maps.event.addListener(marker, 'click', function () {
            allInfoWindows.forEach(function (infoWindow) {
              if (infoWindow instanceof Object && 'close' in infoWindow) {
                infoWindow.close();
              }
            });

            infoWindow.open(map, marker);
          });
        };

        if (! locations) {
          return;
        }

        try {
          locations = JSON.parse(locations);
        } catch (error) {
          console.log(error);
          return;
        }

        if (Array.isArray(locations) && locations.length) {
          locations.forEach(setSingleLocation);
        } else if (locations instanceof Object) {
          setSingleLocation(locations);
        }
      };
      var setCenter = function (map, center) {
        if (center) {
          center = JSON.parse(center);
        }

        center = new Pos(center);

        if (! center.isValid()) {
          center = new Pos(centerOfPortland);
        }
        return map.setCenter(new google.maps.LatLng(center.lat, center.lng));
      };

      var link = function (scope, element, attrs) {
        var center = attrs.center || '';
        var zoom = parseInt(attrs.zoom, 10) || 12;
        var locations = attrs.locations || '';
        var map;

        map = new google.maps.Map(element.get().shift(), {
          zoom: zoom,
        });

        setCenter(map, center);

        if (locations) {
          setLocations(map, locations);
        }

        attrs.$observe('center', function (center) {
          return setCenter(map, center);
        });
        attrs.$observe('zoom', function (zoom) {
          zoom = parseInt(zoom, 10);

          if (! isNaN(zoom)) {
            map.setZoom(zoom);
          }
        });
        attrs.$observe('locations', function (locations) {
          return setLocations(map, locations);
        });
      };

      return {
        link: link,
        restrict: 'E',
        template: '<div></div>'
      };
    }]);
})(window.angular);
