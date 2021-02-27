var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sassglob = require('gulp-sass-glob'),
    cssmin = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    chalk = require('chalk'),
    includejs = require('gulp-include'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    strip = require('gulp-strip-comments'),
    fileinclude = require('gulp-file-include'),

    reload = browserSync.reload;
const mainFolder = './Web/',
      libraryFolder = './Library/',
      succes = chalk.bgGreen.black,
      warning = chalk.bgRed.white;

console.log(succes('\n--------> Gulp Build Started <--------'));

gulp.task('scss', function() {
    gulp.src(['dev/assets/scss/styles.scss'])
    .pipe(plumber())
    .pipe(sassglob())
    .pipe(sass())
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

gulp.task('fileinclude', function() {
  gulp.src(['dev/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(strip())
    .pipe(gulp.dest('prod'))
    .pipe(browserSync.stream());
});

gulp.task('build', function() {
  browserSync.init({
    server: {
      baseDir: 'prod'
    }
  });
  gulp.watch(['dev/assets/scss/**/*.scss'], ['scss'], reload);
  gulp.watch(['dev/assets/js/**/*.js'], ['js'], reload);
  gulp.watch(['dev/**/*.html'], ['fileinclude'], reload);
});