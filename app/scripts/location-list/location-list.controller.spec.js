/* global describe, it, expect, beforeEach, module, inject */
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
    $scope.locationsPerPage = 10;
    $scope.currentPage = 1;
    $scope.filtered = Array(10);

    expect($scope.getPages()).toEqual([1, 2, 3, 4, 5]);

    $scope.currentPage = 10;
    expect($scope.getPages()).toEqual([6, 7, 8, 9, 10]);


    $scope.filtered = Array(4);
    $scope.currentPage = 2;
    expect($scope.getPages()).toEqual([1, 2, 3, 4]);

    $scope.filtered = Array(20);
    $scope.currentPage = 10;
    expect($scope.getPages()).toEqual([8, 9, 10, 11, 12]);
  }));
});
