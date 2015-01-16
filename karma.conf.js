'use strict';

var mainBowerFiles = require('main-bower-files');
var files = mainBowerFiles({
  includeDev: 'inclusive',
  filter: /.*\.js$/gi
});
var options;

files.push('app/scripts/*.js', 'app/scripts/**/*.js');

options = {
  browsers: ['Chrome'],
  frameworks: ['jasmine'],
  files: files
};

console.log(options.files);

module.exports = function (config) {
  config.set(options);
};
