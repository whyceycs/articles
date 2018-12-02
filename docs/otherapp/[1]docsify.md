# docsify 搭建及使用心得



> 前言

docsify 是一个动态生成文档网站的工具。不同于 GitBook、Hexo 的地方是它不会生成将 `.md` 转成 `.html` 文件，所有转换工作都是在运行时进行。

安装说明直接参照教程就好了:[docsify](https://docsify.js.org)

安装好之后，我主要修改了以下几处。

## favicon.ico报错问题的解决



Github Pages根目录是/docs文件夹时，浏览器会提示https://xxxx.github.io/favicon.ico 文件找不到，这是需要在index.html中添加:
```html
  <link rel="icon" type="image/x-icon" href="/docs/favicon.ico"/>
```

并把favicon.ico文件放入/docs文件夹中