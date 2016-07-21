Fengche Ssms System
-----------------------
创建时间：2016.05


### 必要程序
要使用该项目，电脑中需要先安装好以下程序：
* node `^4.0.0`（至少 v4.0）
* npm `^3.4.0` （至少 v3.0）


### 安装依赖组件
1. 在电脑上全局安装 `nodemon` 和 `babel-cli`

  ```bash
    npm install -g nodemon babel-cli
  ```

2. 在开发用的编辑器上安装:
    - editorconfig插件 [http://editorconfig.org/#download](http://editorconfig.org/#download)
    - ES6语法插件
    - JSX语法插件
    - stylus语法插件

3. 在项目文件夹路径下执行以下命令，安装项目必须的依赖包
   如果npm 速度太慢，请试用[淘宝的npm镜像](https://npm.taobao.org/)

    ```bash
      npm install
    ```

4. 部分使用的插件经过人为修改以方便本项目使用，
   修改过的文件放在`modifiedPluginFiles`文件夹下，
   需按照各个插件文件夹内的`README`文件对插件进行修改


### 如何启动项目
  `npm run dev` 启动项目，使用`206`数据进行开发,
  在浏览器中打开`http://localhost:8080`可以看到页面


### 使用假数据进行开发
  `npm run mockup-dev` 使用`apiMock`文件夹中的假数据进行开发
  在浏览器中打开`http://localhost:8080`可以看到页面


### 强制使用特定环境的接口数据进行开发
  `npm run dev-beta`   : 强制使用`公测环境`接口数据进行开发
  `npm run dev-release`: 强制使用`正式环境`接口数据进行开发

   在浏览器中打开`http://localhost:8080`可以看到页面


### 代码打包
1. 打包使用假数据的代码
    `build-mockup-alpha`   : 打包放到`206`的代码
    `build-mockup-beta`    : 打包放到`公测环境`的代码
    `build-mockup-release` : 打包放到`正式环境`的代码

   *打包好的代码，将会使用`apiMock`文件夹中的假数据*

2. 打包使用接口数据的代码
    `build-alpha`   : 打包放到`206`的代码
    `build-beta`    : 打包放到`公测环境`的代码
    `build-release` : 打包放到`正式环境`的代码

   *打包好的代码，将会使用对应环境的接口数据*


### 运行打包好的代码
  `npm run dist-alpha`  : 运行打包好的`206`环境代码
  `npm run dist-beta`   : 运行打包好的`公测环境`环境代码
  `npm run dist-release`: 运行打包好的`正式环境`环境代码

  在浏览器中打开`http://localhost:8989/ssms/`可以看到页面


### 代码规范检测
  `npm run lint`


### 运行测试
  `npm run test`      : 运行单次测试
  'npm run test-watch': 运行测试程序，并监听变化


### 项目文件夹结构
    fengche-pos-system
    ├── .babelrc                    babel配置文件
    ├── .editorConfig               editorConfig插件配置文件
    ├── .eslintignore               eslint时忽略特定文件/文件夹的配置文件
    ├── .eslintrc                   eslint配置文件
    ├── .gitignore                  git commit时忽略文件的配置
    ├── README                      项目说明文件（本文）
    ├── bin                         [文件夹] - 执行文件
    │   ├── server.js               项目server文件
    │   ├── gitValidate.js          git hooks配置文件
    │   ├── webpack.build.js        webpack打包执行文件（执行build命令时用到）
    │   └── webpackProgress.js      显示webpack打包进度的小插件
    ├── modifiedPluginFiles         [文件夹] - 经过人为修改的插件文件
    ├── dist                        [文件夹] - 打包好的文件
    ├── src                         [文件夹] - 项目源码
    │    ├── api
    │    │   └── apiMapping.js       api路径和引用key的映射文件
    │    ├── apiMock                 [文件夹] - 假数据放置文件夹（里面再细分各个页面自有文件夹）
    │    ├── assets                  [文件夹] - 公共资源
    │    │   ├── imges               [文件夹] - 项目图片
    │    │   └── styles              [文件夹] - 项目通用stylus文件
    │    ├── components              [文件夹] - UI组件
    │    ├── configs                 [文件夹] - 配置文件
    │    │   ├── global.js           前端需要用到的变量配置文件
    │    │   └── webpack.config.js   webpack配置文件
    │    ├── constants               [文件夹] - 配置文件
    │    │   ├── globalConst.js      项目相关的所有常量配置文件
    │    │   └── actionTypes.js      action types配置文件
    │    ├── containers              [文件夹] - 各页面主要源文件(view, stylus, │module)
    │    ├── layout                  [文件夹] - 项目主要layout
    │    ├── middleware              [文件夹] - 项目用到的middleware
    │    ├── reduxStore              [文件夹] - redux store创建及主要reducers
    │    ├── routes                  [文件夹] - 项目路由配置
    │    ├── utils                   [文件夹] - 项目中各种helper类js文件
    │    ├── appInit.js              项目路由配置文件
    │    └── index.html.js           生成index.html所需的js文件
    ├── package.json                项目依赖包声明、npm scripts配置
    └── nodemon.json                nodemon配置文件


### 快捷require配置
    webpack配置中有`resolve.alias`对象，
    在其中配置好常用文件/文件夹路径，require时可以直接使用配置好的名称，
    不需要再使用路径。
    详情参考`src/configs/webpack.config.js`文件。


### 命名规则
1. URL：中划线分词。如：`client-profile-list`，`client-profile-detail`
2. 文件夹和文件：驼峰分词。如`clientProfileList.js`


