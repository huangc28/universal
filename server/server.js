import 'babel-polyfill'
import express from 'express'
import { resolve } from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import renderFullPage from './utils/render'
import { createStore } from 'redux'
import { Provider }  from 'react-redux'
import App from '../src/containers/App'
import reducers from '../src/reducers'
import webpackConfig from '../webpack.config.js'
import webpack from 'webpack'

const app = express()
const staticPath = resolve(__dirname, '../..', 'build')
const compiler = webpack(webpackConfig)
const ROOT_PATH = resolve(__dirname)

// webpack dev middle ware
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}))

app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}))

// serve static files.
app.use(express.static(staticPath))

function handleRender (req, res) {
  // Create store.
  const store = createStore(reducers)

  // Render the component to string.
  const html = renderToString (
    <Provider store={store}>
      <App />
    </Provider>
  )

  // Get the initial state.
  const initialState = store.getState()

  // Send the rendered page back to client
  res.send(renderFullPage(html, initialState))
}

// Fired everytime the server side receives a request.
app.use('/', handleRender)

app.listen(3005, () => {
  console.log('listening in port 3005')
})
