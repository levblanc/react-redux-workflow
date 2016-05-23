// ------------------------------------
// 启动server文件
// ------------------------------------

import _debug               from 'debug'
import path                 from 'path'
import express              from 'express'
import webpack              from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHMRMiddleware from 'webpack-hot-middleware'
import webpackConfig        from '../configs/webpack'
import globalConfig         from '../configs/global'


let debug = _debug('app:server:init')
let app = express();
let isDevelopment = globalConfig.ENV === 'development';

debug('server启动中……')

if(isDevelopment){
  debug('server读取开发环境配置')

  let compiler = webpack(webpackConfig);
  let devMiddleware = webpackDevMiddleware(compiler, {
    log       : console.log,
    hot       : true,
    headers   : globalConfig.COMPILER_HEADERS,
    publicPath: globalConfig.COMPILER_PUBLIC_PATH,
    heartbeat : globalConfig.COMPILER_HEARTBEAT,
    quiet     : globalConfig.COMPILER_QUIET,
    noInfo    : globalConfig.COMPILER_QUIET,
    stats     : globalConfig.COMPILER_STATS
  })

  app.use(devMiddleware);
  app.use(webpackHMRMiddleware(compiler));

  app.get('*', (req, res) => {
      res.sendFile(path.join(globalConfig.TARGET_FILE_DIR, 'index.html'));
  });
}else{
  debug('server读取生产环境配置')

  app.use(express.static(globalConfig.TARGET_FILE_DIR));
  app.get('*', (req, res) => {
      res.sendFile(path.join(globalConfig.TARGET_FILE_DIR, 'index.html'));
  });
}

app.listen(globalConfig.SERVER_PORT, (err) => {
  if(err) console.error('server error: ' + err);
  debug(`server正从 ${globalConfig.TARGET_FILE_DIR} 文件夹读取文件`)
  debug(`server@${globalConfig.HOST_URI}已启动`)
});
