'use strict';

/** @{@link https://github.com/taptapship/wiredep} */
var wiredep = require('wiredep')({ devDependencies: true });
var files = wiredep.js;
var options;

files.push('app/scripts/**/*.js');

options = {
  browsers: ['Chrome'],
  frameworks: ['jasmine', 'angular-filesort'],
  files: files,
  angularFilesort: {
    whitelist: ['app/scripts/**/*.js']
  }
};

module.exports = function (config) {
  config.set(options);
};
