import { injectReducer } from '../reduxStore/reducers'

export default (store) => ({
  path: '__redux-thunk-demo/:dateRange',
  /*  异步的 getComponent 方法，只有在路由匹配时才会触发  */
  getComponent (nextState, cb) {
    /*  Webpack在打包时根据 'require.ensure' 创建断点，并嵌入异步的 module loader  */
    require.ensure([], (require) => {
      /*  Webpack 的 require callback，在打包时找到require的依赖文件  */
      let reduxThunkDemo = require('../containers/__reduxThunkDemo/demoContainer').default
      let demoDataReducer = require('../containers/__reduxThunkDemo/demoModule').default

      /*  往 redux store 中加入键值为'demoData'的reducer  */
      injectReducer(store, {
        key    : 'demoData',
        reducer: demoDataReducer
      })

      /*  返回 getComponent   */
      cb(null, reduxThunkDemo)

    /*  Webpack 打包模块文件名  */
    }, 'reduxThunkDemo')
  }
})
