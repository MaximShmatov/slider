import { resolve } from 'path';
import webpackDevConfig from './webpack.config';

export default {
  ...webpackDevConfig,
  mode: 'production',
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build'),
    publicPath: '',
  },
  externals: {
    //  jquery: 'jQuery'
  },
  devtool: false,
};
