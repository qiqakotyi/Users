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
gulp.task('scripts', function () {
    gulp.src(['./public/vendor/jquery/dist/jquery.min.js',
            './public/vendor/angular/angular.min.js',
            './public/vendor/gsap/src/minified/TweenMax.min.js',
            './public/vendor/placeholders/dist/placeholders.min.js',
            './public/vendor/bootstrap/dist/js/bootstrap.min.js',
            './public/vendor/lodash/lodash.js',
        ])
        .pipe(ngAnnotate())
        .pipe(concat('combined.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist/js/'));

    var appfiles = ['./public/js/users.js',
        './public/js/services/users-service.js',
        './public/js/controllers/user-controller.js'];

    gulp.src(appfiles)
        .pipe(ngAnnotate())
        .pipe(concat('combined2.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist/js/'));


    gulp.src(['./public/js/**/*.js'])
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./public/dist/js/'));

    var final = ['./public/dist/js/combined.min.js'].concat(appfiles);
    gulp.src('index.html')
        .pipe(inject(gulp.src(final, {read: false}), {relative: false, ignorePath : 'public' }))
        .pipe(gulp.dest('./'));


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