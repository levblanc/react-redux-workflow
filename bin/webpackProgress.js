import _debug         from 'debug'
import ProgressPlugin from 'webpack/lib/ProgressPlugin'

const debug = _debug('app:webpack:build')

const webpackProgress = (compiler) => {
  compiler.apply(new ProgressPlugin((percentage, msg) => {
    const progress = Math.floor(percentage * 100) + '%'
    const outputMsg = '  ⏰  >>>>>> ' + progress + ' ' + msg + '\r'

    if (percentage === 0) {
        debug('🚀  webpack打包开始，请稍候……')
    } else if (msg.indexOf('build modules') > -1) {
        process.stdout.write(outputMsg)
    } else if (percentage === 1) {
        debug('✅  webpack打包完成🤘')
    } else {
        debug(progress, msg)
    }
  }))
}


export default webpackProgress
