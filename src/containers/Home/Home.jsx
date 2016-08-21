import React, { Component } from 'react'
import Title from '../../components/Title'
import TestJPEG from './images/test.jpeg'
import styles from './Home.css'

class Home extends Component {
	constructor (props) {
		super(props)

		this.state = {
			text: 'some',
		}
	}

	render() {
		return (
			<div className={styles.root}>
				<Title title="this is a custom titlesss" />
	    	hot reload ftw!!!
	    	{this.state.text}
				<img src={TestJPEG} />
	  	</div>
		)
	}
}

export default Home
