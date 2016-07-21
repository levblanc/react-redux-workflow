// ======================================
// webpack 配置文件
// ======================================

import _debug              from 'debug'
import path                from 'path'
import webpack             from 'webpack'
import constants           from '../constants/globalConsts'
import HtmlWebpackPlugin   from 'html-webpack-plugin'
import ExtractTextPlugin   from 'extract-text-webpack-plugin'
import CleanPlugin         from 'clean-webpack-plugin'
import ManifestPlugin      from 'webpack-manifest-plugin'
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin'
import configValidator     from 'webpack-validator'


const debug = _debug('app:webpack:config')
const { __DEV__, __TEST__ } = constants.GLOBAL_VARS

// 使用webpack-validator的Joi.object对象
// 自定义第三方插件增加的属性
// 否则在webpack config中直接添加这些属性
// validator会报错
const Joi = configValidator.Joi
const configValidatorSchemaExtension = Joi.object({
  stylus: Joi.any()
})

debug('🚚  装填webpack配置')

const webpackConfig = {
  context : constants.DIR_ROOT,
  watch   : true,
  resolve : {
    alias: {
      api         : path.resolve(constants.DIR_SRC, 'api'),
      apiMock     : path.resolve(constants.DIR_SRC, 'apiMock'),
      assets      : path.resolve(constants.DIR_SRC, 'assets'),
      components  : path.resolve(constants.DIR_SRC, 'components'),
      globalConfig: path.resolve(constants.DIR_SRC, 'configs/global.js'),
      constants   : path.resolve(constants.DIR_SRC, 'constants/globalConsts.js'),
      actionTypes : path.resolve(constants.DIR_SRC, 'constants/actionTypes.js'),
      containers  : path.resolve(constants.DIR_SRC, 'containers'),
      layout      : path.resolve(constants.DIR_SRC, 'layout'),
      middleware  : path.resolve(constants.DIR_SRC, 'middleware'),
      reduxStore  : path.resolve(constants.DIR_SRC, 'reduxStore'),
      routes      : path.resolve(constants.DIR_SRC, 'routes'),
      utils       : path.resolve(constants.DIR_SRC, 'utils'),
      testUtils   : path.resolve(constants.DIR_TEST, 'utils')
    },
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.json']
  },

  module: {}
}


// ======================================
// Entry配置
// ======================================
const APP_ENTRY_FILES = [
  path.resolve(constants.DIR_SRC, 'appInit.js')
]

webpackConfig.entry = {
  app: __DEV__
        ? APP_ENTRY_FILES.concat(`webpack-hot-middleware/client?path=${constants.SERVER_URI}/__webpack_hmr`)
        : APP_ENTRY_FILES,
  vendors: constants.COMPILER_VENDORS
}


// ======================================
// 打包Output配置
// ======================================
webpackConfig.output = {
  path         : constants.DIR_DIST,
  filename     : '[name].[hash:6].js',
  chunkFilename: '[name].[chunkhash:6].js',
  publicPath   : constants.COMPILER_SETTINGS.publicPath
}

// dev tool(sourcemap) 只在 alpha 和 test 环境开启
if (constants.COMPILER_DEVTOOL) {
  webpackConfig.devtool = constants.COMPILER_DEVTOOL
}


// ======================================
// loaders配置
// ======================================
webpackConfig.module.loaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules)/,
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      plugins: ['transform-runtime'],
      presets: ['es2015', 'react', 'stage-0', 'airbnb'],
      env: {
        production: {
          presets: ['react-optimize']
        }
      }
    }
  },
  { test: /\.json$/,
    loader: 'json-loader'
  },
  {
    test: /\.(png|jpg)$/,
    loader: 'url-loader?limit=10240'
  }
]

// Stylus loader 配置
const extractSTYLUS = new ExtractTextPlugin('[name].[hash:6].css', {
  allChunks: false
})

const cssModulesLoader = [
  'css?sourceMap',
  'modules',
  'localIdentName=[local]___[hash:base64:5]'
].join('&')

const sytlusLoader = [
  'stylus?outputStyle=expanded',
  'sourceMap'
].join('&')

const stylusLoaderConfig = {
  test   : /\.styl$/i,
  exclude: /node_modules/
}

if (__DEV__ || __TEST__) {
  stylusLoaderConfig.loaders = [
    'style-loader',
    cssModulesLoader,
    sytlusLoader
  ]
} else {
  stylusLoaderConfig.loader = extractSTYLUS.extract(
    'style-loader',
    cssModulesLoader.concat('!', sytlusLoader)
  )
}

webpackConfig.module.loaders.push(stylusLoaderConfig)

// 使用stylus nib插件
webpackConfig.stylus = {
  use: [require('nib')()],
  import: ['~nib/lib/nib/index.styl']
}


// ======================================
// Plugins配置
// ======================================
webpackConfig.plugins = [
  new webpack.DefinePlugin(constants.GLOBAL_VARS),
  new ManifestPlugin(),
  new ChunkManifestPlugin({
    filename        : 'chunk-manifest.json',
    manifestVariable: 'webpackManifest'
  })
]

// HtmlWebpackPlugin 基本配置
const htmlPluginConfigs = {
  template: path.resolve(constants.DIR_SRC, 'index.html.js'),
  hash    : false,
  filename: 'index.html',
  inject  : 'body'
}

if (__DEV__ || __TEST__) {
  debug('使用开发环境webpack插件(HMR, NoErrors)')
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin(htmlPluginConfigs),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else {
  // 非本地开发环境 && 非测试环境 => 线上环境
  debug('使用release环境webpack插件(Dedupe, OccurenceOrder, CommonsChunk, UglifyJS)')

  const compressConfigs = {
    compress: {
      warnings : false
    }
  }

  // 对 HtmlWebpackPlugin 最后生成的 index.html 进行压缩
  htmlPluginConfigs.minify = {
    collapseWhitespace: true
  }

  if (constants.COMPILE_ENV === 'release') {
    debug('使用release环境JS压缩配置：unused && dead_code && no comments')
    compressConfigs.compress = {
      ...compressConfigs.compress,
      unused   : true,
      dead_code: true
    }
    compressConfigs.output = {
      comments: false
    }
  }

  webpackConfig.plugins.push(
    // 清空dist文件夹
    new CleanPlugin([constants.DIR_DIST], {
      root: constants.DIR_ROOT
    }),
    extractSTYLUS,
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name     : 'vendors',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children : true,
      async    : true,
      minChunks: 3
    }),
    new HtmlWebpackPlugin(htmlPluginConfigs),
    // 防止重复引入相同的依赖
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    // 压缩JS
    new webpack.optimize.UglifyJsPlugin(compressConfigs),
    new webpack.optimize.AggressiveMergingPlugin()
  )
}

const validateWebpackConfigs = configValidator(webpackConfig, {
  schemaExtension: configValidatorSchemaExtension
})

export default validateWebpackConfigs
