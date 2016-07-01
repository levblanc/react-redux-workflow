import React              from 'react'
import styles             from 'assets/styles/common.styl'

const LoadingFailView = ({ errMsg }) => (
  <div className={ styles.loadingFail }>{ errMsg || '数据加载失败' }</div>
)

LoadingFailView.propTypes = {
  errMsg: React.PropTypes.string
}

export default LoadingFailView
