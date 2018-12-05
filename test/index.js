'use strict';

var fs = require('fs');
var postcss = require('postcss');
var rpxToViewport = require('../index');
var css = fs.readFileSync('test.css', 'utf8');
var options = {
  mediaQuery: true
};
var processedCss = postcss(rpxToViewport(options)).process(css).css;

fs.writeFile('output.css', processedCss, function (err) {
  if (err) {
    throw err;
  }
  console.log('File with viewport units written.');
});
