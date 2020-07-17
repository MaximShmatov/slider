'use strict'

const webpack = require('webpack');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const slider = require(path.resolve(__dirname, 'api/sliderREST.js'));

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './index.ts'
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.pug')
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use:
          [
            'to-string-loader',
            'css-loader'
          ]
      },
      {
        test: /\.(sass)$/,
        use:
        [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          options: {
            pretty: true
          }
        }
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
      }
    ]
  },
  devServer: {
    //contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true,
    port: 9000,
    progress: true,
    hot: true,
    before: slider
  }
}