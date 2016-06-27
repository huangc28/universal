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
import config from '../webpack.config.js'
import webpackMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'
const app = express()
const staticPath = resolve(__dirname, '../..', 'static')
const compiler = webpack(config)
const ROOT_PATH = resolve(__dirname)

app.use(webpackMiddleware(compiler, {
  inline: true,
  hot: true,
  contentBase: resolve(ROOT_PATH, 'build'),
  publicPath: '/static/',
  stats: {colors: true}
}))

// serve static files.
app.use('/static', express.static(staticPath))

// Fired everytime the server side receives a request.
app.use(handleRender)
app.use(renderFullPage)

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

app.listen(3004, () => {
  console.log('listening in port 3004')
})
