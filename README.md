Fengche Ssms System
-----------------------
创建时间：2016.05


## 必要程序
要使用该项目，电脑中需要先安装好以下程序：
* node `^4.0.0`（至少 v4.0）
* npm `^3.4.0` （至少 v3.0）


## 安装依赖组件
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

  ```bash
    npm install
  ```

4. 部分使用的插件经过人为修改以方便本项目使用，修改过的文件放在`modifiedPluginFiles`文件夹下，需按照各个插件文件夹内的`README`文件对插件进行修改


## 运行开发代码
1. `npm run dev` 运行本地开发代码
   在浏览器中打开`http://localhost:8080`可以看到页面，使用`206`数据进行开发

2. `npm run mockup-dev` 运行本地开发代码
   在浏览器中打开`http://localhost:8080`可以看到页面，使用`apiMock`文件夹中的假数据进行开发

3. `npm run dev-beta` 运行本地开发代码
   在浏览器中打开`http://localhost:8080`可以看到页面，强制使用`公测环境`接口数据进行开发

4. `npm run dev-release` 运行本地开发代码
   在浏览器中打开`http://localhost:8080`可以看到页面，强制使用`正式环境`接口数据进行开发


## 代码打包
1. `build-mockup-alpha`   打包放到`206`的代码
   `build-mockup-beta`    打包放到`公测环境`的代码
   `build-mockup-release` 打包放到`正式环境`的代码
   *打包好的代码，将会使用`apiMock`文件夹中的假数据*

2. `build-alpha`   打包放到`206`的代码
   `build-beta`    打包放到`公测环境`的代码
   `build-release` 打包放到`正式环境`的代码
   *打包好的代码，将会使用对应环境的接口数据*


## 运行打包好的代码
  运行`npm run dist`，在浏览器中打开`http://localhost:8989`可以看到页面


## 命名规则
1. URL：中划线分词。如：`client-profile-list`，`client-profile-detail`
2. 文件夹和文件：驼峰分词。如`clientProfileList.js`


