'use strict';

angular.module('portlandcafes')
  .controller('LocationListCtrl', function ($scope, Locations, Geolocation) {
    $scope.locations = Locations.getAll();
    $scope.orderByField = 'name';
    $scope.reverseSort = false;


    var setLocationDistances = function (latitude, longitude) {
      $scope.locations.forEach(function (location) {
        return location['distance'] = Geolocation.getDistance({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }, {
          latitude: latitude,
          longitude: longitude
        });
      });
    };

    // $scope.getPosition = function () {
    //   User.getCurrentPosition().then(function (data) {
    //     setLocationDistances(data.coords.latitude, data.coords.longitude);

    //     $scope.position = {
    //       latitude: data.coords.latitude,
    //       longitude: data.coords.longitude
    //     };
    //   }).catch(function (err) {
    //     console.log(err);
    //   });
    // };

    if (Geolocation.hasCurrentPosition()) {
      Geolocation.getCurrentPosition().then(function (pos) {
        setLocationDistances(pos.coords.latitude, pos.coords.longitude);
      });
    }
  });
