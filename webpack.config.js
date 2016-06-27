const webpack = require('webpack')
const { resolve } = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')

const ROOT_PATH = resolve(__dirname)
// console.log(resolve(ROOT_PATH, 'build'))
// console.log('root path', ROOT_PATH)
// console.log(resolve(ROOT_PATH, 'src/index.js'))
module.exports = {
  devtool: 'source-map',
  entry: [
    resolve(ROOT_PATH, 'src/index.js')
  ],
  output: {
    path: resolve(ROOT_PATH, 'build'),
    publicPath: '/static/',
    filename: 'bundle.js'
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
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'sass'
        ],
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      title: 'Universal App',
      template: resolve(ROOT_PATH, 'static/index.html')
    })
  ]
}
