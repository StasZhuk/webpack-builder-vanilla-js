//GULP
const path = require('path');
const gulp = require('gulp');
const watch = require('gulp-watch');
const svgSprite = require('gulp-svg-sprite');
const fs = require('fs');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const clean = require('gulp-clean');

const paths = require('./webpackConfig/paths');

//Sprite svg
gulp.task('cleanSvg', function () {
  return gulp.src(path.resolve(paths.root,'assets/svg/'), {read: false})
    .pipe(clean());
});

gulp.task('svgParse', ['cleanSvg'], function () {
  return gulp.src(path.resolve(paths.root, 'assets/svg-single/**/*.svg'))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe(rename(function (path) {
      path.basename = 's-' + path.basename;
    }))
    .pipe(gulp.dest(path.resolve(paths.root,'assets/svg/')));
});

const svgSymbolMode = {
  symbol: {
    dest: "./",
    sprite: path.resolve(paths.root, 'assets/images/sprite'),
    bust: false,
    render: {
      scss: {
        dest: path.resolve(paths.root ,'sass/common/_svg.scss'),
        template: path.resolve(paths.root,'sass/common/svg/_template.scss')
      }
    }
  }
};


gulp.task('svg:sprite', ['svgParse'], function () {
  return gulp.src([path.resolve(paths.root,'assets/svg/**/*.svg'), path.resolve(paths.root, 'assets/svg-multi/**/*.svg') ])
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: svgSymbolMode,
    }))
    .pipe(gulp.dest('./'));
});


gulp.task('svg:watch', function () {
  watch([path.resolve(paths.root, 'assets/svg-single/**/*.svg'), path.resolve(paths.root, 'assets/svg-multi/**/*.svg')], function () {
    gulp.start('svg:sprite');
  });
});

gulp.task('default', ['svg:sprite']);

gulp.task('watch', ['svg:sprite', 'svg:watch']);
