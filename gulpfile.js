var gulp = require('gulp');
var sass = require('gulp-sass');

require('es6-promise').polyfill();
var cssnano = require('gulp-cssnano');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');

/*  scss task used to complile and minify .scss files
 */
gulp.task('scss', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        /*.pipe(autoprefixer({
            browsers: ['>1%'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(cssnano())*/
        .pipe(gulp.dest('app/public/css'))
});


gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', ['scss']);
});