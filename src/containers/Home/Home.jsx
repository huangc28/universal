import React, { Component } from 'react'
import Title from '../../components/Title'
import styles from './Home.css'

class Home extends Component {
	constructor (props) {
		super(props)

		this.state = {
			text: 'some randddom',
		}
	}

	render() {
		return (
			<div className={styles.root}>
				<Title title="this is a custom titlesss" />
	    	hot reload ftw!!!
	    	{this.state.text}
	  	</div>
		)
	}
}

export default Home
