import appLayoutView from '../layout/appLayoutView'
import homeView from '../containers/home/homeView'

import clientProfileList from './clientProfileList'
import __demoDateRange   from './__demoDateRange'
import __demoSearch      from './__demoSearch'

const appRoutes = (store) => ({
  path       : '/',
  component  : appLayoutView,
  indexRoute : {
    component: homeView
  },
  childRoutes: [
    clientProfileList(store),
    __demoDateRange(store),
    __demoSearch(store)
  ]
})

export default appRoutes
