import React              from 'react'
import ReactDOM           from 'react-dom'
import { browserHistory } from 'react-router'
import styles             from './searchBox.styl'

class SearchBox extends React.Component {
  constructor(props) {
    super(props)

    this.keyUpHandler = this.keyUpHandler.bind(this)
    this.searchHandler = this.searchHandler.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.routeKeyword !== this.props.routeKeyword) {
      if(nextProps.routeKeyword){
        this.setKeyword(nextProps.routeKeyword)
      }else{
        this.setKeyword('')
      }
    }
  }

  getKeyword() {
    return this.refs.keyword.value
  }

  setKeyword(val) {
    return this.refs.keyword.value = val
  }

  keyUpHandler(e) {
    if (e.keyCode === 13) {
      this.searchHandler()
    }
  }

  searchHandler() {
    if(this.getKeyword() != '') {
      this.props.onSearch(this.getKeyword())
    } else {
      alert('请输入关键词')
    }
  }

  render() {
    let { routeKeyword, placeholder } = this.props
    return (
      <div className={ styles.searchWrapper }>
        <div className={ styles.searchInner }>
          <label>快速查找：</label>
          <input type='search' className={ styles.searchInput }
                  defaultValue={ routeKeyword } ref='keyword'
                  placeholder={ placeholder }
                  onKeyUp={ this.keyUpHandler } />
          <button className={ styles.searchBtn }
                  onClick={ this.searchHandler }>搜索</button>
        </div>
      </div>
    )
  }
}

SearchBox.propTypes = {
  routeKeyword: React.PropTypes.string.isRequired,
  onSearch    : React.PropTypes.func.isRequired,
  placeholder : React.PropTypes.string.isRequired
}

export default SearchBox


