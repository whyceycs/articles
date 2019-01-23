

# 浏览器相关



## 浏览器内核

 浏览器核心部分：rendering engine,渲染引擎即浏览器内核。解释语法并渲染。解释不通时，则可能出现一些差异。著名内核： KHTML,Trident,Gecko,Presto,Webkit,Blink

- IE内核：Trident
  - 由于长期垄断，导致长期未更新，导致与W3C标准脱节(2005)
- Safari：Webkit
  - 包含WebCore排版引擎和JavascriptCore解析引擎，从KHTML引擎与KJS引擎衍生出来。<span style='color:red'>Google Chrome</span>使用了Webkit内核，但是脚本解析使用了自家的V8
  - KHTML为网页排版引擎之一，由KDE开发
- Chrome：Blink
  - 是由Google和Opera开发的浏览器排版引擎，于2013年4月公布了这一消息。该渲染引擎是开源引擎Webkit中Webcore组件的一个分支，并且在<span style='color:red'>Chrome</span>（28及往后版本）、<span style='color:red'>Opera</span>（15及往后版本）和Yandex浏览器中使用
  - Chrome为每个Tab分配了各自的渲染引擎实例，每个Tab就是一个独立的进程。
- Firefox：Gecko
  - 代码公开，可开发程度高。跨平台引擎
- Opera：Presto ---> Blink
  - 商用Presto内核，后转为Blink内核

- 双核浏览器：遨游浏览器，360安全浏览器：一个为IE的**Trident**，另一个常为**Webkit**。



## 渲染原理

参考：

