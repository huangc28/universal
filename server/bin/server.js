// include babel-core/register
// include .babelrc
// babel-register uses .babelrc
const fs =  require('fs')
const path = require('path')
const config =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../..', '.babelrc'), 'utf-8'))
require('babel-register')(config)
require(path.resolve(__dirname, '../server.js'))
