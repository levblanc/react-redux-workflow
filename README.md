React Redux Workflow
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

4. 在命令行中执行`npm run dev` 运行项目。
   在浏览器中打开`http://localhost:8080`可以看到页面

## 命名规则
1. URL：中划线分词。如：`client-profile-list`，`client-profile-detail`
2. 文件夹和文件：驼峰分词。如`clientProfileList.js`
