/**
 Gulpfile for gulp-webpack-demo
 created by fwon
*/

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean');



gulp.task('js', function() {
  return gulp.src(['src/zepto.js','src/wx.js','src/index.js'])
    .pipe(concat('pay.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src'));
});

//发布
gulp.task('default', ['js']);

//开发
gulp.task('dev', ['connect', 'copy:images', 'fileinclude', 'lessmin', 'build-js', 'watch', 'open']);