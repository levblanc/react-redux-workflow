import {  FETCH_CATEGORY,
          FETCH_CATEGORY_SUCCESS,
          FETCH_CATEGORY_ERROR,
          FETCH_INVENTORY,
          FETCH_INVENTORY_SUCCESS,
          FETCH_INVENTORY_ERROR } from 'actionTypes'

import {
  fetchCategory, fetchInventory, default as inventoryStatsReducer
} from 'containers/inventoryStats/statsModule'

import basicActionTest from 'testUtils/basicActionTest'
import basicReducerTest from 'testUtils/basicReducerTest'

import categoryMockData from 'apiMock/inventoryStats/category'
import inventoryMockData from 'apiMock/inventoryStats/inventory'

describe('inventory stats module', () => {
  describe('[Action] fetchCategory', () => {
    const params = { storeId: 1 }
    const typesArr = [
      FETCH_CATEGORY,
      FETCH_CATEGORY_SUCCESS,
      FETCH_CATEGORY_ERROR
    ]
    basicActionTest(fetchCategory, params, typesArr)

    it('返回的object中reqApiKey应为inventoryCategory', () => {
      expect(fetchCategory(params))
        .to.have.property('reqApiKey', 'inventoryCategory')
    })

    it('返回的object中reqParams.sstore_id应赋值为传入参数中的storeId', () => {
      expect(fetchCategory(params))
        .to.have.deep.property('reqParams.sstore_id', 1)
    })
  })

  describe('[Action] fetchInventory', () => {
    const params = {
      storeId : 1,
      categoryId: 2,
      page: 1
    }

    const typesArr = [
      FETCH_INVENTORY,
      FETCH_INVENTORY_SUCCESS,
      FETCH_INVENTORY_ERROR
    ]

    basicActionTest(fetchInventory, params, typesArr)

    it('返回的object中reqApiKey应为inventoryStats', () => {
      expect(fetchInventory(params))
        .to.have.property('reqApiKey', 'inventoryStats')
    })

    it('返回的object中reqParams.sstore_id应赋值为传入参数中的storeId', () => {
      expect(fetchInventory(params))
        .to.have.deep.property('reqParams.sstore_id', params.storeId)
    })

    it('返回的object中reqParams.type_id应赋值为传入参数中的categoryId', () => {
      expect(fetchInventory(params))
        .to.have.deep.property('reqParams.type_id', params.categoryId)
    })

    it('传入参数中的没有keyword时，返回的object中reqParams.product_name为null', () => {
      expect(fetchInventory(params))
        .to.have.deep.property('reqParams.product_name', null)
    })

    it('传入参数中的有keyword时，返回的object中reqParams.product_name与keyword一致', () => {
      params.keyword = 'test keyword'
      expect(fetchInventory(params))
        .to.have.deep.property('reqParams.product_name', params.keyword)
    })

    it('返回的object中reqParams.page_size为10', () => {
      expect(fetchInventory(params))
        .to.have.deep.property('reqParams.page_size', 10)
    })

    it('返回的object中reqParams.page应赋值为传入参数中的page', () => {
      expect(fetchInventory(params))
        .to.have.deep.property('reqParams.page', params.page)
    })
  })

  describe('[Reducer] inventoryStatsReducer', () => {
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

    basicReducerTest(inventoryStatsReducer, initialState)

    const baseCategoryAction = {
      reqApiKey: 'inventoryCategory',
      mockupApi: 'inventoryStats/category',
      reqParams: {
        sstore_id: 1
      }
    }

    it('正确处理[action type] FETCH_CATEGORY', () => {
      baseCategoryAction.type = FETCH_CATEGORY

      const testState = inventoryStatsReducer(initialState, baseCategoryAction)
      const expectedState = {
        ... initialState,
        categoryLoading: true,
        categoryError  : false,
        categoryErrMsg : null,
        categoryList   : null
      }

      expect(testState).to.deep.equal(expectedState)
    })

    it('正确处理[action type] FETCH_CATEGORY_SUCCESS', () => {
      baseCategoryAction.type = FETCH_CATEGORY_SUCCESS
      baseCategoryAction.resData = categoryMockData.data

      const testState = inventoryStatsReducer(initialState, baseCategoryAction)

      expect(testState).to.have.property('categoryLoading').that.equals(false)
      expect(testState).to.have.property('categoryError').that.equals(false)
      expect(testState).to.have.property('categoryErrMsg').that.equals(null)
      expect(testState).to.have.property('categoryList')
        .that.is.an('array')
        .with.deep.property('[0]')
        .that.have.length.below(7)
    })

    it('正确处理[action type] FETCH_CATEGORY_ERROR', () => {
      baseCategoryAction.type = FETCH_CATEGORY_ERROR

      const testState = inventoryStatsReducer(initialState, baseCategoryAction)

      expect(testState).to.have.property('categoryLoading').that.equals(false)
      expect(testState).to.have.property('categoryError').that.equals(true)
      expect(testState).to.have.property('categoryErrMsg').that.equals(undefined)
      expect(testState).to.have.property('categoryList').that.equals(null)
    })

    const baseInventoryAction = {
      reqApiKey: 'inventoryStats',
      mockupApi: 'inventoryStats/inventory',
      reqParams: {
        sstore_id   : 1,
        type_id     : 2,
        page_size   : 10,
        product_name: 'test keyword',
        page        : 1
      }
    }

    it('正确处理[action type] FETCH_INVENTORY', () => {
      baseInventoryAction.type = FETCH_INVENTORY

      const testState = inventoryStatsReducer(initialState, baseInventoryAction)
      const expectedState = {
        ... initialState,
        inventoryLoading: true,
        inventoryError  : false,
        inventoryErrMsg : null,
        inventoryData   : null
      }

      expect(testState).to.deep.equal(expectedState)
    })

    it('正确处理[action type] FETCH_INVENTORY_SUCCESS', () => {
      baseInventoryAction.type = FETCH_INVENTORY_SUCCESS
      baseInventoryAction.resData = inventoryMockData.data
      const testState = inventoryStatsReducer(initialState, baseInventoryAction)
      const expectedState = {
        ... initialState,
        inventoryLoading: false,
        inventoryError  : false,
        inventoryErrMsg : null,
        inventoryData   : inventoryMockData.data,
        page            : 1
      }

      expect(testState).to.deep.equal(expectedState)
    })

    it('正确处理[action type] FETCH_INVENTORY_ERROR', () => {
      baseInventoryAction.type = FETCH_INVENTORY_ERROR

      const testState = inventoryStatsReducer(initialState, baseInventoryAction)

      expect(testState).to.have.property('inventoryLoading').that.equals(false)
      expect(testState).to.have.property('inventoryError').that.equals(true)
      expect(testState).to.have.property('inventoryErrMsg').that.equals(undefined)
      expect(testState).to.have.property('inventoryData').that.equals(null)
      expect(testState).to.have.property('page').that.equals(1)
    })
  })
})
