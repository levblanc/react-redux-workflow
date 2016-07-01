import globalConfig    from '../configs/global'
import { updateToken } from 'reduxStore/authentication'

import appLayoutView   from 'layout/appLayoutView'
import homeView        from 'containers/home/homeView'

import inventoryStats    from './inventoryStats'

const { routeBasePath } = globalConfig

const appRoutes = (store) => {
  const requireAuth = (nextState, replace, cb) => {
    const globalState   = store.getState()
    const locationQuery = nextState.location.query

    store.dispatch(updateToken(globalState, locationQuery))
    cb()
  }

  return {
    path      : routeBasePath,
    component : appLayoutView,
    indexRoute: {
      component: homeView
    },
    childRoutes: [
      inventoryStats(store, requireAuth)
    ]
  }
}


export default appRoutes
