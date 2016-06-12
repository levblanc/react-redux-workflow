import globalConfig from '../configs/global'

import appLayoutView from 'layout/appLayoutView'
import homeView      from 'containers/home/homeView'

import clientProfileList   from './clientProfileList'
import clientProfileDetail from './clientProfileDetail'
import clientProfileEdit   from './clientProfileEdit'

import inventoryStats    from './inventoryStats'
import inventoryInStock  from './inventoryInStock'
import inventoryOutStock from './inventoryOutStock'

import businessSummary      from './businessSummary'
import businessGoodsCount   from './businessGoodsCount'
import businessCashCount    from './businessCashCount'
import businessIncome       from './businessIncome'
import businessIncomeDetail from './businessIncomeDetail'
import businessWorkRecord   from './businessWorkRecord'

import remindRecord from './remindRecord'

const { routeBasePath } = globalConfig

const appRoutes = (store) => ({
  path       : routeBasePath,
  component  : appLayoutView,
  indexRoute : {
    component: homeView
  },
  childRoutes: [
    clientProfileList(store),
    clientProfileDetail(store),
    clientProfileEdit(store),

    inventoryStats(store),
    inventoryInStock(store),
    inventoryOutStock(store),

    businessSummary(store),
    businessCashCount(store),
    businessGoodsCount(store),
    businessIncome(store),
    businessIncomeDetail(store),
    businessWorkRecord(store),

    remindRecord(store)
  ]
})

export default appRoutes
