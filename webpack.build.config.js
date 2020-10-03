'use strict'

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, 'src'),
  entry: {
    slider: './slider/SliderPlugin.ts',
    index: './index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
    //jquery: 'jQuery'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.pug')
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /\.module\.sass$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.sass$/,
        exclude: /\.module\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.ts$/,
        use: [
          'ts-loader'
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
      }
    ]
  }
}