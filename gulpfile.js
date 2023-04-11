const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const ejs = require('gulp-ejs');
const frontMatter = require('gulp-front-matter');
const layout = require('gulp-layout');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));

gulp.task('html', function () {
  return gulp
    .src(['src/**/*.ejs', '!src/layouts/*'])
    .pipe(frontMatter())
    .pipe(ejs())
    .pipe(
      layout((file) => ({
        layout: 'src/layouts/default.ejs',
        ...file.frontMatter,
      }))
    )
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('css', function () {
  return gulp
    .src('src/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
  return gulp.src('dist/*').pipe(clean());
});

gulp.task('build', gulp.series('clean', 'html', 'css'));

gulp.task('serve', function () {
  browserSync.init({
    server: { baseDir: './dist' },
  });

  gulp.watch(
    './src/**/*',
    gulp.series('build', browserSync.reload)
  );
});
