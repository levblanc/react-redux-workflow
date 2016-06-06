// ==========================================
// react-paginate 翻页插件
// https://github.com/AdeleD/react-paginate
//
// pageRangeDisplayed 参数
// 控制从第一页起可以看到的页数，跟数组一样是以0为起始
//
// marginPagesDisplayed 参数
// 控制从最后一页起显示倒数多少页，以1为起始
// ==========================================

import React from 'react'
import ReactPaginate from 'react-paginate'
import classNames from 'classnames/bind'
import styles from './pagination.styl'

let styleClass = classNames.bind(styles)

class Pagination extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { clickCallback, pageNum, currentPage } = this.props

    let pageUpClass = styleClass({
      'pages' : true,
      'pageUp': true
    })

    let pageDownClass = styleClass({
      'pages'   : true,
      'pageDown': true
    })

    let activeClass = styleClass({
      'pages'   : true,
      'selected': true
    })

    let breakClass = styleClass({
      'pages' : true,
      'break' : true
    })

    let disabledClass = styleClass({
      'pages'   : true,
      'disabled': true
    })

    return (
      <div className={ styles.pagenationWrapper }>
       <ReactPaginate previousLabel={ '上一页' }
                      nextLabel={ '下一页' }
                      initialSelected={ 0 }
                      forceSelected={ currentPage }
                      pageNum={ pageNum }
                      clickCallback={ clickCallback }
                      marginPagesDisplayed={ 1 }
                      pageRangeDisplayed={ 5 }
                      containerClassName={ styles.pagination }
                      pageClassName={ styles.pages }
                      pageLinkClassName={ styles.pageLink }
                      previousClassName={ pageUpClass }
                      previousLinkClassName={ styles.pageLink }
                      nextClassName={ pageDownClass }
                      nextLinkClassName={ styles.pageLink }
                      breakClassName={ breakClass }
                      activeClassName={ activeClass }
                      disabledClassName={ disabledClass }/>
      </div>
    )
  }
}

Pagination.propTypes = {
  currentPage  : React.PropTypes.number.isRequired,
  pageNum      : React.PropTypes.number.isRequired,
  clickCallback: React.PropTypes.func.isRequired
}

export default Pagination
