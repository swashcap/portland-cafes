/* global google */
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
    .directive('pcMap', ['$compile', '$rootScope', 'centerOfPortland', function ($compile, $rootScope, centerOfPortland) {
      var infoWindowTemplate = $compile('<div class="info-window">' +
        '<h2><a ng-href="#/location/{{location.id}}">{{location.name}}</a></h2>' +
        '<div ng-bind-html="location.address"></div>' +
        '<div class="info-window__hours">' +
          '<h5><small>Open:</small> {{location.todayHours.open | humanTime}}</h5>' +
          '<h5><small>Close:</small> {{location.todayHours.close | humanTime}}</h5>' +
        '</div>' +
      '</div>');

      var getTitle = function (location) {
        if (location instanceof Object && 'name' in location) {
          return location.name || '';
        }
      };
      var getMarker = function (map, location) {
        var pos = new Pos(location);

        if (pos.isValid()) {
          return new google.maps.Marker({
            position: new google.maps.LatLng(pos.lat, pos.lng),
            map: map,
            title: getTitle(location)
          });
        }
      };
      var getInfoWindow = function (location) {
        var newScope = $rootScope.$new(true);

        newScope.location = location;

        return new google.maps.InfoWindow({
          content: infoWindowTemplate(newScope).get(0)
        });
      };

      var setLocations = function (map, locations) {
        var setSingleLocation = function (location) {
          /**
           * @todo Make sure a marker isn't set in the same position as another
           *       marker.
           */
          var marker = getMarker(map, location);
          var infoWindow = getInfoWindow(location);

          google.maps.event.addListener(marker, 'click', function () {
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

      var link = function (scope, element, attrs) {
        var center = new Pos(attrs.center);
        var markers = attrs.markers || [];
        var zoom = parseInt(attrs.zoom, 10) || 12;
        var locations = attrs.locations || '';
        var map;

        if (! center.isValid()) {
          center = new Pos(centerOfPortland);
        }

        map = new google.maps.Map(element.get().shift(), {
          zoom: zoom,
          center: new google.maps.LatLng(center.lat, center.lng)
        });

        if (locations) {
          setLocations(map, locations);
        }

        attrs.$observe('center', function (center) {
          center = new Pos(center);

          if (center.isValid()) {
            map.setCenter(new google.maps.LatLng(center.latitude, center.longitude));
          }
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