- [http://www.cnblogs.com/slly/p/6640761.html](http://www.cnblogs.com/slly/p/6640761.html)
- [https://www.cnblogs.com/yanglang/p/7090120.html](https://www.cnblogs.com/yanglang/p/7090120.html)



### 基本流程

通过网络(通常以8k分块的方式)获得请求文档的内容。之后：

1. 解析html构建dom树  [<span style='color:red'>Parsing HTML to construct the DOM tree</span>]
   1. 渲染引擎解析html文档，转换树中标签到dom节点，内容树。
   2. 本过程包含发起http请求获取链接的内容，如css样式文件。
   3. 深度遍历的过程：当前节点的所有子节点都构建好后才会去构建当前节点的下一个兄弟节点。
   4. 涉及HTML中DTD相关内容
2. 构建render树  [<span style='color:red'>Render tree construction</span>]
   1. 解析CSS，包括外部CSS文件和style中的样式元素。
   2. 根据CSS选择器计算出节点样式，创建渲染树。
   3. 由一些包含颜色，大小等信息的<span style='color:red'>矩形</span>组成。

!> display:none的节点不加入render树,而visibility:hidden,opacity:0的节点会。所以如果某个节点最开始不显示，设为display:none更优

3. 布局render树  [<span style='color:red'>Layout of the render tree</span>]
   1. 从根节点递归调用，计算每个元素大小，位置等，给出每个节点在屏幕上的精确坐标。
4. 绘制render树   [<span style='color:red'>Painting the render tree</span>]

!> 上述过程时逐步完成的，为了更好的用户体验，渲染引擎将会尽可能早的将内容呈现到屏幕上，并不会等到所有html都解析完成之后再去构建和布局render树。它是解析完一部分内容就显示一部分内容，同时可能还在通过下载其余内容。



### 处理脚本及样式表的顺序

#### 脚本：

web的模式是同步的，开发者希望解析到一个script标签时立即解析执行脚本，并阻塞文档的解析直到脚本执行完。如果脚本是外引的，则<span style='color:red'>网络必须先请求到这个资源——这个过程也是同步的，会阻塞文档的解析</span>直到资源被请求到。这个模式保持了很多年，并且在html4及html5中都特别指定了。开发者可以将脚本标识为<span style='color:red'>defer</span>，以使其不阻塞文档解析，并在文档解析结束后执行。Html5增加了标记脚本为异步的选项，以使脚本的解析执行使用另一个线程。

#### 预解析：

Webkit和Firefox都做了这个优化，当执行脚本时，另一个线程解析剩下的文档，并加载后面需要通过网络加载的资源。这种方式可以使资源并行加载从而使整体速度更快。需要注意的是，<span style='color:red'>预解析并不改变Dom树，它将这个工作留给主解析过程，</span>自己只解析外部资源的引用，比如外部脚本、样式表及图片。

#### 样式表：

样式表采用另一种不同的模式。理论上，既然样式表不改变Dom树，也就没有必要停下文档的解析等待它们，然而，存在一个问题，脚本可能在文档的解析过程中请求样式信息，如果样式还没有加载和解析，脚本将得到错误的值，显然这将会导致很多问题，这看起来是个边缘情况，但确实很常见。Firefox在存在样式表还在加载和解析时阻塞所有的脚本，而Chrome只在当脚本试图访问某些可能被未加载的样式表所影响的特定的样式属性时才阻塞这些脚本。



### 相关名词

DOM Tree：浏览器将html解析成树形的数据结构

CSS Rule Tree：浏览器将CSS解析成树形的数据结构

Render Tree：DOM 和CSSOM合并后生成Render Tree

Layout：有了Render Tree，浏览器已经知道网页中有哪些节点、各个节点的CSS定义以及它们的从属关系，从而去计算各个节点在屏幕中的位置。

Painting：按照计算出来的规则，通过显卡，把内容画到屏幕上。

reflow：回流。当浏览器发现某个部分发生变化影响了布局，需要倒回去重新渲染。回流会从<html>这个root frame开始递归往下，依次计算所有的节点几何尺寸和位置。[<span style='color:red'>详见后文</span>]

repaint：重绘。改变某个元素的背景色，颜色等不影响内外部布局的属性时，屏幕这部分要重画，但是元素的几何尺寸没变。[<span style='color:red'>详见后文</span>]



### 回流Reflow

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


### 回流优化

1.尽量减少不必要的reflow。例如img实现给定高和宽。

2.不要通过父元素来改变子元素样式，改变子元素样式尽可能不要影响父元素和兄弟元素的大小和尺寸。

!> 尽量通过class来设计元素样式,切忌用style。会引起回流

3.尽量通过class来设计元素样式,切忌用style. 最好把需要操作的样式，提前写成class，之后需要修改。只需要修改一次，需要修改的时候，直接修改className，做成一次性更新多条css DOM属性，一次回流重绘总比多次回流重绘要付出的成本低得多；（谷歌浏览器有这个缓冲 flush 机制，如果在某个周内进行多次操作的话，会缓冲一次修改。）例如:

```javascript
var bstyle = document.body.style; // cache
bstyle.padding = "20px"; // 回流重绘 reflow, repaint
bstyle.border = "10px solid red"; //  回流重绘 reflow 和 repaint
bstyle.color = "blue"; //重绘 repaint
bstyle.backgroundColor = "#fad"; //重绘 repaint
bstyle.fontSize = "2em"; //回流重绘 reflow, repaint
document.body.appendChild(document.createTextNode('dude!'));// 回流重绘reflow, repaint
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

4.实现元素的动画，对于经常要回流的组件，要抽离出来，position属性要设为fixed或者absolute。

把需要频繁回流重绘的单独抽出去一个图层，使用 transform:translateZ(0) 或 will-change:transform 的Css属性都能实现;

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

12.如果需要频繁的用js操作dom节点，可以使用**documentfragment**，这是一个纯增加性能的地方。

13.css属性用法上，用translate代替top。因为top会触发回流，但是translate不会。所以translate会比top节省一个layout的时间。

### 重绘Repaint

如果只是改变某个元素的背景色，文字颜色，边框颜色等不影响周围及内部布局的属性，将只会引起重绘，而不会回流。重绘速度明显快于回流。

### 重绘优化

css属性用法上，用opacity代替visiability。visiability会触发重绘，但是opacity不会。该用法只针对于独立图层上。

### 延伸：浏览器 flush 队列机制

```text
回流重绘的花销不小，如果每句JS操作都去回流重绘的话，浏览器可能就会受不了。所以很多浏览器都会优化这些操作，浏览器会维护1个队列，把所有会引起回流、重绘的操作放入这个队列，等队列中的操作到了一定的数量或者到了一定的时间间隔，浏览器就会flush队列，进行一个批处理。这样就会让多次的回流、重绘变成一次回流重绘。
虽然有了浏览器的优化，但有时候一些代码可能会强制浏览器提前flush队列，这样浏览器的优化可能就起不到作用了。当你请求向浏览器请求一些style信息的时候，就会让浏览器flush队列，比如：
1. offsetTop, offsetLeft, offsetWidth, offsetHeight
2. scrollTop/Left/Width/Height
3. clientTop/Left/Width/Height
4. width,height
5. 请求了getComputedStyle(), 或者 IE的 currentStyle     // 这个属性表示经过计算过最终的样式
当请求上面的一些属性的时候，浏览器为了给你最精确的值，需要flush队列，因为队列中可能会有影响到这些值的操作。即使你获取元素的布局和样式信息跟最近发生或改变的布局信息无关，浏览器都会强行刷新渲染队列。
```





## 面试相关

<details>
<summary>1.介绍一下你对浏览器内核的理解</summary> 

主要分成两部分：渲染引擎(Layout Engine或Rendering Engine)和JS引擎。

渲染引擎：负责取得网页的内容（HTML、XML、css、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。
JS引擎：解析和执行javascript来实现网页的动态效果。

最开始渲染引擎和JS引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎。

</details>

<details>
<summary>2.常见的浏览器内核有哪些</summary> 

Trident：IE内核

Webkit：Safari内核

Blink：Chrome内核，Opera内核

Gecko：Firefox内核

Presto：前Opera内核

</details>

<details>
<summary>3.DOMContentLoaded与onload的区别</summary> 

- DOMContentLoaded:

  - 当文档中没有脚本时，浏览器解析完文档便能触发 DOMContentLoaded 事件；如果文档中包含脚本，则脚本会阻塞文档的解析，而脚本需要等位于脚本前面的css加载完才能执行。在任何情况下，DOMContentLoaded 的触发<span style='color:red'>不需要</span>等待图片等其他资源加载完成
  - 不同浏览器支持不同，ie67使用onreadystatechange事件兼容,低版本ie用doScroll兼容
- onload:

  - 页面上所有的资源（图片，音频，视频等）被加载以后才会触发load事件，简单来说，页面的load事件会在DOMContentLoaded被触发之后才触发
  - 所有浏览器都兼容

</details>

<details>
<summary>4.渲染树和DOM树的关系</summary> 

渲染对象和DOM元素相对应，但是不是一对一的。不可见DOM元素不会插入渲染树。例如header，display:none等，但是visibility:hidden等元素将插入。

还有一些DOM元素对应几个可见对象，它们一般是一些具有复杂结构的元素，无法用一个矩形来描述。例如，select元素有三个渲染对象——一个显示区域、一个下拉列表及一个按钮。同样，当文本因为宽度不够而折行时，新行将作为额外的渲染元素被添加。另一个多个渲染对象的例子是不规范的html，根据css规范，一个行内元素只能仅包含行内元素或仅包含块状元素，在存在混合内容时，将会<span style='color:red'>创建匿名的块状渲染对象</span>包裹住行内元素。

一些渲染对象和所对应的Dom节点<span style='color:red'>不在树上相同的位置</span>，例如，浮动和绝对定位的元素在文本流之外，在两棵树上的位置不同，渲染树上标识出真实的结构，并用一个占位结构标识出它们原来的位置。

</details>

<details>
<summary>5.display:none和visibility：hidden会产生回流与重绘吗？</summary> 

display：none指的是元素完全不陈列出来，不占据空间，涉及到了DOM结构，故产生reflow与repaint

visibility：hidden指的是元素不可见但存在，保留空间，不影响结构，故只产生repaint

</details>





