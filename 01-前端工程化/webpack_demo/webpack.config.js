const path = require('path')

module.exports = {
  entry: './src/index.js', //入口文件,可以配置多入口
  output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname,'dist')
  }
}