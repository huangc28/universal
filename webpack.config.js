const webpack = require('webpack')
const { resolve } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = () => {
  const isProd = process.env.NODE_ENV === 'production'
  const isDev = process.env.NODE_ENV === 'development'

  const ifDev = plugin => (isDev && plugin) || undefined
  const ifProd = plugin => (isProd && plugin) || undefined

  const removeEmpty = plugins => (plugins.filter(i => !!i))

  return {
    devtool: isProd ? 'source-map' : 'eval-source-map',
    entry: removeEmpty([
      resolve(__dirname, 'src/index.js'),
      ifDev('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'),
    ]),
    output: {
      path: resolve(__dirname, 'build'),
      publicPath: '/',
      filename: '[name].js',
    },
    bail: isProd,
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
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          loaders: [
            'file?name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
          ],
        },
        {
          test: /\.svg$/,
          loader: 'file?name=[hash].[ext]',
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
            'localIdentName=_[hash:base64:5]!postcss-loader',
          }),
        }),
        ifDev({
          test: /\.css$/,
          loader: 'style!css?modules&importLoaders=1&' +
          'localIdentName=[name]__[local]__[hash:base64:5]!postcss-loader',
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
      new webpack.DefinePlugin({
        __DEVELOPMENT__: isDev,
        __PRODUCTION__: isProd,
        __CLIENT__: true,
      }),
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
      ifProd(new ExtractTextPlugin('bundle.css')),
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
