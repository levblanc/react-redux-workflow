import React from 'react'
import styles from './home.styl'

const homeView = () => (
    <div className={styles.homeWrapper}>
      <h1>
        Welcome to the
        <span className={styles.reactColor}> React </span>
        <span className={styles.reduxColor}> Redux </span>
        World!!
      </h1>
    </div>
)

export default homeView
