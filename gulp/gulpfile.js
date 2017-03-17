var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    imagemin = require('gulp-imagemin');
    clean = require('gulp-clean');

//压缩图片，拷贝到目标目录
gulp.task('img', function(){
    gulp.src('img/*.{jpg,png,gif,ico}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
});

//压缩合并css,拷贝到目标目录
gulp.task('css', function () {
    gulp.src(['css/base.css', 'css/*.css'])
        .pipe(concat('app.min.css'))
        .pipe(cssmin('app.min.css'))
        .pipe(gulp.dest('dist'))
});

gulp.task('js', function() {
  return gulp.src(['src/zepto.js','src/index.js'])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

//默认
gulp.task('default', ['img','css','js']);

//开发
gulp.task('dev', ['connect','build-js', 'watch', 'open']);