import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export const initReducers = (asyncReducers) => combineReducers({
  router: routerReducer,
  ... asyncReducers
})

export const injectReducer = (store, { key, reducer }) => {
  const asyncReducerObj = {}
  asyncReducerObj[key] = reducer

  Object.assign(store, {
    asyncReducers: asyncReducerObj
  })

  store.replaceReducer(initReducers(store.asyncReducers))
}

export default initReducers
