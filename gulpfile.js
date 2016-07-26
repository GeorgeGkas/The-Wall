var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var del = require('del');
var runSequence = require('run-sequence');
var pug = require('gulp-pug');

require('es6-promise').polyfill();
var cssnano = require('gulp-cssnano');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('pug', function() {
    return gulp.src(['app/views/*.pug', '!app/views/layout.pug'])
        .pipe(pug())
        .pipe(gulp.dest('app/views'));
});

gulp.task('scss', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['>1%'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(cssnano())
        .pipe(gulp.dest('app/public/css'))
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});


gulp.task('empty:dist', function() {
  return del.sync('dist');
})


gulp.task('watchSCSS', function() {
    gulp.watch('app/scss/**/*.scss', ['scss']);
});

gulp.task('watchPUG', function() {
    gulp.watch('views/*.pug', ['pug']);
});


gulp.task('clean:build', function() {
    return del.sync(['dist/pages', 'dist/main.css']);
});

gulp.task('build', function (callback) {
  runSequence('empty:dist', 
    'scss', 'csso', 'useref', 'fonts', 'clean:build',
    function() {
        // callback
    }
  )
})