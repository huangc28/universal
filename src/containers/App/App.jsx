import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import React from 'react'
import { Provider } from 'react-redux'

import Home from '../Home'
import styles from './App.css'

const App = ({ store }) => (
	<Provider store={store}>
		<div className={styles.root}>
			<Switch>
				<Route path='/' component={Home} />
			</Switch>
		</div>
	</Provider>
)

App.propTypes = {
	children: PropTypes.node,
	store: PropTypes.object,
}

export default App
