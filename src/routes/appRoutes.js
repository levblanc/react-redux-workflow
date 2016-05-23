import home from '../containers/home/home.view'

export const appRoutes = (store) => ({
  path: '/',
  component: home,
  indexRoute: home,
  childRoutes: []
})

export default appRoutes
