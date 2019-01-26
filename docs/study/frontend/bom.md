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



## Window

window对象是BOM的<span style='color:red'>顶层(核心)</span>对象，所有对象都是通过它延伸出来的，也可以称为window的子对象。由于window是顶层对象，因此调用它的子对象时可以不显示的指明window对象。

```
document.write("BOM");
window.document.write("BOM");
```

JavaScript中的任何一个全局函数或变量都是window的属性。



## Window子对象



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

完整的URL由这几个部分构成:`protocol://hostname:port/pathname?query#fragment`

| 属性                                                         | 描述                                                        | http://www.home.com:8080/windows/location/page.html?ver=1.0&id=timlq#love |
| ------------------------------------------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------ |
| [hash](http://www.runoob.com/jsref/prop-loc-hash.html)       | 返回一个URL的锚部分（<span style='color:red'>带#号</span>） | #love                                                        |
| [host](http://www.runoob.com/jsref/prop-loc-host.html)       | 返回一个URL的主机名和端口                                   | www.home.com:8080                                            |
| [hostname](http://www.runoob.com/jsref/prop-loc-hostname.html) | 返回URL的主机名                                             | www.home.com                                                 |
| [href](http://www.runoob.com/jsref/prop-loc-href.html)       | 返回完整的URL                                               | 整体url:http://www.home.com:8080/windows/location/page.html?ver=1.0&id=timlq#love |
| [pathname](http://www.runoob.com/jsref/prop-loc-pathname.html) | 返回的URL路径名（<span style='color:red'>带/号</span>）     | /windows/location/page.html                                  |
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



## Window对象方法

### alert(message)

显示带有一条指定消息和一个 **确认** 按钮的警告框



### confirm(message)

用于显示一个带有指定消息和确认及取消按钮的对话框。如果访问者点击"确定"，此方法返回true，否则返回false。

```
var r=confirm("按下按钮!");
    if (r==true){
        
    }
    else{
       
    }
```



### prompt(msg,defaultText)

用于显示可提示用户进行输入的对话框。这个方法返回用户输入的字符串。

**msg**:相当于title

**defaultText**：类似占位符，提前输入

```
var person=prompt("请输入你的名字","Harry Potter"); 
    if (person){ 
     x="你好 " + person + "! 今天感觉如何?"; 
    } 
```







### setTimeout(function, milliseconds, param1, param2, ...)

用于在指定的毫秒数后调用函数或计算表达式

| 参数                | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| code/function       | 必需。要调用一个代码串，也可以是一个函数。                   |
| milliseconds        | 可选。执行或调用 code/function 需要等待的时间，以**毫秒**计。默认为 0。 |
| param1, param2, ... | 可选。 传给执行函数的其他参数（IE9 及其更早版本不支持该参数）。 |

返回一个 ID（数字），可以将这个ID传递给<span style='color:red'>clearInterval()，clearTimeout()</span>以取消执行。



### clearTimeout(id_of_settimeout)

可取消由setTimeout()方法设置的定时操作,参数必须是由 setTimeout() 或者setInterval()返回的 ID 值。

```
var myVar;
function myFunction() {
    myVar = setTimeout(function(){ alert("Hello"); }, 3000);
}
function myStopFunction() {
    clearTimeout(myVar);
}
```



### setInterval(function, milliseconds, param1, param2, ...)

按照指定的周期（以毫秒计）来调用函数或计算表达式

| 参数                | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| code/function       | 必需。要调用一个代码串，也可以是一个函数。                   |
| milliseconds        | 必须。周期性执行或调用 code/function 之间的时间间隔，以**毫秒**计。 |
| param1, param2, ... | 可选。 传给执行函数的其他参数（IE9 及其更早版本不支持该参数）。 |

返回一个 ID（数字），可以将这个ID传递给clearInterval()，clearTimeout() 以取消执行。

------



### clearInterval(id_of_setinterval)

取消由 setInterval() 函数设定的定时执行操作,参数必须是由 setTimeout() 或者setInterval()返回的 ID 值。

```
function move() {
  var elem = document.getElementById("myBar"); 
  var width = 0;
  var id = setInterval(frame, 100);
  function frame() {
    if (width == 100) {
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
    }
  }
}
```



***setTimeout和setInterval共享ID池，所以clearInterval和clearTimeout都能取消这两个。***



## 面试相关

<details>
<summary>1.链接标记target属性的_self、_top、_parent、_blank、main、left、top各有何用处?</summary> 

target属性的_self、_top、_parent都是针对框架的。

比如你写了这样一个网页page，网页page分成frame1、frame2，frame1又分成frame1-1、frame1-2，frame1-1又分成frame1-1-1，frame1-1-2。

![bomtarget](https://whyceycs.github.io/articles/study/frontend/bomtarget.png)

假如你在frame1-1-1中放了一个链接。

- 如果这个链接的target="_self"，那么链接会在frame1-1-1中打开。

- 如果target="_parent"，那么链接会在frame1-1中打开。

- 如果target="_top"，那么链接会在page中打开。

- 如果target="_blank"，浏览器会另开一个新窗口显示page文档。
- main、left、top是由Adobe Dreamweaver生成的主、左、上框架集的框架默认名。

</details>

<details>
<summary>2.在新窗口 / 新标签页 打开</summary> 

新窗口:

```javascript
window.open('http://www.runoob.com' , '_blank' , 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
```

新标签页:
```javascript
window.open('http://www.runoob.com', '_blank');
```

</details>

<details>
<summary>3.实现每隔一秒钟弹出一个对话框，且此弹出过程持续5秒钟 </summary> 

```javascript
var id= setInterval(function() {alert("Hello JavaScript");},1000) 
setTimeout(function( ) {clearInterval(id) ; } , 5*1000)
```

</details>

<details>
<summary>4.浏览器特性检测，特性推断和浏览器UA字符串嗅探的区别？</summary> 
- 特性检测：为特定浏览器的特性进行测试，并仅当特性存在时即可应用特性。

- User-Agent检测：最早的浏览器嗅探即用户代理检测，服务端（以及后来的客户端）根据UA字符串屏蔽某些特定的浏览器查看网站内容。

- 特性推断：尝试使用多个特性但仅验证了其中之一。根据一个特性的存在推断另一个特性是否存在。问题是，推断是假设并非事实，而且可能导致可维护性的问题。


</details>

