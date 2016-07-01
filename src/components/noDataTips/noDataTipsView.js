import React  from 'react'
import styles from 'assets/styles/common.styl'

const NoDataTips = ({ tips }) => (
  <div className={ styles.noDataTips }>{ tips || '暂无数据' }</div>
)

NoDataTips.propTypes = {
  tips: React.PropTypes.string
}

export default NoDataTips
