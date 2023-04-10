const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));

function html() {
  return gulp
    .src('src/**/*.ejs')
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('./dist'));
}

function css() {
  return gulp.src('src/**/*.scss').pipe(sass()).pipe(gulp.dest('./dist'));
}

const build = gulp.series(html, css);

function serve() {
  browserSync.init({ server: { baseDir: './dist' } });
  gulp.watch('./src/**/*', gulp.series(build, browserSync.reload));
}

exports.default = build;
exports.build = build;
exports.serve = serve;
