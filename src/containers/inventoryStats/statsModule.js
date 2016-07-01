import {  FETCH_CATEGORY,
          FETCH_CATEGORY_SUCCESS,
          FETCH_CATEGORY_ERROR,
          FETCH_INVENTORY,
          FETCH_INVENTORY_SUCCESS,
          FETCH_INVENTORY_ERROR } from 'actionTypes'

// ============================
// Actions
// ============================
// 加载商品类型列表
export const fetchCategory = ({ storeId }) => ({
  types: [
    FETCH_CATEGORY,
    FETCH_CATEGORY_SUCCESS,
    FETCH_CATEGORY_ERROR,
  ],
  reqApiKey: 'inventoryCategory',
  mockupApi: 'inventoryStats/category',
  reqParams: {
    sstore_id: storeId
  }
})


// 选中一个商品类型，加载它的库存列表
// 或
// 输入关键词，搜索已选中的商品类型下对应的库存
export const fetchInventory = ({ storeId, categoryId, keyword = '', page }) => ({
  types: [
    FETCH_INVENTORY,
    FETCH_INVENTORY_SUCCESS,
    FETCH_INVENTORY_ERROR
  ],
  reqApiKey: 'inventoryStats',
  mockupApi: 'inventoryStats/inventory',
  reqParams: {
    sstore_id   : storeId,
    type_id     : categoryId,
    page_size   : 10,
    product_name: keyword,
    page
  }
})


// ============================
// Reducer
// ============================

const initialState = {
  categoryLoading: false,
  categoryError  : false,
  categoryErrMsg : null,
  categoryList   : null,

  inventoryLoading: false,
  inventoryError  : false,
  inventoryErrMsg : null,
  inventoryData   : null,

  page   : 1,
  keyword: ''
}

const inventoryStatsReducer = (state = initialState, action) => {
  const categoryData = []
  let tmpArr = null

  switch (action.type) {
    case FETCH_CATEGORY:
      return {
        ...state,
        categoryLoading: true,
        categoryError  : false,
        categoryErrMsg : null,
        categoryList   : null
      }
    case FETCH_CATEGORY_SUCCESS:
      // 把数据整理成二维数组，每六个category放到一个小数组里面
      // 方便在页面中使用的时候循环成每六个一行
      action.resData.type_list.forEach((category, index, array) => {
        index % 6 === 0 && (tmpArr = [])

        tmpArr.push(category)

        if (index % 6 === 5 || index === array.length - 1) {
          categoryData.push(tmpArr)
        }
      })

      return {
        ...state,
        categoryLoading: false,
        categoryError  : false,
        categoryErrMsg : null,
        categoryList   : categoryData
      }
    case FETCH_CATEGORY_ERROR:
      return {
        ...state,
        categoryLoading: false,
        categoryError  : true,
        categoryErrMsg : action.err,
        categoryList   : null
      }
    case FETCH_INVENTORY:
      return {
        ...state,
        inventoryLoading: true,
        inventoryError  : false,
        inventoryErrMsg : null,
        inventoryData   : null
      }
    case FETCH_INVENTORY_SUCCESS:
      return {
        ...state,
        inventoryLoading: false,
        inventoryError  : false,
        inventoryErrMsg : null,
        inventoryData   : action.resData,
        page            : action.reqParams.page
      }
    case FETCH_INVENTORY_ERROR:
      return {
        ...state,
        inventoryLoading: false,
        inventoryError  : true,
        inventoryErrMsg : action.err,
        inventoryData   : null,
        page            : action.reqParams.page
      }
    default:
      return state
  }
}

export default inventoryStatsReducer
