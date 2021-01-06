const {src, dest} = require('gulp');
const customerPlugin = require('./customer-plugin');


function build() {
  return src('./src/a.js').pipe(customerPlugin()).pipe(dest('./dist'));
}

exports.build = build;