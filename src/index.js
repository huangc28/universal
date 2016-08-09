import React, { Component } from 'react'
import { createStore } from 'redux'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import rootReducer from './reducers'
import routes from './routes'

const initialState = window.__INITIAL_STATE__
const store = createStore(rootReducer, initialState)

const App = () => (
	<Provider store={store}>
	  <Router routes={routes} history={browserHistory} />
	</Provider>
)

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
