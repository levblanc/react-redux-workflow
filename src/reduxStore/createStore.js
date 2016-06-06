import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import reduxThunk     from 'redux-thunk'
import initReducers   from 'reduxStore/reducers'
import reduxLogger    from 'middleware/reduxLogger'
import ajaxMiddleware from 'middleware/ajaxMiddleware'
import constants      from 'constants'


export default (initialState = {}, history) => {
  // ======================================================
  // 配置Middlewares
  // ======================================================
  let middlewares = [
    reduxThunk,
    ajaxMiddleware,
    routerMiddleware(history)
  ]

  // dev tool(sourcemap) 只在 alpha 和 test 环境开启
  // logger 也做同样配置
  !__ENV_RELEASE__ && middlewares.push(reduxLogger)

  // ========================================================
  // 把Redux Developer Tools放到enhancers内
  // ========================================================
  let enhancers = []
  if (!__ENV_RELEASE__) {
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
