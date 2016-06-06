import React              from 'react'
import styles             from '../../assets/styles/common.styl'

class LoadingFailView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(<div className={ styles.loadingFail }>数据加载失败</div>)
  }
}

export default LoadingFailView
