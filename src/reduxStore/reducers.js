import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import authReducer from './authentication'

export const initReducers = (asyncReducers) => combineReducers({
  router  : routerReducer,
  ssmsAuth: authReducer,
  ... asyncReducers
})

export const injectReducer = (store, { key, reducer }) => {
  const asyncReducersObj = store.asyncReducers
  asyncReducersObj[key] = reducer
  store.replaceReducer(initReducers(asyncReducersObj))
}

export default initReducers
