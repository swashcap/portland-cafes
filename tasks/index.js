/* global require,console */

'use strict';

var fs = require('fs');
var results = require('../app/results.json');
var _ = require('lodash');

// var jade = require('jade');
// var template = jade.compileFile(
//   './tasks/template.jade',
//   {
//     pretty: true,
//     globals: [] // @todo Add global props
//   }
// );

var template = function (result) {
  var output = '---\n';
  output += 'title: "' + result.name + '"\n';
  output += 'phone: "' + result.phoneNumber + '"\n';
  output += 'latitude: ' + result.coords.latitude + '\n';
  output += 'longitude: ' + result.coords.longitude + '\n';
  output += '---\n';
  output += result.address + '\n\n';

  if (result.hours.length) {
    output += '<pre>';
    result.hours.forEach(function (hour) {
      output += hour + '\n';
    });
    output += '</pre>\n';
  }

  return output;
};

_.chain(results).map(function (result) {
  return {
    address: result.adr_address,
    phoneNumber: result.formatted_phone_number,
    coords: {
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng
    },
    id: result.id,
    name: result.name,
    placeId: result.place_id,
    rating: result.rating,
    reviews: result.reviews,
    types: result.types,
    url: result.url,
    vicinity: result.vicinity,
    website: result.website,
    hours: (((result).opening_hours || {}).weekday_text || [])
  };
}).forEach(function (result) {
  return fs.writeFile(
    './dist/location/2015-02-08-' + _.kebabCase(result.name) + '.md',
    template(result),
    function (err) {
      console.log(err);
    });
}).value();
