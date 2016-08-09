const webpack = require('webpack')
const { resolve } = require('path')
const validator = require('webpack-validator')
const packages = require('./package.json')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const prod = process.env.NODE_ENV === 'production'
const dev = process.env.NODE_ENV === 'development'
const add = (env, plugin) => (env && plugin || undefined)
const ifDev = plugin => add(dev, plugin)
const ifProd = plugin => add(prod, plugin)
const removeEmpty = plugins => (plugins.filter(i => !!i))

const config = {
  devtool: prod ? 'source-map' : 'eval-source-map',
  entry: {
    main: [resolve(__dirname, 'src/index.js'), 'webpack-hot-middleware/client'],
    vendor: [
      ...Object.keys(packages.dependencies),
      'webpack-hot-middleware/client',
    ],
  },
  output: {
    path: resolve(__dirname, 'build'),
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
        include: resolve(__dirname, 'universal')
      }
    ],
    loaders: removeEmpty([
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
      ifProd({
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style', 
          'css',
          'importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        )
      }),
      ifDev({
        test: /\.css$/,
        loader: 'style!css?modules&importLoaders=1&' +
        'localIdentName=[path]___[name]__[local]___[hash:base64:5]'
      }),
    ])
  },
  plugins: removeEmpty([
    ifProd(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ),
    ifProd(
        new webpack.DefinePlugin({
        'process.env.NODE_ENV': 'production'
      })
    ),
    ifProd(new ExtractTextPlugin('[name].css')),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
    new webpack.optimize.OccurrenceOrderPlugin(),
    ifDev(new webpack.HotModuleReplacementPlugin({
      multiStep: true,
    })),
    ifDev(new webpack.NoErrorsPlugin()),
  ])
}

module.exports = validator(config)
