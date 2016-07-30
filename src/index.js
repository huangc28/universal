import React, { Component } from 'react'
import { createStore } from 'redux'
import rootReducer from './reducers'
import ReactDOM from 'react-dom'
import Root from './containers/Root'

const initialState = window.__INITIAL_STATE__
const store = createStore(rootReducer, initialState)

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('app')
)
