/* global __CLIENT__ */

import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import { resolve } from 'path'
import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import morgan from 'morgan'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import fs from 'fs'

import { renderFullPage, staticify, publicPath } from './utils/render'
import configureStore from '../src/store/configureStore'
import routes from '../src/routes'
import rootReducer from '../src/reducers'

const app = express()
const webpackConfig = require('../webpack.config.js')({ dev: true })
const compiler = webpack(webpackConfig)

// write every request to access log.
const accessLogStream = fs.createWriteStream(resolve(__dirname, 'access.log'), { flag: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

// serve static files.
app.use('/', express.static(publicPath))

app.use(staticify.middleware)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
  // webpack dev middleware
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    historyApiFallback: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
    },
  }))

  app.use(webpackHotMiddleware(compiler, { // eslint-disable-line global-require
    log: console.log, // eslint-disable-line no-console
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
    headers: {
      // @issue webpack-dev-middleware note on v1.10.2
      // https://github.com/webpack/webpack-dev-middleware/releases
      'Access-Control-Allow-Origin': 'http://localhost:3005',
    },
  }))
}

if (!__CLIENT__) {
  global.window = {}
}

function handleRender (req, res, next) {
  match({
    routes,
    location: req.url,
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`)
    } else if (renderProps) {
      const preloadedState = {}

      const store = configureStore(rootReducer, preloadedState)
      // route is found, prepare html string...
      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      )

      // get the initial state from redux store
      const finalizedState = store.getState()

      // render full page along with html and redux store
      res.send(renderFullPage(html, finalizedState))
    }
    // pass on to the next route
    next()
  })
}

app.use(handleRender)

app.listen(3005, () => {
  console.log('listening in port 3005')
})
