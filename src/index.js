import React, { Component } from 'react'
import { createStore } from 'redux'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import rootReducer from './reducers'
import routes from './routes'

const initialState = window.__INITIAL_STATE__
const store = createStore(rootReducer, initialState)

// check if its hmr.
if (module.hot) {
	// accept itself.
	module.hot.accept()
}

const App = () => (
	<Provider store={store}>
	  <Router routes={routes} history={browserHistory} />
	</Provider>
)

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
