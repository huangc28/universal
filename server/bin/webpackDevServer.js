// dev server settings
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const fs = require('fs')
const { resolve } = require('path')
const config = require('../../webpack.config.js')
const ROOT_PATH = resolve(__dirname)

console.log(config.entry.app)
// const server = new WebpackDevServer(compiler, {
//   contentBase: resolve(ROOT_PATH, 'build'),
//   historyApiFallback: true,
//   hot: true,
//   progress: true,
//   inline: true,
//   filename: 'bundle.js'
// })
//
// server.listen(3004, 'localhost', () => {
//   console.log('localhost')
// })
