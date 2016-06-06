import globalConfig from '../configs/global'

import appLayoutView from 'layout/appLayoutView'
import homeView      from 'containers/home/homeView'

import inventoryStats    from './inventoryStats'


let { routeBasePath } = globalConfig

const appRoutes = (store) => ({
  path       : routeBasePath,
  component  : appLayoutView,
  indexRoute : {
    component: homeView
  },
  childRoutes: [
    inventoryStats(store)
  ]
})

export default appRoutes
