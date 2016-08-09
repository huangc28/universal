import React, { Component, PropTypes } from 'react'
import styles from './App.css'

class App extends Component {
	render () {
		return (
			<div className={styles.root}>
    		{this.props.children}
  		</div>
		)
	}
}

App.propTypes = {
  children: PropTypes.node,
}

export default App
