# HTML面试相关

## 浏览器

### 浏览器内核：

   浏览器核心部分：rendering engine,渲染引擎即浏览器内核。解释语法并渲染。

   解释不通，则可能出现一些差异。著名内核：KHTML,Trident,Gecko,Presto,Webkit,Blink

   - **Trident**：<span style='color:red'>IE</span>内核。由于长期垄断，导致长期未更新，导致与W3C标准脱节(2005)。
   - **Gecko**：<span style='color:red'>Firefox</span>内核，代码公开，可开发程度高。跨平台引擎。
   - **Webkit** ：苹果公司<span style='color:red'>Safari</span>内核，包含WebCore排版引擎和JavascriptCore解析引擎，从KHTML引擎与KJS引擎衍生出来。<span style='color:red'>Google Chrome</span>使用了Webkit内核，但是脚本解析使用了自家的V8。
   - **Presto**：<span style='color:red'>Opera</span>内核，商用。
   - **kHTML**：网页排版引擎之一，由KDE开发。
   - 双核浏览器：遨游浏览器，360安全浏览器：一个为IE的**Trident**，另一个常为**Webkit**。



### 浏览器渲染原理

浏览器载入，渲染的速度直接影响用户体验。渲染指：浏览器将html代码依据css定义的规则显示在浏览器窗口中的这个过程。

1. 输入网址，第一次访问。浏览器向服务器发出请求，服务器返回html文件。
2. 浏览器载入html代码，发现head标签内有一个link标签引用了外部css文件。
3. 浏览器发出css请求，服务器返回css文件。
4. 浏览器继续载入body部分代码。并且css文件已获得，开始渲染页面
5. 代码中发现img标签，向服务器请求该图片，<span style='color:red'>不等待图片下载完成</span>。继续渲染后续代码。
6. 服务器返回图片文件，由于图片占用了一定的布局，影响后续段落的排布，浏览器回头重新渲染这部分代码。
7. 浏览器发现script标签，运行它。
8. js脚本执行，命令浏览器隐藏部分元素。浏览器需要重新渲染这部分代码。
9. 遇到</html>标签，浏览器结束渲染。
10. 用户点击操作，例如命令浏览器换一个css路径。
11. 浏览器向服务器请求新css文件，重新渲染页面。

#### 回流reflow

某个子元素样式发生改变，直接影响到了其父元素以及往上追溯很多祖先元素（包括兄弟元素），这个时候浏览器要重新去渲染这个子元素相关联的所有元素的过程称为回流。

几乎无法避免。例如目录折叠、展开（显示、隐藏）等都将引起回流。用户鼠标滑过，点击等操作引起某些元素占位面积，定位方式，边距等属性的变化，都会引起它内部，周围甚至整个页面的重新渲染。通常<span style='color:red'>我们无法预估浏览器到底会回流那一部分代码，它们都相互影响着</span>。

通常会导致reflow的操作：

- 改变窗口大小
- 改变文字大小
- 内容改变，例如输入框输入
- 激活伪类，例如:hover
- 操作class属性
- 脚本操作DOM
- 计算offsetWidth和offsetHeight
- 设置style属性

回流优化：

1.尽量减少不必要的reflow。例如img实现给定高和宽。

2.不要通过父元素来改变子元素样式，改变子元素样式尽可能不要影响父元素和兄弟元素的大小和尺寸。

!> 尽量通过class来设计元素样式,切忌用style。会引起回流

3.尽量通过class来设计元素样式,切忌用style.例如:

```javascript
var bstyle = document.body.style; // cache
 
bstyle.padding = "20px"; // 回流 reflow, repaint
bstyle.border = "10px solid red"; //  再一次的回流 reflow 和 repaint
 
bstyle.color = "blue"; //回流 repaint
bstyle.backgroundColor = "#fad"; //回流 repaint
 
bstyle.fontSize = "2em"; //回流 reflow, repaint
 
// new DOM element - reflow, repaint
document.body.appendChild(document.createTextNode('dude!'));
 
对上面代码优化：
.b-class{
　　padding:20px;
　　color:blue;
　　border:10px solid red;
　　background-color:#fad;
　　font-size:2em;
}
$div.addClass("b-class");
```

