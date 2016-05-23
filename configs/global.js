// ------------------------------------
// 全局变量 配置文件
// ------------------------------------

import path from 'path'
import _debug from 'debug'

let debug = _debug('app:global:config')

debug('全局变量配置装弹')

const globalConfig = {
  ENV : process.env.NODE_ENV || 'development',
  // ----------------------------------
  // 项目根路径
  // ----------------------------------
  DIR_ROOT: path.resolve(__dirname, '..'),

  // ----------------------------------
  // Server配置
  // ----------------------------------
  SERVER_HOST : 'localhost',
  SERVER_PORT : process.env.PORT || 8080,

  // ----------------------------------
  // Compiler配置
  // ----------------------------------
  COMPILER_DEVTOOL    : 'source-map',
  COMPILER_PUBLIC_PATH: '/',
  COMPILER_HEADERS    : {'Access-Control-Allow-Origin': '*'},
  COMPILER_HEARTBEAT  : 10 * 1000,
  COMPILER_QUIET      : false,
  COMPILER_STATS      : {
    colors      : true,
    chunks      : false,
    chunkModules: false,
    modules     : false
  },
  COMPILER_VENDOR : [
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux',
    'redux-thunk'
  ],
}

globalConfig.HOST_URI = `http://${globalConfig.SERVER_HOST}:${globalConfig.SERVER_PORT}`
globalConfig.DIR_SRC = path.resolve(globalConfig.DIR_ROOT, 'src')
globalConfig.DIR_DIST = path.resolve(globalConfig.DIR_ROOT, 'dist')
globalConfig.TARGET_FILE_DIR = globalConfig.ENV === 'development'
                              ? globalConfig.DIR_SRC
                              : globalConfig.DIR_DIST

// ------------------------------------
// 检查必要的依赖包
// ------------------------------------
const pkg = require('../package.json')

globalConfig.COMPILER_VENDOR = globalConfig.COMPILER_VENDOR
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true

    debug(
      `在package.json的NPM安装包列表中没有找到 "${dep}" ` +
      `最后的打包文件中将不会有这个依赖包的内容` +
      `请考虑将它从 global.globalConfig.js 的 COMPILER_VENDOR 中移除`
    )
  })

export default globalConfig
