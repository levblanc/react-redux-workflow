import statsCategory  from './inventoryStats/category'
import statsInventory from './inventoryStats/inventory'

import inStockInventory  from './inventoryInStock/inventory'
import outStockInventory from './inventoryOutStock/inventory'

import incomeList        from './businessIncome/income'
import incomeDetailList  from './businessIncomeDetail/detail'
import incomeDetailOrder from './incomeDetailOrder/order'

import summaryData from './businessSummary/summary'
import recordData  from './businessWorkRecord/record'
import cashCount   from './businessCashCount/cash'
import goodsCount  from './businessGoodsCount/goods'

import profileList   from './clientProfileList/list'
import profileDetail from './clientProfileList/detail'

import recordList from './remindRecord/record.json'

export const inventoryStats = {
  category: statsCategory,
  inventory: statsInventory
}

export const inventoryInStock = {
  inventory: inStockInventory
}

export const inventoryOutStock = {
  inventory: outStockInventory
}

export const businessIncome = {
  income: incomeList,
  detail: incomeDetailList,
  order : incomeDetailOrder
}

export const businessSummary = {
  summary: summaryData
}

export const businessWorkRecord = {
  record: recordData
}

export const businessCashCount = {
  cash: cashCount
}

export const businessGoodsCount = {
  goods: goodsCount
}

export const clientProfileList = {
  list  : profileList,
  detail: profileDetail
}

export const remindRecord = {
  list: recordList
}
