var gulp       = require('gulp'),
    useref     = require('gulp-useref'),
    jshint     = require('gulp-jshint'),
    webserver  = require('gulp-webserver'),
    sourcemaps = require('gulp-sourcemaps'),
    gif        = require('gulp-if'),
    uglify     = require('gulp-uglify'),
    lazypipe   = require('lazypipe'),


    src = 'src/',
    glob_js = src + 'js/**/*.js',
    glob_html = src + '*.html',

    target = 'target';

gulp.task('lint', function(cb) {
    gulp.src(glob_js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
    cb();
});

gulp.task('app', ['lint'], function() {
    gulp.src(glob_html)
        .pipe(useref({},
                   lazypipe().pipe(sourcemaps.init)))
        .pipe(gif('*.js', uglify()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(target));
});

gulp.task('dev', ['app'], function() {
    gulp.watch([glob_html, glob_js], ['app']);
    gulp.src(target)
        .pipe(webserver());
});
