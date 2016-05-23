Workflow Changelog
==================

0.1.0
-----
@2016-05-20
解决action、reducer和UI之间的衔接问题
ES6 Object Deconstructor不熟悉，导致引用时出现undefined，卡了好久

@2016-05-19
解决多层路由（`/layerOne/layerTwo`这种形式）页面白屏的问题
其实是由于webpack config的public path设置修改了位置，在获取的时候没改过来导致的

@2016-05-18
增加`redux-async-connect`，`superagent`，`superagent-mocker`插件
尝试使用ajax方式接入数据（action、reducer和UI之间的衔接遇到困难）

@2016-05-17
增加`connect-history-api-fallback`插件
解决`express server`上HTML5 history api导致的问题（@2016-05-16）
路由基本正常

@2016-05-16
增加路由，但跳转到第二个页面后刷新的话，该页面会变成白屏

@2016-05-15
可以创建静态页面

@2016-05-12
项目创建
