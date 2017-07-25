/* global __CLIENT__ */

import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'

import App from './containers/App'
import configureStore from './store/configureStore'
import rootReducer from './reducers'



if (module.hot) {
  module.hot.accept()
}

if (__CLIENT__) {
  const initialState = window.__INITIAL_STATE__ || {}

  const store = configureStore(rootReducer, initialState)

  ReactDOM.render(
    (
      <BrowserRouter>
        <App store={store} />
      </BrowserRouter>
    ), document.getElementById('app')
  )
}


