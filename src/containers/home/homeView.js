import React from 'react'
import { Link } from 'react-router'
import styles from './home.styl'

const homeView = () => (
    <div className={styles.homeWrapper}>
      <h1>
        Welcome to the
        <Link to={'/client-profile-list'}>
          <span className={styles.reactColor}> React </span>
          <span className={styles.reduxColor}> Redux </span>
        </Link>
        World!!
      </h1>
    </div>
)

export default homeView
