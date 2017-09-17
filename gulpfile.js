// Bootstrap scss source
var bootstrapSass = { in : './node_modules/bootstrap-sass/' };

// Bootstrap fonts source
var fonts = { in : [bootstrapSass.in + 'assets/fonts/**/*', './app/fonts-typo/*'],
  out: './app/public/fonts/'
};

var scss = { in : './app/scss/**/*.scss',
  out: './app/public/css/',
  watch: './app/scss/**/*.scss',
  sassOpts: {
    outputStyle: 'nested',
    precison: 3,
    errLogToConsole: true,
    includePaths: [bootstrapSass.in + 'assets/stylesheets']
  }
};
/***********************************************************************************/

var gulp = require('gulp');
var sass = require('sass');

require('es6-promise').polyfill();
var cssnano = require('gulp-cssnano');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');

// copy bootstrap required fonts to public
gulp.task('fonts', function CopyFonts() {
  return gulp
    .src(fonts.in)
    .pipe(gulp.dest(fonts.out));
});

// compile scss
gulp.task('scss', ['fonts'], function CompileSass() {
  return gulp.src(scss.in)
    .pipe(sass(scss.sassOpts).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [
        "Android 2.3",
        "Android >= 4",
        "Chrome >= 20",
        "Firefox >= 24",
        "Explorer >= 8",
        "iOS >= 6",
        "Opera >= 12",
        "Safari >= 6"
      ],
      cascade: false
    }))
    .pipe(csso())
    .pipe(cssnano())
    .pipe(gulp.dest(scss.out));
});

gulp.task('scss:watch', ['scss'], function WatchScss() {
  gulp.watch(scss.watch, ['scss']);
});
