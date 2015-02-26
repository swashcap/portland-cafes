'use strict';

var mainBowerFiles = require('main-bower-files');
var files = mainBowerFiles({
  includeDev: 'inclusive',
  filter: /.*\.js/i
});
var options;

files.push(
  'app/scripts/storage/storage.js',
  'app/scripts/storage/local-storage.js',
  'app/scripts/storage/indexed-db.js',
  'app/scripts/*.js',
  'app/scripts/**/*.js'
);

options = {
  browsers: ['Chrome'],
  frameworks: ['jasmine'],
  files: files
};

module.exports = function (config) {
  config.set(options);
};
