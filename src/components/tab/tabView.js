import React              from 'react'
import { browserHistory } from 'react-router'
import classNames         from 'classnames/bind'
import styles             from './tab.styl'

let styleClass = classNames.bind(styles)

let tabSelectors = [
  { btnText: '现金', type: 0 },
  { btnText: '枫车快手', type: 1 }
]

class Tab extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tabType: 0 }
    this.toogleItem = this.toogleItem.bind(this)
  }

  toogleItem(tabType) {
    let { tabRedirectUrl } = this.props

    this.setState({
      ...this.state,
      tabType
    })

    browserHistory.push(`${tabRedirectUrl}/${tabType}`)
  }

  render() {
    return (
      <div className={ styles.tabContainer }>
        { tabSelectors.map((tab, index) => {
          let selectorClass = styleClass({
            'item'    : true,
            'selected': this.state.tabType == tab.type
          })
          let toogleItem = this.toogleItem.bind(this, tab.type)
          return (
            <div className={ selectorClass } key={ index } onClick={ toogleItem }>
              { tab.btnText }
            </div>
          )
        }) }
      </div>
    )
  }
}

Tab.propTypes = {
  tabType       : React.PropTypes.number,
  tabRedirectUrl: React.PropTypes.string.isRequired
}

export default Tab
