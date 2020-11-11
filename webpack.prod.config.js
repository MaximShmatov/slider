const path = require('path');

module.exports = {
  ...require('./webpack.config'),
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '',
  },
  externals: {
    //jquery: 'jQuery'
  },
  devtool: false,
}