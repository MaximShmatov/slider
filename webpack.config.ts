import { resolve } from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { ProvidePlugin } from 'webpack';

export default {
  mode: 'development',
  context: resolve(__dirname, 'src'),
  entry: {
    index: './index',
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
    new ProvidePlugin({
      $: 'jquery',
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
          'sass-loader',
        ],
      },
      {
        test: /\.sass$/,
        exclude: /\.module\.sass$/,
        use: [
          'style-loader',
          'css-loader',
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
      {
        test: /\.(ico|png|svg|xml|webmanifest)$/,
        include: /favicon/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '.',
            esModule: false,
          },
        },
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
