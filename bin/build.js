import webpack       from 'webpack'
import _debug        from 'debug'
import webpackConfig from '../src/configs/webpack'
import constants     from '../src/constants/globalConsts'

const debug = _debug('app:bin:build')

const webpackCompiler = (webpackConfig, compilerStats) => {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)

    compiler.run((err, stats) => {
      const jsonStats = stats.toJson()

      debug(stats.toString(compilerStats))

      if (err) {
        debug('FATAL ERROR: Webpack打包时出现致命错误', err)
        return reject(err)
      } else if (jsonStats.errors.length > 0) {
        debug('ERROR: Webpack打包时遇到以下错误')
        debug(jsonStats.errors.join('\n'))
        return reject(new Error('ERROR: Webpack打包时遇到错误'))
      } else if (jsonStats.warnings.length > 0) {
        debug('WARNING: Webpack打包时出现以下警告')
        debug(jsonStats.warnings.join('\n'))
      } else {
        debug('Webpack打包顺利完成！无错误，无警告。')
      }

      resolve(jsonStats)
    })
  })
}

;(async function () {
  try {
    debug('webpack打包开始，请稍候……')
    let compilerStats = constants.COMPILER_SETTINGS.stats
    const stats = await webpackCompiler(webpackConfig, compilerStats)
    if (stats.warnings.length) {
      debug('Webpack打包时出现警告，以 status code "1" 退出进程。')
      process.exit(1)
    }
  } catch (err) {
    debug('Webpack打包时遇到错误', err)
    debug('以 status code "1" 退出进程')
    process.exit(1)
  }
})()
