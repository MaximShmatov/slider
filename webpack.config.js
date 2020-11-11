const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const slider = require(path.resolve(__dirname, 'api/sliderREST.js'));
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '../node_modules/jquery/dist/jquery.min.js',
          to: 'vendor',
        },
        {
          from: '../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
          to: 'vendor',
        },
        {
          from: '../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
          to: 'vendor',
        },
      ],
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
              modules: true,
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
    before: slider,
  },
};
