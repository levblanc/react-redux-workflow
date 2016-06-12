react-paginate 翻页插件
----------------------
repo: [https://github.com/AdeleD/react-paginate](https://github.com/AdeleD/react-paginate)

修改过breakView, paginationBoxView两个文件，
- 开放一个让用户编辑省略页面(...)的样式的API `breakClassName`
- paginationBoxView: 注释掉componentDidMount里面的callback绑定, 修复初次加载重复请求问题

复制修改过的文件到：
<path to pos system project>/node_modules/react-patinate/react_components

在命令行运行以下命令，重新build一次插件：

```bash
cd <path to pos system project>/node_modules/react-patinate
npm run prepublish
```
