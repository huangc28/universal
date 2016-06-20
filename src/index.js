import App from './containers/App'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

console.log('client side window', window)

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
