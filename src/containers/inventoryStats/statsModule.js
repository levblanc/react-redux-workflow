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
export const fetchCategory = () => {
  return {
    types: [
      FETCH_CATEGORY,
      FETCH_CATEGORY_SUCCESS,
      FETCH_CATEGORY_ERROR,
    ],
    requestApi: 'inventoryStats/category'
  }
}

// 选中一个商品类型，加载它的库存列表
// 或
// 输入关键词，搜索已选中的商品类型下对应的库存
export const fetchInventory = (categoryId, keyword = '', page) => {
  return {
    types: [
      FETCH_INVENTORY,
      FETCH_INVENTORY_SUCCESS,
      FETCH_INVENTORY_ERROR
    ],
    requestApi: 'inventoryStats/inventory',
    reqParams: {
      category_id: categoryId,
      page_num: 10,
      keyword, page
    }
  }
}

const initialState = {
  categoryReady: false,
  categoryError: false,
  categoryList : [],
  categoryId   : null,

  inventoryReady: false,
  inventoryError: false,
  inventoryList : [],

  page   : 1,
  keyword: ''
}

// ============================
// Reducer
// ============================
const inventoryStatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY:
      return {
        ...state,
        categoryReady: false
      }
    case FETCH_CATEGORY_SUCCESS:
      // 把数据整理成二维数组，每六个category放到一个小数组里面
      // 方便在页面中使用的时候循环成六个一行
      let categoryData = []
      let tmpArr = null

      action.resData.forEach((category, index, array) => {
        if(index % 6 === 0){
          tmpArr = []
          tmpArr.push(category)
        } else if ( (index % 6 === 5) || (index === array.length - 1) ) {
          tmpArr.push(category)
          categoryData.push(tmpArr)
        }else{
          tmpArr.push(category)
        }
      })

      return {
        ...state,
        categoryReady: true,
        categoryError: false,
        categoryList : categoryData
      }
    case FETCH_CATEGORY_ERROR:
      return {
        ...state,
        categoryReady: true,
        categoryError: true
      }
    case FETCH_INVENTORY:
      return {
        ...state,
        page          : action.reqParams.page,
        inventoryReady: false
      }
    case FETCH_INVENTORY_SUCCESS:
      return {
        ...state,
        page          : action.reqParams.page,
        inventoryReady: true,
        inventoryError: false,
        inventoryList : action.resData
      }
    case FETCH_INVENTORY_ERROR:
      return {
        ...state,
        categoryId    : action.reqParams.category_id,
        page          : action.reqParams.page,
        inventoryReady: true,
        inventoryError: true
      }
    default:
      return state
  }
}

export default inventoryStatsReducer
