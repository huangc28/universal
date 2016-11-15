import React from 'react'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import configureStore from './store/configureStore'
import rootReducer from './reducers'

import routes from './routes'

const initialState = window.__INITIAL_STATE__

const store = configureStore(rootReducer, initialState)

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
