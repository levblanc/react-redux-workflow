import { injectReducer } from '../reduxStore/reducers'

export default (store) => ({
  path: 'client-profile-list',
  /*  异步的 getComponent 方法，只有在路由匹配时才会触发  */
  getComponent (nextState, cb) {
    /*  Webpack在打包时根据 'require.ensure' 创建断点，并嵌入异步的module loader  */
    require.ensure([], (require) => {
      /*  Webpack 的 require callback，在打包时找到require的依赖文件  */
      let profileList = require('../containers/clientProfileList/profileListContainer').default

      // let profileListReducer = require('../containers/clientProfileList/profileListModule').default

      /*  往redux store中加入键值为'profileList'的reducer  */
      // injectReducer(store, { key: 'profileList', profileListReducer })

      /*  返回 getComponent   */
      cb(null, profileList)

    /*  Webpack 打包模块文件名  */
    }, 'profileList')
  }
})
