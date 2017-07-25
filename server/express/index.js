import express from 'express'
import bodyParser from 'body-parser'
import { resolve } from 'path'
import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import morgan from 'morgan'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import fs from 'fs'

import App from '../../src/containers/App'
import { renderFullPage, staticify, publicPath } from '../utils/render'
import configureStore from '../../src/store/configureStore'
import rootReducer from '../../src/reducers'

const app = express()
const webpackConfig = require('../../webpack.config.js')()
const compiler = webpack(webpackConfig)

// write every request to access log.
const accessLogStream = fs.createWriteStream(resolve(__dirname, '..' ,'access.log'), { flag: 'a' })
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
    headers: {
      // @issue webpack-dev-middleware note on v1.10.2
      // https://github.com/webpack/webpack-dev-middleware/releases
      'Access-Control-Allow-Origin': 'http://localhost:3005',
    },
  }))

  app.use(webpackHotMiddleware(compiler, { // eslint-disable-line global-require
    log: console.log, // eslint-disable-line no-console
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }))
}

if (!__CLIENT__) {
  global.window = {}
}

function handleRender (req, res, next) {
  const preloadedState = {}

  const store = configureStore(rootReducer, preloadedState)

  const context = {}

  const html = renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <Provider store={store}>
        <App store={store} />
      </Provider>
    </StaticRouter>
  )

  // if client renders redirect or not found (301, 302, or 404), server gets these information by context
  if (context.url) {
    const { status, url } = context

    res.redirect(status, url)
  } else {
    // get the initial state from redux store
    const finalizedState = store.getState()
    res.send(renderFullPage(html, finalizedState))
  }
  res.end()
}

app.use(handleRender)

export default app
