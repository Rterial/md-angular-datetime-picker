"use strict";

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minify = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    wrap = require('gulp-wrap'),
    concat = require('gulp-concat'),
    path = require('path');

var outputFolder = 'dist/';
var moduleName = 'md-angular-datetime-picker';

gulp.task('assets', function() {
  return gulp.src('src/components/**/*.less')
        .pipe(concat('md-angular-datetime-picker.less'))
        .pipe(less())
        .pipe(gulp.dest(outputFolder))
        .pipe(rename({suffix: '.min'}))
        .pipe(minify())
        .pipe(gulp.dest(outputFolder));
});

gulp.task('build-app', function() {
    return gulp.src(['src/md-angular-datetime-picker.js', 'src/components/**/*.js'])
        .pipe(concat('md-angular-datetime-picker.js'))
        .pipe(wrap('(function() {\n"use strict";\n<%= contents %>\n})();'))
        .pipe(sourcemaps.init())
        .pipe(gulp.dest(outputFolder))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(outputFolder));
});

gulp.task('default', ['assets', 'build-app']);
