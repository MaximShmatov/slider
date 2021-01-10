const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './pages/index',
    slider: './components/range-slider/SliderPlugin',
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'pages/index.pug',
      filename: 'index.html',
      chunks: ['index'],
      inject: 'body',
    }),
    new webpack.ProvidePlugin({
      'window.$': 'jquery',
      '$': 'jquery',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.module\.sass$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: 'global',
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.sass$/,
        exclude: /\.module\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.pug$/,
        use: 'pug-loader',
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    port: 9000,
    watchContentBase: true,
    stats: 'errors-warnings',
    progress: true,
    hot: true,
  },
};
