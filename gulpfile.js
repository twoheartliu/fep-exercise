const {src, dest, series} = require('gulp');
const babel = require('gulp-babel');
const less = require('gulp-less');
const path = require('path');

function buildJs() {
  return src('src/**/*.js').pipe(babel({
    presets: ['@babel/env']
  })).pipe(dest('dist/'));
}

function buildCss() {
  return src('src/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(dest('dist/'));
}

function buildHtml() {
  return src('src/**/*.html')
    .pipe(dest('dist/'));
}

exports.build = series(buildJs, buildCss, buildHtml);