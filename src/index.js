import BoilerPlate from './components/boilerplate'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  render () {
    return (
      <div>
        <BoilerPlate />
        first universal component
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
