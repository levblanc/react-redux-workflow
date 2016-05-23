import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export const initReducers = (asyncReducers) => {
  return combineReducers({
    // 添加同步的reducers
    router: routerReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(initReducers(store.asyncReducers))
}

export default initReducers
