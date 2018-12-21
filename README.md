# rpx-to-viewport
A plugin for PostCSS. Convert rpx units (h5/mini-program/mpvue) to viewport units (vw or vmin vmax vh)

## purpose
1. for h5、mini-program、mpvue and so on
2. write css unit the same as your layout (Example: 750px width layout = 750rpx)

## Usage 

npm install postcss-rpx-to-viewport --save-dev

### Use with gulp

```js
var gulp = require('gulp');
var postCss = require('gulp-postcss');
var rpxToViewport = require('postcss-rpx-to-viewport');

gulp.task('css', function () {
    var processors = [
        rpxToViewport()   // layoutWidth default 750, if you layout is 640, use as rpxToViewport({layoutWidth: 640}) 
    ];
    return gulp.src(['build/css/**/*.css'])
        .pipe(postCss(processors))
        .pipe(gulp.dest('build/css'));
});
```

### Use with webpack & vue

```js
    var rpxToViewport = require('postcss-rpx-to-viewport');
    
    // webpack config: 
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            postcss: [
                                rpxToViewport()
                            ],
                        }
                    }
                ],

            }
        ]
    }    
```

### Use with webpack & react

```js
    var rpxToViewport = require('postcss-rpx-to-viewport');

    // webpack config: 
    module: {
      postcss: function () {
          return [rpxToViewport()];
      },
    }    
```

## Example

```css

/* input ： Suppose your layout width is 750px */

.foo {
  width: 750rpx;
  height: 150rpx;
  margin: 10rpx;
  padding: 1rpx 15rpx 1px 30rpx; /* 1rpx will be converted any way */
  border: 4rpx solid gray;
  font-size: 15rpx;
  line-height: 14rpx;
}

.bar {
  width: 100px;
  margin: 10px;
  padding: 2px 15px 1px 16px;
  border: 1px solid gray;
  font-size: 14px;  /* px will not be converted */
  line-height: 14px;
}

@media (min-width: 750rpx) {  /* suggest use px */
  .foo {
    font-size: 16rpx;
    line-height: 15rpx;
  }
}


/* output */

.foo {
  width: 100vw;
  height: 20vw;
  margin: 1.33333vw;
  padding: 0.13333vw 2vw 1px 4vw; 
  border: 0.53333vw solid gray;
  font-size: 2vw;
  line-height: 1.86667vw;
}

.bar {
  width: 100px;
  margin: 10px;
  padding: 2px 15px 1px 16px;
  border: 1px solid gray;
  font-size: 14px;  
  line-height: 14px;
}

@media (min-width: 100vw) {  /* if use rpx and set mediaQuery===true */
  .foo {
    font-size: 2.13333vw;
    line-height: 2vw;
  }
}


```

  
### Options

Default:
```js
{
  targetUnit: 'rpx',    // (String) need convert
  outputUnit: 'vw',     // (String) convert to
  layoutWidth: 750,     // (Number) design draft width
  unitPrecision: 5,     // (Number) the decimal numbers
  mediaQuery: false     // (Boolean) convert the unit inside @media(*)
}
```


## Changelog

### 0.0.1 (November 21st 2018) ###


## License

[MIT License](http://opensource.org/licenses/mit-license).


## Suggestion

[使用建议: 推荐一个做移动端多屏兼容和适配的新方案](https://github.com/RaySnow/vw-polyfill/blob/master/other.md)
