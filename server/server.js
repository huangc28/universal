import 'babel-polyfill'
import express from 'express'
import { resolve } from 'path'
import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import configureStore from '../src/store/configureStore'
import routes from '../src/routes'
import { renderFullPage, staticify } from './utils/render'
import rootReducer from '../src/reducers'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const app = express()
const staticPath = resolve(__dirname, '..', 'static')
const webpackConfig = require('../webpack.config.js')({ dev: true })
const compiler = webpack(webpackConfig)

// serve static files.
app.use('/static', express.static(staticPath))

app.use(staticify.middleware)

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
  }))
}

function handleRender (req, res) {
  match({
    routes,
    location: req.url,
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`)
    } else if (renderProps) {

      const initialState = {}

      const store = configureStore(rootReducer, initialState)

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
    // route is not found, send 404 not found page.
  })
}

app.use(handleRender)

app.listen(3005, () => {
  console.log('listening in port 3005')
})
