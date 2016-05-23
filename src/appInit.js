import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createReduxStore from './reduxStore/createStore'
import globalConfig from '../configs/global'

let isDevelopment = globalConfig.ENV === 'development'

let store = createReduxStore({}, browserHistory)
let history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
})


// ========================================================
// appInit Setup
// ========================================================
const ROOT_NODE = document.getElementById('root')

let appInit = (routerKey = null) => {
  const routes = require('./routes/appRoutes').default(store)

  ReactDOM.render(
    <Provider store={store}>
        <Router history={history} children={routes} key={routerKey} />
    </Provider>,
    ROOT_NODE
  )
}

// 开发状态下
// 使用HMR进行页面自动reload
// 使用RedBox捕捉并显示错误信息
if (isDevelopment && module.hot) {
  let renderApp = appInit
  let renderError = (error) => {
    let RedBox = require('redbox-react')

    ReactDOM.render(<RedBox error={error} />, ROOT_NODE)
  }
  let render = () => {
    try {
      renderApp(Math.random())
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept(['./routes/appRoutes'], () => render())
}

appInit()
