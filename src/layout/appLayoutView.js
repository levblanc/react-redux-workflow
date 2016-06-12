import React  from 'react'
import styles from './layout.styl'


const appLayout = ({ children }) => (<div className={ styles.appContainer }>{ children }</div>)

appLayout.propTypes = {
  children: React.PropTypes.object.isRequired
}

export default appLayout
