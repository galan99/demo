var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    imagemin = require('gulp-imagemin'),
    tinypng = require('gulp-tinypng-compress'),
    clean = require('gulp-clean');

//压缩图片，拷贝到目标目录
gulp.task('img', function(){
    gulp.src('img/*.*')
        //.pipe(imagemin())
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('dist/img'))
});

//tinypng高质量压缩
gulp.task('tinypng', function () {
    gulp.src('img/*.*')
        .pipe(tinypng({
            key: '3rfgLkTsUARLRD3-AU5ZxN5v4Q7VkieB',
            sigFile: '',
            log: false
        }))
        .pipe(gulp.dest('dist/img'));
});

//压缩合并css,拷贝到目标目录
gulp.task('css', function () {
    gulp.src(['css/base.css', 'css/index.css'])
        .pipe(concat('app.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('dist'))
});

gulp.task('js', function() {
    gulp.src(['js/zepto.js','js/index.js'])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

//默认
gulp.task('default', ['tinypng','css','js']);

//开发
gulp.task('dev', ['connect','build-js', 'watch', 'open']);