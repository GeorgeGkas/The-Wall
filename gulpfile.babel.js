/**
 * Import gulp and required plugins.
 */
import gulp from 'gulp';
import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import csso from 'gulp-csso';
import autoprefixer from 'gulp-autoprefixer';
import closureCompiler from 'google-closure-compiler-js';
import path from 'path';
import flatmap from 'gulp-flatmap';

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
  out: './dist/public/fonts/',
};

/**
 * JQuery 3.2.0
 */
const JQuery = {
  in: './node_modules/jquery/dist/jquery.min.js',
  out: './dist/public/javascript/vendors/'
};

/**
 * App paths.
 */
const scss = {
  in: './app/scss/**/*.scss',
  out: './dist/public/css/',
  watch: './app/scss/**/*.scss',
  sassOpts: {
    outputStyle: 'nested',
    precison: 3,
    errLogToConsole: true,
    includePaths: [`${bootstrapSass.in}assets/stylesheets`],
  },
};

const pug = {
  in: './app/views/**/*.pug',
  out: './dist/views/',
}

const img = {
  in: './app/public/img/**/*',
  out: './dist/public/img/',
}

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

/**
 * Copy views to dist
 */
gulp.task('pug', () => (
  gulp.src(pug.in).pipe(gulp.dest(pug.out))
));

/**
 * Copy images to dist
 */
gulp.task('img', () => (
  gulp.src(img.in).pipe(gulp.dest(img.out))
));

/**
 * Copy javascript vendors to dist
 */
gulp.task('jsvendors', () => {
  gulp.src(JQuery.in).pipe(gulp.dest(JQuery.out));
  gulp.src('./app/public/javascript/vendors/**/*').pipe(gulp.dest('./dist/public/javascript/vendors'));
});

/**
 * Compile js front end files with closure compiler
 */
gulp.task('jsclosure', () => (
  gulp.src('./app/public/javascript/pages/*.js', {base: './'})
    .pipe(flatmap((stream, file) => (
      stream.pipe(closureCompiler.gulp()({
        compilation_level: 'SIMPLE',
        js_output_file: path.basename(file.path).replace(/js$/, 'min.js')
      }))
    )))
    .pipe(gulp.dest('./dist/public/javascript/pages/'))
));

/**
 * Default
 */
 gulp.task('default', ['scss', 'pug', 'img', 'jsvendors', 'jsclosure']);
