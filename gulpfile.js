var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var paths = {
  build: './dist',
  style: './src/*.less',
  script: './src/*.js'
};

gulp.task('build:style', function () {
  return gulp.src(paths.style)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(rename({ suffix: '.min', extname: '.css' }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('build:script', function () {
  return gulp.src(paths.script)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min', extname: '.js' }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('watch', function () {
  gulp.watch(paths.style, ['build:style']);
  gulp.watch(paths.script, ['build:script']);
});