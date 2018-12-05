'use strict';

var postcss = require('postcss');
var objectAssign = require('object-assign');

var defaults = {
  unitToConvert: 'rpx', // need convert
  viewportWidth: 750,   // design draft width
  unitPrecision: 5,     // the decimal numbers
  viewportUnit: 'vw',   // convert to
  minPixelValue: 1,     // min value that will not be convert
  mediaQuery: false     // todo 待调研
};

module.exports = postcss.plugin('postcss-rpx-to-viewport', function (options) {

  var opts = objectAssign({}, defaults, options);
  var pxReplace = createPxReplace(opts.viewportWidth, opts.minPixelValue, opts.unitPrecision, opts.viewportUnit);

  // excluding regex trick: http://www.rexegg.com/regex-best-trick.html
  // Not anything inside double quotes
  // Not anything inside single quotes
  // Not anything inside url()
  // Any digit followed by px
  // !singlequotes|!doublequotes|!url()|pixelunit
  var pxRegex = new RegExp('"[^"]+"|\'[^\']+\'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)' + opts.unitToConvert, 'ig')

  return function (css) {

    css.walkDecls(function (decl, i) {
      // This should be the fastest test and will remove most declarations
      if (decl.value.indexOf(opts.unitToConvert) === -1) return;

      decl.value = decl.value.replace(pxRegex, createPxReplace(opts.viewportWidth, opts.minPixelValue, opts.unitPrecision, viewportUnit));
    });

    if (opts.mediaQuery) {
      css.walkAtRules('media', function (rule) {
        if (rule.params.indexOf(opts.unitToConvert) === -1) return;
        rule.params = rule.params.replace(pxRegex, pxReplace);
      });
    }

  };
});

function createPxReplace(viewportSize, minPixelValue, unitPrecision, viewportUnit) {
  return function (m, $1) {
    if (!$1) return m;
    var pixels = parseFloat($1);
    if (pixels <= minPixelValue) return m;
    return toFixed((pixels / (viewportSize / 2) * 100), unitPrecision) + viewportUnit;
  };
}

function toFixed(number, precision) {
  var multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(number * multiplier);
  return Math.round(wholeNumber / 10) * 10 / multiplier;
}

