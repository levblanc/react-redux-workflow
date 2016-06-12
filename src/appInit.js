import React                      from 'react'
import ReactDOM                   from 'react-dom'
import { Provider }               from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore }   from 'react-router-redux'
import createReduxStore           from 'reduxStore/createStore'
import appRoutes                  from 'routes/appRoutes'
import RedBox                     from 'redbox-react'

const store = createReduxStore({}, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
})

// ========================================================
// appInit Setup
// ========================================================
const ROOT_NODE = document.getElementById('root')

const appInit = (routerKey = null) => {
  const routes = appRoutes(store)

  ReactDOM.render(
    <Provider store={ store }>
      <Router history={ history } children={ routes } key={ routerKey } />
    </Provider>,
    ROOT_NODE
  )
}

// 开发状态下
// 使用HMR进行页面自动reload
// 使用RedBox捕捉并显示错误信息
if (__DEV__ && module.hot) {
  const renderApp = appInit
  const renderError = (error) => {
    ReactDOM.render(<RedBox error={ error } />, ROOT_NODE)
  }
  const render = () => {
    try {
      renderApp(Math.random())
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept(['routes/appRoutes'], () => render())
}

appInit()
