Workflow Changelog
==================

0.1.0
-----
@2016-06-09
- 增加代码规范检测（使用airbnb规范）
- mockup api和正式数据请求区分，让dev和mockup-dev两个命令可以各自跑起来
- 增加git的pre-commit hook

@2016-06-06
- `configs`和`constants`中的文件整理
- webpack config中alias好所有文件夹路径，在开发时直接引用文件夹名称，不需要再用相对路径
- webpack增加`chunk-manifest-webpack-plugin`处理缓存
- webpack增加使用`commonsChunkPlugin`，分离vendors和通用组件的分离打包，通用组件async加载
- webpack define全局变量增加`__ENV_ALPHA__`，`__ENV_BETA__`，`__ENV_RELEASE__`在打包的时候根据打包命令来判断代码上线后的环境
- 每个路由的文件整理为一张`.js`

@2016-05-23
- 封装ajaxReq方法
- 封装ajaxReqThunk方法
- 实现不依靠后端接口直接在前端通过superagent-mocker使用假数据
- 对应不同请求返回假数据的方法进行封装（mockupReq）
- 建立apiMock文件夹，并确定文件夹结构
- 通过webpackDefinePlugin来定义全局变量（环境判断还是需要先通过启动时的NODE_ENV从后端获取），让前端可以使用
- 实现点击按钮时，跳转到对应的路由，并可以获取对应的数据

@2016-05-20
- 解决action、reducer和UI之间的衔接问题
- ES6 Object Deconstructor不熟悉，导致引用时出现undefined，卡了好久

@2016-05-19
- 解决多层路由（`/layerOne/layerTwo`这种形式）页面白屏的问题
- 其实是由于webpack config的public path设置修改了位置，在获取的时候没改过来导致的

@2016-05-18
- 增加`redux-async-connect`，`superagent`，`superagent-mocker`插件
- 尝试使用ajax方式接入数据（action、reducer和UI之间的衔接遇到困难）

@2016-05-17
- 增加`connect-history-api-fallback`插件
- 解决`express server`上HTML5 history api导致的问题（@2016-05-16）
- 路由基本正常

@2016-05-16
增加路由，但跳转到第二个页面后刷新的话，该页面会变成白屏

@2016-05-15
可以创建静态页面

@2016-05-12
项目创建
