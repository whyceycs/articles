# BOM

## 什么是BOM？

- BOM是Browser Object Model的缩写，简称浏览器对象模型
- BOM提供了独立于内容而与浏览器窗口进行交互的对象
- 由于BOM主要用于管理窗口与窗口之间的通讯，因此其核心对象是window
- BOM由一系列相关的对象构成，并且每个对象都提供了很多方法与属性
- BOM缺乏标准，JavaScript语法的标准化组织是ECMA，DOM的标准化组织是W3C
- BOM最初是Netscape浏览器标准的一部分

基本的BOM体系结构图

![bom](https://whyceycs.github.io/articles/study/frontend/bom.png)



window对象是BOM的<span style='color:red'>顶层(核心)</span>对象，所有对象都是通过它延伸出来的，也可以称为window的子对象。由于window是顶层对象，因此调用它的子对象时可以不显示的指明window对象。

```
document.write("BOM");
window.document.write("BOM");
```

JavaScript中的任何一个全局函数或变量都是window的属性。



## BOM子对象



### 1.Document对象

参见DOM相关知识

#### [2.1 DOM节点](study/frontend/dom/node.md)
#### [2.2 DOM事件](study/frontend/dom/event.md)



### 2.Frames

**返回窗口中所有命名的框架**

- 该集合是 Window 对象的数组
- 每个 Window 对象在窗口中含有一个框架或 < iframe >
- frames[] 数组中引用的框架可能还包括框架，它们自己也具有 frames[] 数组
- 该属性也可用于 < frame > 元素，但是 HTML5 不支持 < frame > 元素

```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
</head>
<body>

<button onclick="myFunction()">点我</button>
<iframe src="https://www.baidu.com"></iframe>
<iframe src="https://www.taobao.com"></iframe>
<iframe src="http://c.runoob.com"></iframe>
<script>
function myFunction() {
    var frames = window.frames;
    var i;
    for (i = 0; i < frames.length; i++) {
        frames[i].location = "http://www.runoob.com";
    }
}
</script>
</body>
</html>
```



### 3.History对象

**在浏览器历史记录中导航,对 History 对象的只读引用**

History 对象属性:

| 属性                                                       | 说明                   |
| ---------------------------------------------------------- | ---------------------- |
| [length](http://www.runoob.com/jsref/prop-his-length.html) | 返回历史列表中的网址数 |

History 对象方法:

| 方法                                                         | 说明                              |
| ------------------------------------------------------------ | --------------------------------- |
| [back()](http://www.runoob.com/jsref/met-his-back.html)      | 加载 history 列表中的前一个 URL   |
| [forward()](http://www.runoob.com/jsref/met-his-forward.html) | 加载 history 列表中的下一个 URL   |
| [go()](http://www.runoob.com/jsref/met-his-go.html)          | 加载 history 列表中的某个具体页面 |



### 4.Location对象

#### Location 对象属性:

完整的URL由这几个部分构成:`protocol://hostname:port/path?query#fragment`

| 属性                                                         | 描述                                                        | http://www.home.com:8080/windows/location/page.html?ver=1.0&id=timlq#love |
| ------------------------------------------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------ |
| [hash](http://www.runoob.com/jsref/prop-loc-hash.html)       | 返回一个URL的锚部分（<span style='color:red'>带#号</span>） | #love                                                        |
| [host](http://www.runoob.com/jsref/prop-loc-host.html)       | 返回一个URL的主机名和端口                                   | www.home.com:8080                                            |
| [hostname](http://www.runoob.com/jsref/prop-loc-hostname.html) | 返回URL的主机名                                             | www.home.com                                                 |
| [href](http://www.runoob.com/jsref/prop-loc-href.html)       | 返回完整的URL                                               | 整体url:http://www.home.com:8080/windows/location/page.html?ver=1.0&id=timlq#love |
| [pathname](http://www.runoob.com/jsref/prop-loc-pathname.html) | 返回的URL路径名。                                           | /windows/location/page.html                                  |
| [port](http://www.runoob.com/jsref/prop-loc-port.html)       | 返回一个URL服务器使用的端口号                               | 8080<br/>如果采用默认的80端口(update:即使添加了:80)，那么返回值并不是默认的80而是<span style='color:red'>空字符</span>。 |
| [protocol](http://www.runoob.com/jsref/prop-loc-protocol.html) | 返回一个URL协议                                             | http                                                         |
| [search](http://www.runoob.com/jsref/prop-loc-search.html)   | 返回一个URL的查询部分(<span style='color:red'>带?号</span>) | ?ver=1.0&id=timlq                                            |

#### Location 对象方法:

| 方法                                                         | 说明                   |                                                              |
| ------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------ |
| [assign()](http://www.runoob.com/jsref/met-loc-assign.html)  | 载入一个新的文档       | 与直接将一个URL赋值给Location对象的href属性效果是一样的      |
| [reload()](http://www.runoob.com/jsref/met-loc-reload.html)  | 重新载入当前文档       | 默认参数是 false<br/>它就会用 HTTP 头 If-Modified-Since 来检测服务器上的文档是否已改变。<br/>如果文档已改变，reload() 会再次下载该文档。<br/>如果文档未改变，则该方法将从缓存中装载文档。<br/>与单击浏览器的刷新按钮的效果是完全一样的。<br/>参数设置为 true<br/>那么无论最后修改日期是什么，会绕过缓存，重新下载该文档。<br/>这与强制刷新效果是完全一样 |
| [replace()](http://www.runoob.com/jsref/met-loc-replace.html) | 用新的文档替换当前文档 | 不会在 History 对象中生成一个新的纪录。<br/>当使用该方法时，新的 URL 将覆盖 History 对象中的当前纪录 |

### 4.Navigator对象

**Navigator 对象包含有关浏览器的信息**


| 属性                                                         | 说明                                        |
| ------------------------------------------------------------ | ------------------------------------------- |
| [appCodeName](http://www.runoob.com/jsref/prop-nav-appcodename.html) | 返回浏览器的代码名                          |
| [appName](http://www.runoob.com/jsref/prop-nav-appname.html) | 返回浏览器的名称                            |
| [appVersion](http://www.runoob.com/jsref/prop-nav-appversion.html) | 返回浏览器的平台和版本信息                  |
| [cookieEnabled](http://www.runoob.com/jsref/prop-nav-cookieenabled.html) | 返回指明浏览器中是否启用 cookie 的布尔值    |
| [platform](http://www.runoob.com/jsref/prop-nav-platform.html) | 返回运行浏览器的操作系统平台                |
| [userAgent](http://www.runoob.com/jsref/prop-nav-useragent.html) | 返回由客户机发送服务器的user-agent 头部的值 |



**主要是使用userAgent**

```
userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"

```



### 5.Screen对象

**对象包含有关客户端显示屏幕的信息**

Screen 对象属性

| 属性                                                         | 说明                                     |
| ------------------------------------------------------------ | ---------------------------------------- |
| [availHeight](http://www.runoob.com/jsref/prop-screen-availheight.html) | 返回屏幕的高度（不包括Windows任务栏）    |
| [availWidth](http://www.runoob.com/jsref/prop-screen-availwidth.html) | 返回屏幕的宽度（不包括Windows任务栏）    |
| [colorDepth](http://www.runoob.com/jsref/prop-screen-colordepth.html) | 返回目标设备或缓冲器上的调色板的比特深度 |
| [height](http://www.runoob.com/jsref/prop-screen-height.html) | 返回屏幕的总高度                         |
| [pixelDepth](http://www.runoob.com/jsref/prop-screen-pixeldepth.html) | 返回屏幕的颜色分辨率（每象素的位数）     |
| [width](http://www.runoob.com/jsref/prop-screen-width.html)  | 返回屏幕的总宽度                         |