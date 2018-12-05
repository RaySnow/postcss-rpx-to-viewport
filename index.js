'use strict';

var postcss = require('postcss');
var objectAssign = require('object-assign');

var defaultsOpt = {
  targetUnit: 'rpx', // need convert
  outputUnit: 'vw',   // convert to
  layoutWidth: 750,   // design draft width
  unitPrecision: 5,     // the decimal numbers
  mediaQuery: false     // todo 待调研
};

function generateReplacement(layoutWidth, unitPrecision, outputUnit) {
  return function (m, $1) {
    if (!$1) return m;
    var pixels = parseFloat($1);
    return toFixed((pixels / (layoutWidth / 2) * 100), unitPrecision) + outputUnit;
  };
}

function toFixed(number, precision) {
  var multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(number * multiplier);
  return Math.round(wholeNumber / 10) * 10 / multiplier;
}


module.exports = postcss.plugin('postcss-rpx-to-viewport', function (options) {
  var opts = objectAssign({}, defaultsOpt, options);
  var pxRegex = new RegExp('"[^"]+"|\'[^\']+\'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)' + opts.targetUnit, 'ig');

  return function (root) {
    root.walkRules(function (rule) {
      rule.walkDecls(function (decl) {
        if (decl.value.indexOf(opts.targetUnit) === -1) return;
        decl.value = decl.value.replace(pxRegex, generateReplacement(opts.layoutWidth, opts.unitPrecision, outputUnit));
      })
    });
    if (opts.mediaQuery) {
      root.walkAtRules('media', function (rule) {
        if (rule.params.indexOf(opts.targetUnit) === -1) return;
        rule.params = rule.params.replace(pxRegex, generateReplacement(opts.layoutWidth, opts.unitPrecision, opts.outputUnit));
      });
    }
  };
});
