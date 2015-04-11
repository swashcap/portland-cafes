/* global module,inject */
describe('LocationDetail Controller', function () {
  'use strict';

  var $scope;

  beforeEach(module('portlandcafes'));

  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controller('LocationDetailCtrl', { $scope: $scope });
  }));

  it('should have a map link', inject(function () {
    var location1 = { vicinity: '' };
    var location2;

    expect($scope.getMapsLink(location1)).toMatch('maps.google.com');
    expect($scope.getMapsLink(location2)).toBeFalsy();
  }));

  it('should toggle review visibility', inject(function () {
    var initialReviewLimit = $scope.reviewLimit;

    $scope.location = {
      reviews: [1, 2, 3, 4, 5, 6]
    };

    $scope.toggleReviewLimit();
    expect($scope.reviewLimit).toEqual(6);

    $scope.toggleReviewLimit();
    expect($scope.reviewLimit).toEqual(initialReviewLimit);
  }));
});
