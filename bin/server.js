const fs = require('fs')
const path = require('path')
const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '.babelrc'), 'utf-8'))

/**
 * Use "es2015" on the server side.
 */
config.presets = config.presets.map(preset => {
  if (Array.isArray(preset) && preset[0] === 'es2015') {
    preset.splice(1, 1)

    return preset
  }

  return preset
})

require('babel-register')(config)

const generateScopedName = process.env.NODE_ENV === 'production'
  ? '_[hash:base64:5]'
  : '[name]__[local]__[hash:base64:5]'
require('css-modules-require-hook')({
  generateScopedName,
})

require('asset-require-hook')({
  extensions: ['jpeg', 'jpg', 'png', 'svg'],
  name: '/[hash].[ext]',
})

global.__CLIENT__ = false

require(path.resolve(__dirname, '../server', 'server.js'))
