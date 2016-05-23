// ------------------------------------
// webpack 配置文件
// ------------------------------------

import _debug            from 'debug'
import path              from 'path'
import webpack           from 'webpack'
import globalConfig      from './global'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

let debug       = _debug('app:webpack:config')
let { __DEV__ } = globalConfig.WEBPACK_DEFINE

debug('装填webpack配置')

let webpackConfig = {
  devtool : globalConfig.COMPILER_DEVTOOL,
  context : globalConfig.DIR_ROOT,
  progress: true,
  resolve : {
    root: globalConfig.DIR_SRC,
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx', '.styl']
  },

  module: {}
}


// ------------------------------------
// Entry配置
// ------------------------------------
const APP_ENTRY_FILE = path.resolve(globalConfig.DIR_SRC, 'appInit.js')

webpackConfig.entry = {
    app: __DEV__
          ? [`webpack-hot-middleware/client?path=${globalConfig.SERVER_URI}/__webpack_hmr`,
            APP_ENTRY_FILE]
          : [APP_ENTRY_FILE],
    vendor: globalConfig.COMPILER_VENDOR
}


// ------------------------------------
// 打包Output配置
// ------------------------------------
webpackConfig.output = {
    path         : globalConfig.DIR_DIST,
    filename     : '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath   : globalConfig.COMPILER_SETTINGS.publicPath
}


// ------------------------------------
// loaders配置
// ------------------------------------
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

// CSS loader在dev和production环境中的不同配置
if(__DEV__){
  webpackConfig.module.loaders.push({
    test: /\.(css|styl)$/,
    loader: 'style!css?modules&sourceMap&localIdentName=[local]___[hash:base64:5]!stylus?outputStyle=expanded&sourceMap'
  })
}else{
  debug('使用extractTextPlugin')
  webpackConfig.module.loaders.push({
    test: /\.(css|styl)$/,
    loader: extractTextPlugin.extract('style','css?modules&sourceMap&localIdentName=[local]___[hash:base64:5]!stylus?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
  })
}

// 使用stylus nib插件
webpackConfig.stylus = {
  use: [require('nib')()],
  import: ['~nib/lib/nib/index.styl']
}


// ------------------------------------
// Plugins配置
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(globalConfig.WEBPACK_DEFINE),
  new HtmlWebpackPlugin({
    template: path.resolve(globalConfig.DIR_SRC, 'index.html'),
    // htmlWebpackPlugin: {
    //   files: {
    //     css   : [ "main.css" ],
    //     js    : [ "dist/app.js", "dist/vendor.js"],
    //     chunks: {
    //       app: {
    //         "entry": "dist/appInit.js"
    //       },
    //       vendor: {
    //         "entry": "dist/vendor.js"
    //       },
    //     }
    //   }
    // },
    hash    : false,
    filename: 'index.html',
    inject  : 'body',
    // minify  : {
    //   collapseWhitespace: true
    // }
  })
]


if(__DEV__){
  debug('使用开发环境webpack插件(HMR, NoErrors)')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(), // hot reload
    new webpack.NoErrorsPlugin()
  )
}else{
  debug('使用生产环境webpack插件(OccurenceOrder & UglifyJS)')
  // 清空dist文件夹
  new CleanPlugin([globalConfig.DIR_DIST], { root: globalConfig.DIR_ROOT }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  // 压缩JS
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      unused   : true,
      dead_code: true,
      warnings : false
    }
  })
}

export default webpackConfig
