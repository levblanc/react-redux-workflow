// ======================================
// webpack 配置文件
// ======================================

import _debug              from 'debug'
import path                from 'path'
import webpack             from 'webpack'
import constants           from '../constants/globalConsts'
import nib from 'nib'
import poststylus          from 'poststylus'
import HtmlWebpackPlugin   from 'html-webpack-plugin'
import ExtractTextPlugin   from 'extract-text-webpack-plugin'
import CleanPlugin         from 'clean-webpack-plugin'
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin'
// import CompressionPlugin   from 'compression-webpack-plugin'

const debug       = _debug('app:webpack:config')
const { __DEV__ } = constants.WEBPACK_DEFINE

debug('装填webpack配置')

const webpackConfig = {
  context : constants.DIR_ROOT,
  progress: true,
  resolve : {
    alias: {
      api          : path.resolve(constants.DIR_SRC, 'api'),
      apiMock      : path.resolve(constants.DIR_SRC, 'apiMock'),
      assets       : path.resolve(constants.DIR_SRC, 'assets'),
      components   : path.resolve(constants.DIR_SRC, 'components'),
      globalConfig : path.resolve(constants.DIR_SRC, 'configs/global.js'),
      constants    : path.resolve(constants.DIR_SRC, 'constants/globalConsts.js'),
      actionTypes  : path.resolve(constants.DIR_SRC, 'constants/actionTypes.js'),
      containers   : path.resolve(constants.DIR_SRC, 'containers'),
      layout       : path.resolve(constants.DIR_SRC, 'layout'),
      middleware   : path.resolve(constants.DIR_SRC, 'middleware'),
      reduxStore   : path.resolve(constants.DIR_SRC, 'reduxStore'),
      routes       : path.resolve(constants.DIR_SRC, 'routes'),
      utils        : path.resolve(constants.DIR_SRC, 'utils')
    },
    extensions: ['', '.json', '.js']
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
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      plugins: ['transform-runtime'],
      presets: ['es2015', 'react', 'stage-0']
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

// CSS loader
const cssModulesLoader = [
  'css?sourceMap',
  'modules',
  'localIdentName=[local]___[hash:base64:5]'
].join('&')

webpackConfig.module.loaders.push({
  test: /\.(css|styl)$/,
  loaders: [
    'style',
    cssModulesLoader,
    'stylus?outputStyle=expanded&sourceMap'
  ]
})

// 在production环境中使用ExtractTextPlugin
if (!__DEV__) {
  debug('使用CSS ExtractTextPlugin')
  webpackConfig.module.loaders.filter((loader) =>
    loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
  ).forEach((loader) => {
    const [first, ...rest] = loader.loaders
    Object.assign(loader, {
      loader: ExtractTextPlugin.extract(first, rest.join('!'))
    })
    Reflect.deleteProperty(loader, 'loaders')
  })
}

// 使用stylus nib插件
webpackConfig.stylus = {
  use: [
    nib(),
    poststylus(['autoprefixer'])
  ],
  import: ['~nib/lib/nib/index.styl']
}


// ======================================
// Plugins配置
// ======================================
webpackConfig.plugins = [
  new webpack.DefinePlugin(constants.WEBPACK_DEFINE),
  new ChunkManifestPlugin({
    filename        : 'manifest.json',
    manifestVariable: 'webpackManifest'
  })
]

const htmlPluginConfigs = {
  template: path.resolve(constants.DIR_SRC, 'index.html.js'),
  hash    : false,
  filename: 'index.html',
  inject  : 'body'
}


if (__DEV__) {
  debug('使用开发环境webpack插件(HMR, NoErrors)')
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin(htmlPluginConfigs),
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else {
  debug('使用release环境webpack插件(Dedupe, OccurenceOrder, CommonsChunk, UglifyJS)')

  const compressConfigs = {
    compress: {
      warnings : false
    }
  }

  htmlPluginConfigs.minify = {
    collapseWhitespace: true
  }

  if (constants.COMPILE_ENV === 'release') {
    debug('使用release环境JS压缩配置：unused && dead_code')
    compressConfigs.compress = {
      ...compressConfigs.compress,
      unused   : true,
      dead_code: true
    }
  }

  webpackConfig.plugins.push(
    // 清空dist文件夹
    new CleanPlugin([constants.DIR_DIST], { root: constants.DIR_ROOT }),
    new ExtractTextPlugin('[name].[contenthash:6].css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin(htmlPluginConfigs),
    // 防止重复引入相同的依赖
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // 一定要使用 CommonsChunkPlugin 把 vendors 的打包文件分离出来
    // 只是在 entry 处分离的话，一样会打包进去 app.js ，导致文件过大!!!
    new webpack.optimize.CommonsChunkPlugin({
      name     : 'vendors',
      filename : 'vendors.[hash:6].js',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children : true,
      async    : true,
      minChunks: 3
    }),
    // 压缩JS
    new webpack.optimize.UglifyJsPlugin(compressConfigs)
    // 预压缩gzip文件，服务器请求css, js时马上提供对应的压缩文件
    // !!! 注意：服务器端需做对应配置 !!!
    // new CompressionPlugin({
    //   asset    : "[path].gz[query]",
    //   algorithm: "gzip",
    //   test     : /\.css$|\.js$/,
    //   threshold: 10240,
    //   minRatio : 0.8
    // })
  )
}

export default webpackConfig
