import React, { Component } from 'react'
import Title from '../../components/Title'
import styles from './Home.css'

class Home extends Component {
	render() {
		return (
			<div className={styles.root}>
				<Title title="this is a custom title" />
	    	hot reload ftwddd!!!
	  	</div>
		)
	}
}

export default Home