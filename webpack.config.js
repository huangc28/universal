const webpack = require('webpack')
const { resolve } = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const validator = require('webpack-validator')
const ROOT_PATH = resolve(__dirname)

const common = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr',
    resolve(ROOT_PATH, 'src/index.js')
  ],
  output: {
    path: resolve(ROOT_PATH, 'build'),
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  node: {
    fs: 'empty'
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['eslint'],
        include: resolve(ROOT_PATH, 'universal')
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0', 'react-hmre']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&importLoaders=1&' +
        'localIdentName=[path]___[name]__[local]___[hash:base64:5]'
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Universal App',
      template: resolve(ROOT_PATH, 'static/index.html')
    })
  ]
}

// module.exports = common

let config
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(common, {})
    break
  default:
    config = merge(common, {
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      }),
      new webpack.NoErrorsPlugin(),
    ]
  })
}

module.exports = validator(config)
