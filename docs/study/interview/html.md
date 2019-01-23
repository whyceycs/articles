# HTML面试相关

## 浏览器

### 浏览器内核：

   浏览器核心部分：rendering engine,渲染引擎即浏览器内核。解释语法并渲染。

   解释不通，则可能出现一些差异。著名内核：KHTML,Trident,Gecko,Presto,Webkit,Blink

   - **Trident**：<span style='color:red'>IE</span>内核。由于长期垄断，导致长期未更新，导致与W3C标准脱节(2005)。
   - **Gecko**：<span style='color:red'>Firefox</span>内核，代码公开，可开发程度高。跨平台引擎。
   - **Webkit** ：苹果公司<span style='color:red'>Safari</span>内核，包含WebCore排版引擎和JavascriptCore解析引擎，从KHTML引擎与KJS引擎衍生出来。<span style='color:red'>Google Chrome</span>使用了Webkit内核，但是脚本解析使用了自家的V8。
   - **Presto**：<span style='color:red'>Opera</span>内核，商用。
   - **Blink**：是由Google和Opera Software开发的浏览器排版引擎，于2013年4月公布了这一消息。该渲染引擎是开源引擎Webkit中Webcore组件的一个分支，并且在<span style='color:red'>Chrome</span>（28及往后版本）、<span style='color:red'>Opera</span>（15及往后版本）和Yandex浏览器中使用。
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

12. ```
    页面的显示过程分为以下几个阶段：
    1、生成DOM树(包括display:none的节点)
    
    2、在DOM树的基础上根据节点的集合属性(margin,padding,width,height等)生成render树(不包括display:none，head节点，但是包括visibility:hidden的节点)
    
    3、在render树的基础上继续渲染颜色背景色等样式
    ```

13. 

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

#### 回流优化：

1.尽量减少不必要的reflow。例如img实现给定高和宽。

2.不要通过父元素来改变子元素样式，改变子元素样式尽可能不要影响父元素和兄弟元素的大小和尺寸。

!> 尽量通过class来设计元素样式,切忌用style。会引起回流

3.尽量通过class来设计元素样式,切忌用style. 最好把需要操作的样式，提前写成class，之后需要修改。只需要修改一次，需要修改的时候，直接修改className，做成一次性更新多条css DOM属性，一次回流重绘总比多次回流重绘要付出的成本低得多；（谷歌浏览器有这个缓冲 flush 机制，如果在某个周内进行多次操作的话，会缓冲一次修改。）例如:
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

4.实现元素的动画，对于进场要回流的组件，要抽离出来，position属性要设为fixed或者absolute

5.权衡速度的平滑。例如一个动画，以1px为单位移动比较平滑，但是回流就较频繁，cpu就会被完全占用。如果以3px为单位，就会好一些。

6.不要使用tables布局。因为tables中某一个元素出发回流，会导致table里其它所有元素回流。在用table的场合，可以设置table-layout为auto或者fixed。这样可以让table一行一行渲染，限制回流的影响范围。

7.css里不要有表达式expression

8.减少不必要的DOM层级(DOM depth)。改变DOM树中的一级会导致所有层级的改变，上至根部，下肢被改变节点的子节点。这导致大量时间耗费在执行回流上。

9.避免不必要的复杂的css选择器，尤其是后代选择器(**descendant selectors**),因为为了匹配选择器将耗费更多cpu。

10.尽量不要过多的频繁的去增加，修改，删除元素，因为这可能会频繁的导致页面回流，可以先把该DOM节点抽离到内存中进行复杂的操作然后再display到页面上。

离线回流重绘，把需要回流重绘的节点，进行隐藏离线回流重绘，display:none

```javascript
在div.first里面加入div.second,在div.second里面加入div.third:
$divS = $("<div class='second'></div>");
$(div.first).append($divS));//回流reflow---1
$divT = $("<div class='third'></div>");
$divS.append($divT);//回流reflow---2
优化代码：
$divS = $("<div class='second'></div>");
$divT = $("<div class='third'></div>");
$divS.append($divT);
$(div.first).append($divS));//reflow---1
或者：
var $divF = $(div.first);
$divS = $("<div class='second'></div>");
$divS.hide();
$(div.first).append($divS));
$divT = $("<div class='third'></div>");
$divS.append($divT);
$divS.show();//reflow---1
```

11.每次访问DOM的偏移量属性的时候，例如获取一个元素的**offsetTop, offsetLeft, offsetWidth, offsetHeight，scrollTop/Left/Width/Height，clientTop/Left/Width/Height**之类的属性，浏览器为了保证值的正确也会回流取得最新的值，所以如果你要多次操作，取完做个缓存。更加不要for循环中访问DOM偏移量属性，而且使用的时候，最好定义一个变量，把要需要的值赋值进去，进行值缓存，把回流重绘的次数减少。建议将它们合并到一起操作，以减少回流次数。

```javascript
var windowHeight = window.innerHeight;//获取一次，回流reflow---1
for(i=0;i<10;i++){

　　$body.height(windowHeight++);

　　一系列关于windowHeight的操作.......

}
```

12.如果需要频繁的用js操作dom节点，可以使用documentfragment，这是一个纯增加性能的地方。

13.css属性用法上，用translate代替top。因为top会触发回流，但是translate不会。所以translate会比top节省一个layout的时间。

#### 重绘repaint

如果只是改变某个元素的背景色，文字颜色，边框颜色等不影响周围及内部布局的属性，将只会引起重绘，而不会回流。重绘速度明显快于回流。



#### 重绘优化

1.css属性用法上，用opacity代替visiability。visiability会触发重绘，但是opacity不会。该用法只针对于独立图层上。



!> display:none和visibility：hidden会产生回流与重绘吗？

display：none指的是元素完全不陈列出来，不占据空间，涉及到了DOM结构，故产生reflow与repaint

visibility：hidden指的是元素不可见但存在，保留空间，不影响结构，故只产生repaint