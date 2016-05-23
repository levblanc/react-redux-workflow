// ------------------------------------
// 启动server文件
// ------------------------------------
import _debug               from 'debug'
import path                 from 'path'
import express              from 'express'
import webpack              from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHMRMiddleware from 'webpack-hot-middleware'
import historyApiFallback   from 'connect-history-api-fallback'
import webpackConfig        from '../src/configs/webpack'
import globalConfig         from '../src/configs/global'

let debug = _debug('app:server:init')
let app   = express()

let isDevelopment = ( globalConfig.ENV === 'development' ||
                      globalConfig.ENV === 'mockup-dev' )

debug('server启动中……')

if(isDevelopment){
  debug('server读取开发环境配置')

  if(globalConfig.ENV === 'mockup-dev'){
    debug('将使用Mockup Api进行开发')
  }else{
    debug('将使用206数据进行开发')
  }

  let compiler = webpack(webpackConfig)
  let devMiddleware = webpackDevMiddleware(compiler, globalConfig.COMPILER_SETTINGS)

  // !!! historyApiFallback !!!
  // 一定要在 devMiddleware 前使用
  // 否则react router的Html5 History Api无法使用
  // 实例：路由从首页跳转第二个页面后，刷新第二个页面，就会白屏
  app.use(historyApiFallback({ verbose: false }))

  app.use(devMiddleware)
  app.use(webpackHMRMiddleware(compiler))

  // 使用 historyApiFallback 之后
  // 下面这段代码就算删掉也不会出问题
  // ???
  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(globalConfig.TARGET_FILE_DIR, 'index.html'));
  // });
}else{
  debug('server读取生产环境配置')

  app.use(express.static(globalConfig.TARGET_FILE_DIR))
  app.get('*', (req, res) => {
    res.sendFile(path.join(globalConfig.TARGET_FILE_DIR, 'index.html'));
  });
}

app.listen(globalConfig.SERVER_PORT, (err) => {
  if(err) console.error('SERVER ERROR: ' + err)
  debug(`server正从 ${globalConfig.TARGET_FILE_DIR} 文件夹读取文件`)
  debug(`server@${globalConfig.SERVER_URI}已启动`)
});

