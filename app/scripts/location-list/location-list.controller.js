(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .controller('LocationListCtrl', [
      '$scope',
      '$routeParams',
      'Locations',
      'Position',
      'Preferences',
      'Geolib',
      function ($scope, $routeParams, Locations, Position, Preferences, Geolib) {
      var setDistances = function (latitude, longitude) {
        $scope.locations.forEach(function (location) {
          location.distance = Geolib.getDistance({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }, {
            latitude: latitude,
            longitude: longitude
          });
        });
      };

      $scope.isLoading = true;
      $scope.filtered = [];
      $scope.locations = [];

      /** Pagination */

      var LOCATIONS_PER_PAGE = 10;
      var MAX_PAGES = 5;

      $scope.currentPage = $routeParams.pageNumber || 1;
      $scope.locationsPerPage = LOCATIONS_PER_PAGE;

      /**
       * Get the pagination page numbers to output.
       *
       * @param  {Number} currentPage Current page
       * @param  {Number} itemsCount  Total number of items to paginate over
       * @return {Array}
       */
      $scope.getPages = function (currentPage, itemsCount) {
        currentPage = parseInt(currentPage, 10);

        var totalPages = Math.ceil(itemsCount / LOCATIONS_PER_PAGE);
        var pages = [];
        var start, end;

        if (totalPages < MAX_PAGES) {
          start = 1;
          end = totalPages;
        } else if (currentPage < Math.ceil(MAX_PAGES / 2)) {
          start = 1;
          end = MAX_PAGES;
        } else if (currentPage + Math.floor(MAX_PAGES / 2) > totalPages) {
          start = totalPages - MAX_PAGES + 1;
          end = totalPages;
        } else {
          start = currentPage - Math.floor(MAX_PAGES / 2);
          end = currentPage + Math.floor(MAX_PAGES / 2);
        }

        for (var i = start; i <= end; i++) {
          pages.push(i);
        }

        return pages;
      };

      /**
       * Get a human-readable range for pages.
       *
       * @param  {Number} currentPage Current page
       * @param  {Number} itemsCount  Total number of items to paginate over
       * @return {Array}              Range's start and end wrapped in an array
       */
      $scope.getPagesRange = function (currentPage, itemsCount) {
        var start = (currentPage - 1) * LOCATIONS_PER_PAGE + 1;
        var end;

        if (currentPage * LOCATIONS_PER_PAGE > itemsCount) {
          end = itemsCount;
        } else {
          end = currentPage * LOCATIONS_PER_PAGE;
        }

        return [start, end];
      };

      /**
       * Get a page's link.
       *
       * @param  {Number} page Page's number, starting at 1
       * @return {String}
       */
      $scope.getPageLink = function (page) {
        var output = '';

        page = parseInt(page, 10);

        if (isNaN(page)) {
          output = 'page/' + Math.ceil($scope.filtered.length / $scope.locationsPerPage);
        } else if (page === 1) {
          output = '/';
        } else {
          output = 'page/' + page;
        }

        return output;
      };

      $scope.hideFilter = true;
      $scope.ratingFloor = null;

      $scope.maybeHideClosed = function (location) {
        if ($scope.hideClosed && ! location.isOpen) {
          return false;
        } else {
          return true;
        }
      };

      $scope.rangeFilter = function (location) {
        /** @todo Do something about miles/meters unit consistency */
        if ('distance' in location && parseInt($scope.distanceRange, 10) !== 0) {
          if (location.distance > $scope.distanceRange) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      };

      $scope.ratingFilter = function (location) {
        return (
          $scope.ratingFloor === 0 ||
          ('rating' in location && location.rating > $scope.ratingFloor)
        );
      };

      /**
       * [maybeHideUnsetHours description]
       * @param  {Object}  location [description]
       * @return {Boolean}
       */
      $scope.maybeHideUnsetLocations = function (location) {
        var open = (((location).todayHours || {}).open || undefined);
        var close = (((location).todayHours || {}).close || undefined);

        if (
          ($scope.orderByField !== 'name' && (open === undefined || close === undefined)) ||
          ($scope.orderByField === 'rating' && location.rating === undefined)
        ) {
          return false;
        } else {
          return true;
        }
      };

      /**
       * Scope to preferences map.
       *
       * This is a property-to-method map. The object's keys will be set on the
       * controller's `$scope`. The keys' values correspond to method names on
       * the `Preferences` component.
       *
       * @todo  Avoid tight coupling with the `Preferences` component.
       *
       * @type {Object}
       */
      var scopePropertyMap = {
        orderByField: 'filterProperty',
        reverseSort: 'filterReverse',
        hideClosed: 'hideClosed',
        distanceRange: 'distanceRange',
        ratingFloor: 'ratingLimit'
      };

      /**
       * Initialize preferences.
       *
       * Loop over `scopePropertyMap` and set its keys as properties on the
       * controller's `$scope`. Set these properties equal to the corresponding
       * `Preferences` methods' results.
       */
      for (var prop in scopePropertyMap) {
        if (
          scopePropertyMap.hasOwnProperty(prop) &&
          scopePropertyMap[prop] in Preferences
        ) {
          $scope[prop] = Preferences[scopePropertyMap[prop]]();
        }
      }

      /**
       * Persist UI controls back to preferences.
       *
       * @{@link  https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$watchGroup}
       */
      $scope.$watchGroup(Object.keys(scopePropertyMap), function (newValues, oldValues) {
        var scopeProperties = Object.keys(scopePropertyMap);

          for (var i = 0, il = newValues.length; i < il; i++) {
            if (newValues[i] !== oldValues[i]) {
              if (scopePropertyMap[scopeProperties[i]] in Preferences) {
                Preferences[scopePropertyMap[scopeProperties[i]]](newValues[i]);
              }
            }
          }
      });

      // Listen and react to new positions
      $scope.$on('pc.newPosition', function (event, position) {
        setDistances(position.latitude, position.longitude);
      });

      // Initialize
      Locations.getAll().then(function (locations) {
        $scope.locations = locations;
        $scope.isLoading = false;

        // Set distance if available
        if (Position.getPosition()) {
          setDistances(
            Position.getPosition().latitude,
            Position.getPosition().longitude
          );
        }
      });
    }]);
})(window.angular);
