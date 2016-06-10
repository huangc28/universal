import React, { Component } from 'react'
import test from './test'
import styles from './Boilerplate.scss'

export default class boilerplate extends Component {
  render () {
    console.log('test styles', styles)
    console.log('test', test)
    return (
      <div className={styles.red}>Universal App b component</div>
    )
  }
}
