import React, { Component, PropTypes } from 'react'
import { Router, browserHistory } from 'react-router'
import routes from '../../routes'
import { Provider } from 'react-redux'

const Root = props => {
  return (
    <Provider store={props.store}>
      <div>
        <Router routes={routes} history={browserHistory} />
      </div>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object,
}

export default Root
