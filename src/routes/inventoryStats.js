import { injectReducer } from 'reduxStore/reducers'

const webpackEnsure = (store, cb) => {
  /*  Webpack在打包时根据 'require.ensure' 创建断点，并嵌入异步的module loader  */
  require.ensure([], (require) => {
    /*  Webpack 的 require callback，在打包时找到require的依赖文件  */
    const inventoryStats = require('containers/inventoryStats/statsContainer').default

    const inventoryStatsReducer = require('containers/inventoryStats/statsModule').default

    /*  往redux store中加入键值为'inventoryStats'的reducer  */
    injectReducer(store, {
      key    : 'inventoryStats',
      reducer: inventoryStatsReducer
    })

    /*  返回 getComponent   */
    cb(null, inventoryStats)

  /*  Webpack 打包模块文件名  */
  }, 'inventoryStats')
}

export default (store) => ({
  path: 'inventory-stats',
  /*  异步的 getComponent 方法，只有在路由匹配时才会触发  */
  getComponent(nextState, cb) {
    webpackEnsure(store, cb)
  },

  childRoutes: [
    {
      path: 'category/:categoryId',
      getComponent(nextState, cb) {
        webpackEnsure(store, cb)
      }
    },
    {
      path: 'category/:categoryId/search/:keyword',
      getComponent(nextState, cb) {
        webpackEnsure(store, cb)
      }
    }
  ]
})
