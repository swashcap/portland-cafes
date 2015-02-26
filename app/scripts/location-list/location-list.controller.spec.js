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
});
