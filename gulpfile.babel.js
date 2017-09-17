/**
 * Import gulp and required plugins.
 */
import gulp from 'gulp';
import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import csso from 'gulp-csso';
import autoprefixer from 'gulp-autoprefixer';

/**
 * Bootstrap sass source.
 */
const bootstrapSass = {
  in: './node_modules/bootstrap-sass/',
};

/**
 * Bootstrap and custom fonts source.
 */
const fonts = {
  in: [`${bootstrapSass.in}assets/fonts/**/*`, './app/fonts-typo/*'],
  out: './app/public/fonts/',
};

/**
 * App paths.
 */
const scss = {
  in: './app/scss/**/*.scss',
  out: './app/public/css/',
  watch: './app/scss/**/*.scss',
  sassOpts: {
    outputStyle: 'nested',
    precison: 3,
    errLogToConsole: true,
    includePaths: [`${bootstrapSass.in}assets/stylesheets`],
  },
};

/**
 * Copy bootstrap required fonts to public folder.
 */
gulp.task('fonts', () => (
  gulp
    .src(fonts.in)
    .pipe(gulp.dest(fonts.out))
));

/**
 * Compile scss.
 */
gulp.task('scss', ['fonts'], () => (
  gulp.src(scss.in)
    .pipe(sass(scss.sassOpts).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [
        'Android >= 4',
        'Chrome >= 20',
        'Firefox >= 24',
        'Explorer >= 8',
        'iOS >= 6',
        'Opera >= 12',
        'Safari >= 6',
      ],
      cascade: false,
    }))
    .pipe(csso())
    .pipe(cssnano())
    .pipe(gulp.dest(scss.out))
));

/**
 * Compile scss watch.
 */
gulp.task('scss:watch', ['scss'], () => {
  gulp.watch(scss.watch, ['scss']);
});
