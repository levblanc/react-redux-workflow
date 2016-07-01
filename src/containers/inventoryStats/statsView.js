import React              from 'react'
import styles             from './stats.styl'
import { browserHistory } from 'react-router'
import routeObjParser     from 'utils/routeObjParser'
import initReqParams      from 'utils/initReqParams'
import initRouteObj       from 'utils/initRouteObj'

import Loading                 from 'components/loading/loadingView'
import LoadingFail             from 'components/loading/loadingFailView'
import TableHead               from 'components/tableHead/tableHeadView'
import SearchBox               from 'components/searchBox/searchBoxView'
import ProductCategorySelector from 'components/productCategorySelector/selectorView'
import TopTip                  from 'components/topTip/tip'
import NoDataTips              from 'components/noDataTips/noDataTipsView'
import Pagination              from 'components/pagination/paginationView'


class inventoryStatsView extends React.Component {
  constructor(props) {
    super(props)
    const { storeId } = this.props.params

    const initialReqParams = {
      storeId,
      page: 1
    }

    const initialRouteObj = {
      path: 'inventory-stats',
      params: {
        store: storeId
      }
    }

    this.reqParams = initReqParams(initialReqParams)
    this.routeObj  = initRouteObj(initialRouteObj)

    this.onSearch          = this.onSearch.bind(this)
    this.onCategoryChange  = this.onCategoryChange.bind(this)
    this.paginationHandler = this.paginationHandler.bind(this)
  }

  componentDidMount() {
    const { fetchCategory, fetchInventory } = this.props
    const { storeId, categoryId, keyword } = this.props.params

    this.reqParams = {
      ...this.reqParams,
      categoryId,
      keyword,
      page: 1
    }

    fetchCategory({ storeId })
    categoryId && fetchInventory(this.reqParams)
  }

  componentWillReceiveProps(nextProps) {
    const { categoryId, keyword } = this.props.params
    const { fetchInventory } = this.props

    const nextCategoryId = nextProps.params.categoryId
    const nextKeyword     = nextProps.params.keyword

    const categoryChanged = nextCategoryId !== categoryId
    const keywordChanged = nextKeyword !== keyword

    if (categoryChanged || keywordChanged) {
      this.reqParams = {
        ...this.reqParams,
        categoryId: nextCategoryId,
        keyword   : nextKeyword,
        page      : 1
      }

      fetchInventory(this.reqParams)
    }
  }

  onSearch(keyword) {
    const { categoryId } = this.props.params

    this.routeObj.params = {
      ... this.routeObj.params,
      category : categoryId,
      search   : keyword
    }

    if (!categoryId) {
      alert('请先选择一个商品类目')
      return
    }

    browserHistory.push(routeObjParser(this.routeObj))
  }

  onCategoryChange(categoryId) {
    this.routeObj.params = {
      ...this.routeObj.params,
      category: categoryId,
      search  : null
    }

    browserHistory.push(routeObjParser(this.routeObj))
  }

  paginationHandler(page) {
    const { storeId, categoryId, keyword } = this.props.params
    const { fetchInventory } = this.props
    const targetPageNum = page.selected + 1

    this.reqParams = {
      ... this.reqParams,
      storeId,
      categoryId,
      keyword,
      page: targetPageNum
    }

    fetchInventory(this.reqParams)
  }

  render() {
    const tableHeads = [
      '配件条码', '配件名称', '配件单位',
      '当前库存', '库存建议'
    ]

    const { categoryId = '', keyword = '' } = this.props.params

    const { categoryList, inventoryData, page,
          categoryLoading, categoryError, categoryErrMsg,
          inventoryLoading, inventoryError, inventoryErrMsg } = this.props
    // react-paginate插件接受的页码为以0起始的index
    const currentPageIndex = page - 1

    return (
      <div>
        <TopTip tips={ '枫车提示：若贵店第一次销售某商品，请先使用新增商品' } />
        <SearchBox
          placeholder={ '按商品名称搜索' }
          routeKeyword={ keyword }
          onSearch={ this.onSearch }
        />
        { categoryLoading && <Loading /> }
        { categoryError && <LoadingFail errMsg={ categoryErrMsg } /> }
        { categoryList &&
          <ProductCategorySelector
            categoryId={ categoryId }
            categoryList={ categoryList }
            onSelect={ this.onCategoryChange }
          />
        }
        { categoryId &&
          <div>
            <div className={ styles.tableWrapper }>
              { inventoryLoading && <Loading /> }
              { inventoryError && <LoadingFail errMsg={ inventoryErrMsg } /> }
              { inventoryData && inventoryData.product_list.length !== 0 &&
                <table>
                  <tbody>
                    <TableHead headerList={ tableHeads } />
                    { inventoryData.product_list.map((inventory, index) => {
                      /* eslint arrow-body-style: "off" */
                      return (
                        <tr key={ index }>
                          <td>{ inventory.barcode }</td>
                          <td>{ inventory.product_name }</td>
                          <td>{ inventory.product_unit }</td>
                          <td>{ inventory.stock }</td>
                          <td>{ inventory.memo ? inventory.memo : '无' }</td>
                        </tr>
                      )
                    }) }
                  </tbody>
                </table>
              }
              { inventoryData && !inventoryData.product_list.length &&
                <NoDataTips />
              }
            </div>
            { inventoryData &&
              <Pagination
                pageNum={ parseInt(inventoryData.page_count, 10) }
                currentPage={ currentPageIndex }
                clickCallback={ this.paginationHandler }
              />
            }
          </div>
        }
      </div>
		)
  }
}

inventoryStatsView.propTypes = {
  params          : React.PropTypes.object.isRequired,
  fetchInventory  : React.PropTypes.func.isRequired,
  fetchCategory   : React.PropTypes.func.isRequired,
  categoryLoading : React.PropTypes.bool.isRequired,
  categoryError   : React.PropTypes.bool.isRequired,
  categoryErrMsg  : React.PropTypes.string,
  categoryList    : React.PropTypes.array,
  inventoryLoading: React.PropTypes.bool.isRequired,
  inventoryError  : React.PropTypes.bool.isRequired,
  inventoryErrMsg : React.PropTypes.string,
  inventoryData   : React.PropTypes.object,
  page            : React.PropTypes.number.isRequired
}

export default inventoryStatsView
