var gulp       = require('gulp'),
    useref     = require('gulp-useref'),
    jshint     = require('gulp-jshint'),
    webserver  = require('gulp-webserver'),
    sourcemaps = require('gulp-sourcemaps'),
    gif        = require('gulp-if'),
    uglify     = require('gulp-uglify'),
    lazypipe   = require('lazypipe'),

    src       = 'src/',
    glob_js   = src + 'js/**/*.js',
    glob_css  = src + 'css/**/*.css',
    glob_html = src + '*.html',

    target = 'target';

function mkErrorHandler(name) {
    return function(error) {
        console.error("There was an error with " + name, error.toString());
    }
}

gulp.task('lint', function(cb) {
    gulp.src(glob_js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
    cb();
});

gulp.task('app:dev', ['lint'], function() {
    gulp.src(glob_html)
        .pipe(useref({},
                     lazypipe().pipe(sourcemaps.init)))
        .pipe(gif('*.js', uglify()))
        .on('error', mkErrorHandler('uglify'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(target));
});

gulp.task('app:prod', ['lint'], function() {
    gulp.src(glob_html)
        .pipe(useref({}))
        .pipe(gif('*.js', uglify()))
        .on('error', mkErrorHandler('uglify'))
        .pipe(gulp.dest(target));
});

gulp.task('dev', ['app:dev'], function() {
    gulp.watch([glob_html, glob_js, glob_css], ['app:dev']);
    gulp.src(target)
        .pipe(webserver());
});

gulp.task('prod', ['app:prod']);
