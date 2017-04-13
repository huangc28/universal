import React, { Component } from 'react'
import Title from '../../components/Title'
import LogoSVG from './images/logo.svg'
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
				<Title title="this is a custom title" />
				setdefsssesdfeesdfDESDF
	    	{this.state.text}
				<img src={LogoSVG} />
	  	</div>
		)
	}
}

export default Home
