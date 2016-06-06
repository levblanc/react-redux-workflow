import React              from 'react'
import styles             from '../../assets/styles/common.styl'

class LoadingView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(<div className={ styles.loadingTips }>正在加载，请稍候……</div>)
  }
}

export default LoadingView
