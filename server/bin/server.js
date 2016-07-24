const fs =  require('fs')
const path = require('path')
const config =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../..', '.babelrc'), 'utf-8'))
require('babel-register')(config)
require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
})
require(path.resolve(__dirname, '../server.js'))
