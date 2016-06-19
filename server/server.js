import 'babel-polyfill'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import renderFullPage from './utils/render'
import { createStore } from 'redux'
import { Provider }  from 'react-redux'
import App from '../src/containers/App'
import reducers from '../src/reducers'
import express from 'express'

const app = express()

const staticPath = path.resolve(__dirname, '../..', 'static')

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
