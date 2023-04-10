const { dest, series, src } = require('gulp');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');

const html = () =>
  src('src/**/*.ejs')
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(dest('./dist'));

exports.default = series(html);
