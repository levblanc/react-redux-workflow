import constants     from '../src/constants/globalConsts'
import webpackConfig from '../src/configs/webpack'
import _debug        from 'debug'
import argv          from 'minimist-argv'

const debug = _debug('app:karma:config')
debug('装填karma配置')

const karmaConfig = {
  // 项目的root，相对于 __tests_/karma.conf.js
  basePath: '../',
  browsers: ['jsdom'],
  colors  : true,
  // 测试覆盖率报告配置
  coverageReporter: {
    dir: './__tests__/__coverage__',
    reporters: [
      { type: 'html', subdir: 'html' },
      { type: 'lcovonly', subdir: '.' },
    ]
  },
  singleRun: !argv.watch,
  // 需要测试的文件
  files: [{
    // 相对于 basePath 的路径
    pattern: './__tests__/tests.webpack.js',
    // 取消文件变化时的自动监听
    // watched: false
  }],
  // 测试框架
  frameworks: ['mocha'],
  reporters : ['mocha'],
  // 预处理器
  preprocessors: {
    // 相对于 basePath 的路径
    './__tests__/tests.webpack.js': ['webpack']
  },
  // webpack配置
  webpack: {
    devtool: constants.COMPILER_DEVTOOL,
    resolve: {
      ...webpackConfig.resolve,
      alias: {
        ...webpackConfig.resolve.alias,
        sinon: 'sinon/pkg/sinon'
      }
    },
    module: {
      noParse: [
        /\/sinon\.js/
      ],
      loaders: webpackConfig.module.loaders.concat([
        {
          test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          loader: 'imports?define=>false,require=>false'
        }
      ])
    },
    plugins: webpackConfig.plugins,
    // 针对 Enzyme 的 externals 配置 :
    // http://airbnb.io/enzyme/docs/guides/webpack.html#react-15-compatability
    externals: {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    },
  },
  // 进行测试的时候不在console输出多余信息
  webpackMiddleware: {
    noInfo: true
  },
  webpackServer: {
    noInfo: true
  }
}

!argv.watch && karmaConfig.reporters.push('coverage')

// Karma 只认 `module.exports` 所以不能用 `export default`
module.exports = (config) => config.set(karmaConfig)
