var gulp     = require('gulp'),  
    concat   = require('gulp-concat'),//- 多个文件合并为一个；  
    cleanCSS = require('gulp-clean-css'),//- 压缩CSS为一行；  
    ugLify   = require('gulp-uglify'),//压缩js  
    imageMin = require('gulp-imagemin'),//压缩图片  
    pngquant = require('imagemin-pngquant'), // 深度压缩
    tinypng = require('gulp-tinypng-compress'),// tinypng 图片压缩  
    htmlMin  = require('gulp-htmlmin'),//压缩html  
    changed  = require('gulp-changed'),//检查改变状态  
    less     = require('gulp-less')//压缩合并less  
    del      = require('del')  
    browserSync = require("browser-sync").create();//浏览器实时刷新  
  
//删除dist下的所有文件  
gulp.task('delete',function(cb){  
    return del(['dist/*'],cb);  
})  
  
//压缩html  
gulp.task('html', function () {  
    var options = {  
        removeComments: true,//清除HTML注释  
        collapseWhitespace: true,//压缩HTML  
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />  
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />  
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"  
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"  
        minifyJS: true,//压缩页面JS  
        minifyCSS: true//压缩页面CSS  
    };  
    gulp.src('index.html')  
        .pipe(changed('dist', {hasChanged: changed.compareSha1Digest}))  
        .pipe(htmlMin(options))  
        .pipe(gulp.dest('dist'))  
        .pipe(browserSync.reload({stream:true}));  
});  
  
//实时编译less  
gulp.task('less', function () {  
    gulp.src(['src/less/*.less']) //多个文件以数组形式传入  
        .pipe(changed('dist/css', {hasChanged: changed.compareSha1Digest}))  
        .pipe(less())  
        .pipe(concat('main.css'))  
        .pipe(cleanCSS())  
        .pipe(gulp.dest('dist/css'))//将会在css下生成main.css  
        .pipe(browserSync.reload({stream:true}));  
});

//压缩合并css,拷贝到目标目录
gulp.task('css', function () {
    gulp.src(['src/css/base.css', 'src/css/index.css'])
        .pipe(concat('app.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/pkg'))
        .pipe(browserSync.reload({stream:true})); 
});  
  
//压缩js  
gulp.task("script",function(){  
    gulp.src([ 'src/js/index.js'])  
        .pipe(changed('dist/js', {hasChanged: changed.compareSha1Digest}))  
        .pipe(concat('index.js'))  
        .pipe(ugLify())  
        .pipe(gulp.dest('dist/js'))  
        .pipe(browserSync.reload({stream:true}));  
});

//压缩js
gulp.task('js', function() {
    gulp.src(['src/js/zepto.js','src/js/index.js'])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/pkg'));
        .pipe(browserSync.reload({stream:true})); 
});  
  
// 压缩图片  
gulp.task('images', function () {  
    gulp.src('src/img/*.*')  
        .pipe(changed('dist/img', {hasChanged: changed.compareSha1Digest}))  
        .pipe(imageMin({  
            progressive: true,// 无损压缩JPG图片  
            svgoPlugins: [{removeViewBox: false}], // 不移除svg的viewbox属性  
            use: [pngquant()] // 使用pngquant插件进行深度压缩  
        }))  
        .pipe(gulp.dest('dist/img'))  
        .pipe(browserSync.reload({stream:true}));  
});

//tinypng高质量压缩
gulp.task('tinypng', function () {
    gulp.src('src/img/*.*')
        .pipe(tinypng({
            key: '3rfgLkTsUARLRD3-AU5ZxN5v4Q7VkieB',
            sigFile: '',
            log: false
        }))
        .pipe(gulp.dest('dist/img'));
        .pipe(browserSync.reload({stream:true})); 
});  
  
//启动热更新  
gulp.task('serve', ['delete'], function() {  
    gulp.start('script','less','html','tinypng');  
    browserSync.init({  
        port: 2017,  
        server: {  
            //baseDir: ['dist'],
            proxy: "http://192.168.115.86/demo/github/demo/gulp/", 
            //代理地址目录 http://192.168.116.87:3001/list.html
            baseDir: './'  
        }  
    });  
    gulp.watch('src/js/*.js', ['script']);         //监控文件变化，自动更新  
    gulp.watch('src/less/*.less', ['less']);
    gulp.watch('src/css/*.css', ['css']);  
    gulp.watch('*.html', ['html']);  
    gulp.watch('src/img/*.*', ['tinypng']);  
});  
  
gulp.task('default',['serve']);  