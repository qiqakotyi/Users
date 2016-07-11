var gulp = require("gulp"),
    connect = require("gulp-connect"),
    sass = require('gulp-sass'),
    path = require('path'),
    lodash = require('lodash'),
    fs = require('fs'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    ngAnnotate = require('gulp-ng-annotate'),
    inject = require('gulp-inject');

gulp.task("start", function () {

    connect.server(
        {
            root: "views",
            port: 3000,
            livereload: true,
            middleware: function (connect, opt) {
                return [
                    connect().use('/bower_components', connect.static('./bower_components'))
                ]
            }
        });
});

gulp.task('watch', function () {
    gulp.watch('./public/css/**/*.scss', ['sass']);
    gulp.watch('./public/js/**/*.js', ['scripts']);
});

gulp.task('lint', function () {
    return gulp.src(['./public/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter("fail"));
});

gulp.task('sass', function(done) {
    gulp.src('./public/css/site.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./public/css/'))
        .pipe(minifycss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./public/css/'))
        .on('end', done);
});