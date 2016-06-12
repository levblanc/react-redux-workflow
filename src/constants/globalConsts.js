// ====================================
// 全局常量 配置文件
// ====================================

import path   from 'path'
import _debug from 'debug'
import argv   from 'minimist-argv'

const debug = _debug('app:global:config')

debug('装填全局常量配置')

const constants = {
  NODE_ENV : process.env.NODE_ENV,
  // ====================================
  // 项目根路径
  // ====================================
  DIR_ROOT: path.resolve(__dirname, '../..'),

  // ====================================
  // Dev Server配置
  // ====================================
  SERVER_HOST : 'localhost',
  SERVER_PORT : process.env.PORT || 8080,

  // ====================================
  // 线上环境host和API配置
  // ====================================
  ENV_ALPHA: {
    host     : '192.168.1.206',
    apiPrefix: 'http://192.168.1.205:8780/client'
  },
  ENV_BETA: {
    host     : 'test.ssms.carisok.com',
    apiPrefix: 'http://test.ssms.carisok.com'
  },
  ENV_RELEASE: {
    host     : 'ssms.carisok.com',
    apiPrefix: 'http://ssms.carisok.com'
  },

  // ====================================
  // Webpack Compiler配置
  // ====================================
  COMPILER_SETTINGS: {
    hot        : true,
    headers    : { 'Access-Control-Allow-Origin': '*' },
    heartbeat  : 10 * 1000,
    quiet      : false,
    noInfo     : false,
    stats      : {
      colors      : true,
      chunks      : false,
      chunkModules: false,
      modules     : false,
      children    : false
    }
  },
  COMPILER_VENDORS : [
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux',
    'redux-thunk'
  ]
}

const isDevelopment = (constants.NODE_ENV !== 'release' &&
                      constants.NODE_ENV !== 'mockup-release')

// 根据npm命令参数决定是否强制使用某个环境的接口数据
if (argv.api) {
  debug(`开发时将强制使用 ${argv.api} 环境接口数据`)
  constants.FORCE_API = argv.api
}

// 打包好的文件需要放的目标环境(alpha或release)
if (argv.env) {
  debug(`Webpack打包目标环境 COMPILE_ENV 为 ${argv.env}`)
  constants.COMPILE_ENV = argv.env
}

// 在本地开发环境、线上alpha、beta环境打开sourcemap
if (isDevelopment || (argv.env && argv.env !== 'release')) {
  constants.COMPILER_DEVTOOL = 'eval-cheap-module-source-map'
}

constants.COMPILER_SETTINGS.publicPath = constants.COMPILE_ENV === 'alpha' ? '/ssms/' : '/'

constants.SERVER_URI      = `http://${constants.SERVER_HOST}:${constants.SERVER_PORT}`
constants.DIR_SRC         = path.resolve(constants.DIR_ROOT, 'src')
constants.DIR_DIST        = path.resolve(constants.DIR_ROOT, 'dist')
constants.TARGET_FILE_DIR = isDevelopment ? constants.DIR_SRC : constants.DIR_DIST
constants.WEBPACK_DEFINE  = {
  'process.env': {
    NODE_ENV: isDevelopment ?
              JSON.stringify('development') :
              JSON.stringify('production')
  },
  __USE_MOCKUP_API__: (constants.NODE_ENV === 'mockup-dev' ||
                        constants.NODE_ENV === 'mockup-release'),
  // 用于判断是在本地开发环境，还是线上环境
  __DEV__           : isDevelopment,
  // 用于判断目标代码会放哪个线上环境
  __ENV_ALPHA__     : argv.env === 'alpha',
  __ENV_BETA__      : argv.env === 'beta',
  __ENV_RELEASE__   : argv.env === 'release'
}

debug(`NODE_ENV为 ${constants.NODE_ENV}`)
debug(`webpack publicPath 设置为 ${constants.COMPILER_SETTINGS.publicPath}`)
debug(`webpack devtool 设置为 ${constants.COMPILER_DEVTOOL}`)

export default constants
