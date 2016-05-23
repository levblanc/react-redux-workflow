import React    from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'

const DateRangePicker = React.createClass({
  render() {
    let buttonMapping = [
      {
        className: 'dateToday',
        text: 'today'
      },
      {
        className: 'dateWeek',
        text: 'week'
      },
      {
        className: 'dateMonth',
        text: 'month'
      },
      {
        className: 'dateAll',
        text: 'all'
      }
    ]

    let { dateRange } = this.props

    return (
      <div className='dateRangePicker'>
        { buttonMapping.map( (button, index) => {
          let buttonActive = dateRange === button.text ? 'active' : ''
          let boundClick = this.fetchData.bind(this, button.text)

          return(
            <button className={ `${button.className} ${buttonActive}` }
                    key={ button.text } onClick={ boundClick } >
              { button.text }
            </button>
          )
        })}
      </div>
    )
  },

  fetchData(dateRange) {
    Object.assign({}, this.props, { dateRange })
    this.props.fetchData({ dateRange })
    browserHistory.push(`/__redux-thunk-demo/${ dateRange }`)
  }
})

const SearchBox = React.createClass({
  render() {
    return (
      <div>
        <input type='search' ref='keywords' placeholder='keywords...' />
        <button onClick={ this.searchDemoData }>search</button>
      </div>
    )
  },

  searchDemoData(evt){
    let keywords = ReactDOM.findDOMNode(this.refs.keywords).value
    this.props.search({ keywords })
    browserHistory.push(`/__redux-thunk-demo/search/${keywords}`)
  }
})


const demoView = React.createClass({
  componentWillMount() {
    let { fetchData } = this.props
    let { dateRange, keywords } = this.props.routeParams

    if(dateRange){
      fetchData({ dateRange })
    }else if(keywords){
      fetchData({ keywords })
    }
  },

  render() {
    let { fetchData } = this.props
    let { dateRange, keywords } = this.props.routeParams
    let { fetching, error, resData } = this.props.demoData

    return (
      <div>
        <DateRangePicker dateRange={ dateRange } fetchData={ fetchData } />
        <SearchBox search={ fetchData } />
        { fetching && <div>数据加载中，请稍候…… </div> }
        { error && <div>数据加载失败</div> }
        { resData && resData.map((item, index) => {
          return (
            <div key={index}> { item.value } </div>
          )
        })}
      </div>
    )
  }
})

export default demoView
