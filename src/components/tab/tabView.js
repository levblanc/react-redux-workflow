import React              from 'react'
import classNames         from 'classnames/bind'
import styles             from './tab.styl'

const styleClass = classNames.bind(styles)

const tabSelectors = [
  { btnText: '现金', type: '0' },
  { btnText: '枫车快手', type: '1' }
]

class Tab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: null
    }
    this.toogleItem = this.toogleItem.bind(this)
  }

  componentWillMount() {
    const { tabType } = this.props
    this.setState({
      currentTab: tabType
    })
  }

  toogleItem(tabType) {
    this.setState({
      currentTab: tabType
    })
    this.props.tabCallback(tabType)
  }

  render() {
    return (
      <div className={ styles.tabContainer }>
        { tabSelectors.map((tab, index) => {
          const selectorClass = styleClass({
            item    : true,
            selected: this.state.currentTab === tab.type
          })
          const toogleItem = this.toogleItem.bind(this, tab.type)
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
  tabType    : React.PropTypes.string.isRequired,
  tabCallback: React.PropTypes.func.isRequired
}

export default Tab
