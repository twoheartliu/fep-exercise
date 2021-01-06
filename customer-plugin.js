const {Transform} = require('stream');
const path = require('path');

const log = console.log.bind(console);

const main = () => {
  return new Transform({
    // 这个参数是必须的
    objectMode: true,
    transform(...args) {
      log("args", args)
      let [file, encoding, callback, chunk] = args
      // Node 里 buffer 转 string 的方法
      // buffer.toString('utf8')

      // 先读取内容
      let content = file.contents.toString('utf8');
      //  处理内容
      content = content + 'twoheart';
      //  string 转成 buffer
      //  buffer.from(string)
      file.contents = Buffer.from(content);
      file.path = 'new.js';
      //  要在 build 目录下生成 new.js 文件，所以需要 file.relative 的值为 new.js
      //  file.relative 的值通过 path.relative(file.base, file.path) 计算
      //  原来的 file.base 是 a.js 所在目录的位置，也就是项目根目录下的 src 目录下
      //  项目在根目录下运行，所以直接返回到上一层目录就可以
      file.base = path.resolve(file.base, '..')
      log('file base', file.base)
      log('file path', file.path)
      log('file path absolute', path.resolve(file.path))
      log('relative', path.relative(file.base, file.path))
      let error = null;
      return callback(error, file);
    }
  });
};

module.exports = main;