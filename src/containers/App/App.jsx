import React, { PropTypes } from 'react'
import styles from './App.css'

const App = props => (
  <div className={styles.root}>
    {props.children}
  </div>
)

App.propTypes = {
  children: PropTypes.node,
}

export default App
