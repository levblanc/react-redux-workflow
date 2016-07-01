import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import reduxThunk     from 'redux-thunk'
import initReducers   from 'reduxStore/reducers'
import reduxLogger    from 'middleware/reduxLogger'
import ajaxMiddleware from 'middleware/ajaxMiddleware'


export default (initialState = {}, history) => {
  // ======================================================
  // 配置Middlewares
  // ======================================================
  const middlewares = [
    reduxThunk,
    ajaxMiddleware(),
    routerMiddleware(history)
  ]

  // dev tool(sourcemap) 只在 alpha 和 test 环境开启
  // logger 也做同样配置
  !__ENV_RELEASE__ && middlewares.push(reduxLogger)

  // ========================================================
  // 把Redux Developer Tools放到enhancers内
  // ========================================================
  const enhancers = []
  if (!__ENV_RELEASE__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // 初始化redux store
  // ======================================================
  const reduxStore = createStore(
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
      reduxStore.replaceReducer(initReducers)
    })
  }

  return reduxStore
}
