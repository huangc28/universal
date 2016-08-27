const webpack = require('webpack')
const { resolve } = require('path')
const validator = require('webpack-validator')
const packages = require('./package.json')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
  const add = (env, plugin) => env && plugin || undefined
  const ifDev = plugin => add(env.dev, plugin)
  const ifProd = plugin => add(env.prod, plugin)
  const removeEmpty = plugins => (plugins.filter(i => !!i))
  return {
    devtool: env.prod ? 'source-map' : 'eval-source-map',
    entry: removeEmpty([
      resolve(__dirname, 'src/index.js'),
      ifDev('webpack-hot-middleware/client?path=/__webpack_hmr'),
    ]),
    output: {
      path: resolve(__dirname, 'build'),
      publicPath: '/',
      filename: '[name].js',
    },
    bail: env.prod,
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
    node: {
      fs: 'empty',
    },
    module: {
      preLoaders: [
        {
          test: /\.(js|jsx)$/,
          loaders: ['eslint'],
          include: resolve(__dirname, 'universal'),
        },
      ],
      loaders: removeEmpty([
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'react', 'stage-0'],
          },
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          test: /\.(jpe?g|png)/,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ],
        },
        {
          test: /\.svg/,
          loader: 'svg-url-loader?limit=25000',
        },
        {
          test: /\.woff(\?\.*)?$/,
          loader: 'url',
          query: {
            limit: 50000,
            mimetype: 'application/font-woff',
            name: './font/[hash].[ext]',
          },
        },
        {
          test: /\.woff2(\?\.*)?$/,
          loader: 'url',
          query: {
            limit: 50000,
            mimetype: 'application/font-woff2',
            name: './font/[hash].[ext]',
          },
        },
        {
          test: /\.ttf$|\.eot$/,
          loader: 'file',
          query: {
            name: 'font/[hash].[ext]',
          },
        },
        ifProd({
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style',
            loader: 'css?module&importLoaders=1&' +
            'localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          }),
        }),
        ifDev({
          test: /\.css$/,
          loader: 'style!css?modules&importLoaders=1&' +
          'localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        }),
      ]),
    },
    plugins: removeEmpty([
      ifProd(new webpack.optimize.DedupePlugin()),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false,
        },
      })),
      ifProd(
          new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"',
        })
      ),
      ifDev(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"development"',
        })
      ),
      ifProd(new ExtractTextPlugin('[name].css')),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js',
        minChunks: module => (
          module.resource &&
          module.resource.indexOf('node_module') !== -1 &&
          module.resource.indexOf('.css') === -1
        ),
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      ifDev(new webpack.HotModuleReplacementPlugin({
        multiStep: true,
      })),
      ifDev(new webpack.NoErrorsPlugin()),
    ]),
  }
}
