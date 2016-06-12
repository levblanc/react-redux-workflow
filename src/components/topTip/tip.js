import React  from 'react'
import styles from './tip.styl'

const TopTip = ({ tips }) => (
  <div className={ styles.tip }>{ tips }</div>
)

TopTip.propTypes = {
  tips: React.PropTypes.string.isRequired
}

export default TopTip
