var gulp = require('gulp'),
    less = require('gulp-less'),
    lessglob = require('gulp-less-glob'),
    cssmin = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    chalk = require('chalk'),
    includejs = require('gulp-include'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    strip = require('gulp-strip-comments'),
    imgMin = require('gulp-imagemin'),

    reload = browserSync.reload;

const succes = chalk.bgGreen.black;

console.log(succes('\n--------> Gulp Build Started <--------'));

gulp.task('less', function() {
    gulp.src(['dev/assets/less/styles.less'])
    .pipe(lessglob())
    .pipe(less())
    .pipe(autoprefixer('last 10 versions', 'ie 9'))
    .pipe(cssmin())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('prod/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
    gulp.src(['dev/assets/js/scripts.js'])
    .pipe(plumber())
    .pipe(includejs({
      extensions: 'js',
      hardFail: true
    }))
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('prod/assets/js'))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
  gulp.src(['dev/*.html'])
    .pipe(strip())
    .pipe(gulp.dest('prod'))
    .pipe(browserSync.stream());
});

gulp.task('img', function() {
  gulp.src(['dev/assets/images/*'])
    .pipe(imgMin())
    .pipe(gulp.dest('prod/assets/images'))
    .pipe(browserSync.stream());
});

gulp.task('build', function() {
  browserSync.init({
    server: {
      baseDir: 'prod'
    }
  });


    gulp.watch('dev/assets/less/**/*.less').on('change',gulp.series('less'));
    gulp.watch('dev/assets/js/**/*.js').on('change',gulp.series('js'));
    gulp.watch('dev/*.html').on('change',gulp.series('html'));



  
});