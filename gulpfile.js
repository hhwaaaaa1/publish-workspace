const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));

const html = () =>
  gulp
    .src('src/**/*.ejs')
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('./dist'));

const css = () =>
  gulp.src('src/**/*.scss').pipe(sass()).pipe(gulp.dest('./dist'));

gulp.task('build', gulp.series(html, css));

gulp.task('serve', function () {
  browserSync.init({
    server: { baseDir: './dist' },
  });

  gulp.watch('./src/**/*', gulp.series('build', browserSync.reload));
});
