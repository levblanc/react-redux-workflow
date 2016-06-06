react-paginate 翻页插件
----------------------
repo: [https://github.com/AdeleD/react-paginate](https://github.com/AdeleD/react-paginate)

修改过breakView, paginationBoxView两个文件，
开放一个让用户编辑省略页面(...)的样式的API `breakClassName`

复制修改过的文件到：
<path to pos system project>/node_modules/react-patinate/react_components

在命令行运行以下命令，重新build一次插件：

```bash
cd <path to pos system project>/node_modules/react-patinate
npm run prepublish
```
