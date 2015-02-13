'use strict';

var fs = require('fs');
var results = require('../app/results.json');

var newResults = results.map(function (result) {
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
    url: result.url,
    vicinity: result.vicinity,
    website: result.website,
    hours: (((result).opening_hours || {}).periods || [])
  }
});

fs.writeFile(
  './dist/results-trimmed.json',
  JSON.stringify(newResults),
  function (err) {
    console.log(err);
  }
);
