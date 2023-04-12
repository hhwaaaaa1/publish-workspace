const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const data = require('gulp-data');
const ejs = require('gulp-ejs');
const frontMatter = require('gulp-front-matter');
const htmlBeautify = require('gulp-html-beautify');
const htmlmin = require('gulp-htmlmin');
const layout = require('gulp-layout');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const log = require('fancy-log');

let projects = {};

gulp.task('html', function () {
  projects = {};
  return gulp
    .src(['src/projects/**/*.ejs'])
    .pipe(frontMatter())
    .pipe(ejs())
    .pipe(
      data((file) => {
        const [, path, project] = /src(\/projects\/(.*)\/.*)\.ejs/g.exec(file.path) || [];
        const { page } = file.frontMatter;
        if (!page) return;
        projects[project] = {
          ...(projects[project] || {}),
          [page]: `${path}.html`,
        };
      })
    )
    .pipe(
      layout((file) => ({
        layout: 'src/layouts/default.ejs',
        styles: [],
        scripts: [],
        ...file.frontMatter,
      }))
    )
    .pipe(rename({ extname: '.html' }))
    .pipe(htmlBeautify({ indent_size: 2 }))
    .pipe(gulp.dest('./dist/projects'));
});

gulp.task('index-html', function () {
  return gulp
    .src('src/index.ejs')
    .pipe(ejs({ projects }))
    .pipe(rename({ extname: '.html' }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('css', function () {
  return gulp
    .src('src/**/*.scss')
    .pipe(sass())
    .pipe(postcss([require('tailwindcss'), require('autoprefixer')]))
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function () {
  return gulp.src('src/**/*.js').pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
  return gulp.src('dist/*').pipe(clean());
});

gulp.task('build', gulp.series('clean', 'html', 'index-html', 'css', 'js'));

gulp.task('reload', function (done) {
  browserSync.reload();
  done();
});

gulp.task('init', function () {
  browserSync.init({
    server: { baseDir: './dist' },
  });

  gulp.watch('./src/**/*', gulp.series('build', 'reload'));
});

gulp.task('serve', gulp.series('build', 'init'));
