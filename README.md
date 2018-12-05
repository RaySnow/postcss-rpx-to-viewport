# rpx-to-viewport
A plugin for PostCSS. Convert rpx units (h5/mini-program/mpvue) to viewport units (vw or vmin vmax vh)

## purpose
  1. for h5、mini-program、mpvue and so on

## Usage 

### Use with gulp

```js
var gulp = require('gulp');
var postCss = require('gulp-postcss');
var rpxToViewport = require('postcss-rpx-to-viewport');

gulp.task('css', function () {
    var processors = [
        rpxToViewport({
            viewportWidth: 320,
            viewportUnit: 'vmin'
        })
    ];
    return gulp.src(['build/css/**/*.css'])
        .pipe(postCss(processors))
        .pipe(gulp.dest('build/css'));
});
```

## Example

```css

/* input */

.foo {
  width: 100rpx;
  height: 100rpx;
  margin: 10rpx;
  padding: 2px 15rpx 1px 16rpx;   // px will not be converted
  border: 4rpx solid gray;
  font-size: 14rpx;
  line-height: 14rpx;
}

.bar {
  width: 100px;
  margin: 10px;
  padding: 2px 15px 1px 16px;
  border: 1px solid gray;
  font-size: 14px;   // px will not be converted
  line-height: 14px;
}

@media (min-width: 750px) {
  .foo {
    font-size: 16rpx;
    line-height: 16rpx;
  }
}

/* output */


```

  
### Options

Default:
```js
{
  targetUnit: 'rpx',    // (String) need convert
  outputUnit: 'vw',     // (String) convert to
  layoutWidth: 750,     // (Number) design draft width
  unitPrecision: 5,     // (Number) the decimal numbers
  mediaQuery: false     // (Boolean) todo 待调研
}
```


## Changelog

### 0.0.1 (November 21st 2018) ###


## License

[MIT License](http://opensource.org/licenses/mit-license).

## TODO
