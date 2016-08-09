import 'babel-polyfill'
import express from 'express'
import { resolve, join } from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../src/routes'
import { renderFullPage, staticify } from './utils/render'
import { createStore } from 'redux'
import { Provider }  from 'react-redux'
import reducers from '../src/reducers'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config.js'

const app = express()
const staticPath = resolve(__dirname, '..', 'static')
const compiler = webpack(webpackConfig)

// serve static files.
app.use('/static', express.static(staticPath))

app.use(staticify.middleware)

// webpack dev middleware
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  hot: true,
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


function handleRender (req, res) {
  match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`)
    } else if (renderProps) {

      // route is found, prepare html string...
      const html = renderToString(<RouterContext {...renderProps} />)

      // prepare redux store
      const store = createStore(reducers)

      // get the initial state from redux store
      const initialState = store.getState()

      // render full page along with html and redux store
      res.send(renderFullPage(html, initialState))
    }
    // route is not found, send 404 not found page.
  })
}

app.use(handleRender)

app.listen(3005, () => {
  console.log('listening in port 3005')
})
