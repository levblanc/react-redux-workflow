import React              from 'react'
import styles             from './stats.styl'
import { browserHistory } from 'react-router'
import routeObjParser     from 'utils/routeObjParser'

import Loading                 from 'components/loading/loadingView'
import LoadingFail             from 'components/loading/loadingFailView'
import SearchBox               from 'components/searchBox/searchBoxView'
import ProductCategorySelector from 'components/productCategorySelector/selectorView'
import TopTip                  from 'components/topTip/tip'
import Pagination              from 'components/pagination/paginationView'


const tableHeads = [
  '配件条码',
  '配件名称',
  '配件单位',
  '当前库存',
  '库存建议'
]

class inventoryStatsView extends React.Component {
  constructor(props) {
    super(props)

    this.onSearch              = this.onSearch.bind(this)
    this.categorySelectHandler = this.categorySelectHandler.bind(this)
    this.paginationHandler     = this.paginationHandler.bind(this)
  }

  componentDidMount() {
    const { fetchCategory, fetchInventory } = this.props
    const { categoryId, keyword } = this.props.params

    fetchCategory()
    categoryId && fetchInventory(categoryId, keyword, 1)
  }

  onSearch(keyword) {
    const { categoryId } = this.props.params
    const { fetchInventory } = this.props

    const routeObj = {
      path: 'inventory-stats',
      childRoutes: {
        category: categoryId,
        search  : keyword
      }
    }

    if (!categoryId) {
      alert('请先选择一个商品类目')
      return
    }

    fetchInventory(categoryId, keyword, 1)
    browserHistory.push(routeObjParser(routeObj))
  }

  categorySelectHandler(categoryId) {
    const { fetchInventory } = this.props
    const routeObj = {
      path: 'inventory-stats',
      childRoutes: {
        category: categoryId
      }
    }

    fetchInventory(categoryId, '', 1)
    browserHistory.push(routeObjParser(routeObj))
  }

  paginationHandler(page) {
    const { categoryId, keyword } = this.props.params
    const { fetchInventory } = this.props
    const targetPageNum = page.selected + 1

    fetchInventory(categoryId, keyword, targetPageNum)
  }

  render() {
    const { categoryId, keyword } = this.props.params

    const { categoryList, inventoryList, page,
          categoryReady, categoryError,
          inventoryReady, inventoryError } = this.props
    // react-paginate插件接受的页码为以0起始的index
    const currentPageIndex = page - 1

    return (
      <div>
        <TopTip tips={ '枫车提示：若贵店第一次销售某商品，请先使用新增商品' } />
        <SearchBox
          placeholder={ '按商品名称搜索' }
          routeKeyword={ keyword || '' }
          onSearch={ this.onSearch }
        />
        { !categoryReady && <Loading /> }
        { categoryError && <LoadingFail /> }
        { categoryReady &&
          <ProductCategorySelector
            categoryId={ categoryId || '' }
            categoryList={ categoryList }
            onSelect={ this.categorySelectHandler }
          />
        }
        { categoryReady && categoryId &&
          <div>
            <div className={ styles.tableWrapper }>
              { !inventoryReady && <Loading /> }
              { inventoryError && <LoadingFail /> }
              <table>
                <tbody>
                  <tr>
                    { tableHeads.map((th, index) => <th key={ index }>{ th }</th>) }
                  </tr>
                  { inventoryReady && inventoryList.map((inventory, index) => {
                    /* eslint arrow-body-style: "off" */
                    return (
                      <tr key={ index }>
                        <td>{ `${inventory.barcode}${categoryId}` }</td>
                        <td>{ `${inventory.product_name}${index}` }</td>
                        <td>{ inventory.product_unit }</td>
                        <td>{ `${inventory.stock}${page}` }</td>
                        <td>{ `${keyword || inventory.memo}` }</td>
                      </tr>
                    )
                  }) }
                </tbody>
              </table>
            </div>
            <Pagination
              pageNum={ 10 }
              currentPage={ currentPageIndex }
              clickCallback={ this.paginationHandler }
            />
          </div>
        }
      </div>
		)
  }
}

inventoryStatsView.propTypes = {
  params        : React.PropTypes.object.isRequired,
  fetchInventory: React.PropTypes.func.isRequired,
  fetchCategory : React.PropTypes.func.isRequired,
  page          : React.PropTypes.number.isRequired,
  categoryReady : React.PropTypes.bool.isRequired,
  categoryError : React.PropTypes.bool.isRequired,
  categoryList  : React.PropTypes.array.isRequired,
  inventoryReady: React.PropTypes.bool.isRequired,
  inventoryError: React.PropTypes.bool.isRequired,
  inventoryList : React.PropTypes.array.isRequired
}

export default inventoryStatsView
