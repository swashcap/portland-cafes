/* global module,inject */
describe('LocationList Controller', function () {
  'use strict';

  /**
   * Testing controllers in Angular can be confusing. Here's a couple resources:
   *
   * @{@link  https://docs.angularjs.org/guide/controller#testing-controllers}
   * @{@link  http://nathanleclaire.com/blog/2013/12/13/how-to-unit-test-controllers-in-angularjs-without-setting-your-hair-on-fire/}
   */

   var $scope;

  beforeEach(module('portlandcafes'));

  beforeEach(inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controller('LocationListCtrl', {$scope: $scope});
  }));

  it('should paginate correctly', inject(function () {
    expect($scope.getPages(1, 100)).toEqual([1, 2, 3, 4, 5]);
    expect($scope.getPages(10, 100)).toEqual([6, 7, 8, 9, 10]);
    expect($scope.getPages(2, 38)).toEqual([1, 2, 3, 4]);
    expect($scope.getPages(3, 138)).toEqual([1, 2, 3, 4, 5]);
    expect($scope.getPages(10, 198)).toEqual([8, 9, 10, 11, 12]);
  }));

  it('should show page ranges', inject(function () {
    expect($scope.getPagesRange(1, 35)).toEqual([1, 10]);
    expect($scope.getPagesRange(2, 35)).toEqual([11, 20]);
    expect($scope.getPagesRange(4, 35)).toEqual([31, 35]);
  }));

  it('should link to pagination pages', inject(function () {
    expect($scope.getPageLink('1')).toEqual('/');
    expect($scope.getPageLink('2')).toEqual('page/2');
    expect($scope.getPageLink('99')).toEqual('page/99');
  }));

  it('should hide closed locations', inject(function () {
    $scope.hideClosed = false;

    expect($scope.maybeHideClosed({ isOpen: false })).toEqual(true);
    expect($scope.maybeHideClosed({ isOpen: true })).toEqual(true);

    $scope.hideClosed = true;
    expect($scope.maybeHideClosed({ isOpen: false })).toEqual(false);
  }));

  describe('should properly filter', function () {
    var location1;
    var location2;
    var location3;

    beforeEach(function () {
      location1 = {
        distance: 1,
        rating: 1,
        todayHours: {
          open: 9,
          close: 15
        }
      };
      location2 = {
        distance: 10,
        rating: 4
      };
      location3 = {

      };
    });

    it('location distances', inject(function () {
      $scope.distanceRange = 0;

      expect($scope.rangeFilter(location1)).toEqual(true);
      expect($scope.rangeFilter(location2)).toEqual(true);

      $scope.distanceRange = 5;

      expect($scope.rangeFilter(location1)).toEqual(true);
      expect($scope.rangeFilter(location2)).toEqual(false);
    }));

    it('locations by rating', inject(function () {
      $scope.ratingFloor = 0;

      expect($scope.ratingFilter(location1)).toBe(true);
      expect($scope.ratingFilter(location2)).toBe(true);

      $scope.ratingFloor = 3;

      expect($scope.ratingFilter(location1)).toBe(false);
      expect($scope.ratingFilter(location2)).toBe(true);
    }));

    it('locations with unset properties', inject(function () {
      $scope.orderByField = 'whatever';

      expect($scope.maybeHideUnsetLocations(location1)).toBe(true);
      expect($scope.maybeHideUnsetLocations(location2)).toBe(false);

      $scope.orderByField = 'rating';

      expect($scope.maybeHideUnsetLocations(location1)).toBe(true);
      expect($scope.maybeHideUnsetLocations(location3)).toBe(false);
    }));
  });
});
