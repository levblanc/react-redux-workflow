import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import reduxThunk from 'redux-thunk'
import initReducers from './reducers'
import globalConfig from '../../configs/global'

export default (initialState = {}, history) => {
  // ======================================================
  // 配置Middlewares
  // ======================================================
  let middlewares = [reduxThunk, routerMiddleware(history)]

  // ========================================================
  // 把Redux Developer Tools放到enhancers内
  // ========================================================
  let enhancers = []
  if (globalConfig.ENV === 'development') {
    let devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // 初始化redux store
  // ======================================================
  let reduxStore = createStore(
    initReducers(),
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  )
  reduxStore.asyncReducers = {}

  // ======================================================
  // HMR设置，让reducer变化时，页面可以自动reload
  // ======================================================
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      let reducers = require('./reducers').default
      reduxStore.replaceReducer(reducers)
    })
  }

  return reduxStore
}
