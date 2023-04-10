const { dest, series, src } = require('gulp');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));

const html = () =>
  src('src/**/*.ejs')
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(dest('./dist'));

const css = () => src('src/**/*.scss').pipe(sass()).pipe(dest('./dist'));

exports.default = series(html, css);
