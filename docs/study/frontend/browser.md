

# 浏览器相关



## 浏览器内核

 浏览器核心部分：rendering engine,渲染引擎即浏览器内核。解释语法并渲染。解释不通时，则可能出现一些差异。著名内核： KHTML,Trident,Gecko,Presto,Webkit,Blink

- IE内核：Trident
  - 由于长期垄断，导致长期未更新，导致与W3C标准脱节(2005)
  - JS引擎为Chakra（forJScript）
- EdgeHTML 内核
  - Window10 发布后，IE 将其内置浏览器命名为 **Edge**，Edge 最显著的特点就是新内核 EdgeHTML。
- Safari：Webkit
  - 包含WebCore排版引擎和JavascriptCore解析引擎，从KHTML引擎与KJS引擎衍生出来。<span style='color:red'>Google Chrome</span>使用了Webkit内核，但是脚本解析使用了自家的V8
  - KHTML为网页排版引擎之一，由KDE开发
  - JS引擎为JavascriptCore
- Chrome：Blink
  - 是由Google和Opera开发的浏览器排版引擎，于2013年4月公布了这一消息。该渲染引擎是开源引擎Webkit中Webcore组件的一个分支，并且在<span style='color:red'>Chrome</span>（28及往后版本）、<span style='color:red'>Opera</span>（15及往后版本）和Yandex浏览器中使用
  - Chrome为每个Tab分配了各自的渲染引擎实例，每个Tab就是一个独立的进程。
  - JS引擎为V8
- Firefox：Gecko
  - 代码公开，可开发程度高。跨平台引擎
  - JS引擎为SpiderMonkey
- Opera：Presto ---> Blink

  - 商用Presto内核，后转为Blink内核
- 双核浏览器：
  - 360浏览器、猎豹浏览器内核：IE+Chrome双内核
  - 搜狗、遨游、QQ浏览器内核：Trident（兼容模式）+Webkit（高速模式）



### 移动端的浏览器内核

移动端的浏览器内核主要说的是系统内置浏览器的内核，目前移动设备浏览器上常用的内核有 Webkit，Blink，Trident，Gecko。

- iPhone 和 iPad 等苹果 iOS 平台主要是 WebKit
- Android 4.4 之前的 Android 系统浏览器内核是 WebKit，Android 4.4 系统浏览器切换到了Chromium，内核是 Webkit 的分支 Blink。
- Windows Phone 8 系统浏览器内核是 Trident



## 严格模式与混杂模式

参考：[https://www.cnblogs.com/wuqiutong/p/5986191.html](https://www.cnblogs.com/wuqiutong/p/5986191.html)

**严格模式：**又称标准模式，是指浏览器按照 W3C 标准解析代码。

**混杂模式：**又称怪异模式或兼容模式，是指浏览器用自己的方式解析代码。

**如何区分：**浏览器解析时到底使用严格模式还是混杂模式，与网页中的 DTD 直接相关。

1. 如果文档包含严格的 DOCTYPE ，那么它一般以严格模式呈现。**（严格 DTD ——严格模式）** 
2. 包含过渡 DTD 和 URI 的 DOCTYPE ，也以严格模式呈现，但有过渡 DTD 而没有 URI （统一资源标识符，就是声明最后的地址）会导致页面以混杂模式呈现。**（有 URI 的过渡 DTD ——严格模式；没有 URI 的过渡 DTD ——混杂模式）** 
3. DOCTYPE 不存在或形式不正确会导致文档以混杂模式呈现。**（DTD不存在或者格式不正确——混杂模式）
4. <span style='color:red'>HTML5 没有 DTD</span> ，因此也就没有严格模式与混杂模式的区别，HTML5 有相对宽松的语法，实现时，已经尽可能大的实现了向后兼容。<span style='color:red'>**（ HTML5 没有严格和混杂之分）**</span>

**意义：**严格模式与混杂模式存在的意义与其来源密切相关，如果说只存在严格模式，那么许多旧网站必然受到影响，如果只存在混杂模式，那么会回到当时浏览器大战时的混乱，每个浏览器都有自己的解析模式。



### **严格模式与混杂模式的语句解析不同点有哪些？**

1. 盒模型的高宽包含内边距padding和边框border 

   在W3C标准中，如果设置一个元素的宽度和高度，指的是元素内容的宽度和高度，而在IE5.5及以下的浏览器及其他版本的Quirks模式下，IE的宽度和高度还包含了padding和border。

2. 可以设置行内元素的高宽

   在Standards模式下，给span等行内元素设置wdith和height都不会生效，而在quirks模式下，则会生效。

3. 可设置百分比的高度

   在standards模式下，一个元素的高度是由其包含的内容来决定的，如果父元素没有设置高度，子元素设置一个百分比的高度是无效的。

4. 用margin:0 auto设置水平居中在IE下会失效

   使用margin:0 auto在standards模式下可以使元素水平居中，但在quirks模式下却会失效,quirk模式下的解决办法，用text-align属性:

   ```
   body{text-align:center};#content{text-align:left}
   ```
5. quirk模式下设置图片的padding会失效

6. quirk模式下Table中的字体属性不能继承上层的设置

7. quirk模式下white-space:pre会失效

### 在js中如何判断当前浏览器正在以何种方式解析

document对象有个属性compatMode,它有两个值：BackCompat对应quirks mode，CSS1Compat对应strict mode



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



## 浏览器兼容性问题

参考：[https://blog.csdn.net/xustart7720/article/details/73604651](https://blog.csdn.net/xustart7720/article/details/73604651)

指因为不同的浏览器对同一段代码有不同的解析，造成页面显示效果不统一的情况。在大多数情况下，我们的需求是，无论用户用什么浏览器来查看我们的网站或者登陆我们的系统，都应该是统一的显示效果。

<details>
<summary>1. 不同浏览器的标签默认的外补丁margin和内补丁padding不同</summary> 

   - 问题症状：随便写几个标签，不加样式控制的情况下，各自的margin 和padding差异较大。
   - 碰到频率:100%
   - 解决方案：css里 `*{margin:0;padding:0;}`
   - 备注：这个是最常见的也是最易解决的一个浏览器兼容性问题，几乎所有的css文件开头都会用通配符*来设置各个标签的内外补丁是0。

</details>

<details>
<summary>2. 块属性标签float后，又有横行的margin情况下，在ie6显示margin比设置的大 </summary> 

   - 问题症状:常见症状是ie6中后面的一块被顶到下一行
   - 碰到频率：90%（稍微复杂点的页面都会碰到，float布局最常见的浏览器兼容问题）
   - 解决方案：在float的标签样式控制中加入 display:inline;将其转化为行内属性
   - 备注：我们最常用的就是div+css布局了，而div就是一个典型的块属性标签，横向布局的时候我们通常都是用div float实现的，横向的间距设置如果用margin实现，这就是一个必然会碰到的兼容性问题。

</details>

<details>
<summary>3. 设置较小高度标签（一般小于10px），在ie6，ie7，遨游中高度超出自己设置高度</summary> 

   - 问题症状：ie6、7和遨游里这个标签的高度不受控制，超出自己设置的高度
   - 碰到频率：60%
   - 解决方案：给超出高度的标签设置overflow:hidden;或者设置行高line-height 小于你设置的高度。
   - 备注：这种情况一般出现在我们设置小圆角背景的标签里。出现这个问题的原因是ie8之前的浏览器都会给标签一个最小默认的行高的高度。即使你的标签是空的，这个标签的高度还是会达到默认的行高。

</details>

<details>
<summary>4. 行内属性标签，设置display:block后采用float布局，又有横行的margin的情况，ie6间距bug（类似第二种）</summary> 

   - 问题症状：ie6里的间距比超过设置的间距
   - 碰到几率：20%
   - 解决方案：在display:block;后面加入display:inline;display:table;
   - 备注：行内属性标签，为了设置宽高，我们需要设置display:block;(除了input标签比较特殊)。在用float布局并有横向的margin后，在ie6下，他就具有了块属性float后的横向margin的bug。不过因为它本身就是行内属性标签，所以我们再加上display:inline的话，它的高宽就不可设了。这时候我们还需要在display:inline后面加入display:talbe。

</details>

<details>
<summary>5. 图片默认有间距</summary> 

   - 问题症状：几个img标签放在一起的时候，有些浏览器会有默认的间距，加上问题一中提到的通配符也不起作用。
   - 碰到几率：20%
   - 解决方案：使用float属性为img布局,
   - 备注：因为img标签是行内属性标签，所以只要不超出容器宽度，img标签都会排在一行里，但是部分浏览器的img标签之间会有个间距。去掉这个间距使用float是正道

</details>

<details>
<summary>6. 标签最低高度设置min-height不兼容</summary> 

   - 问题症状：因为min-height本身就是一个不兼容的css属性，所以设置min-height时不能很好的被各个浏览器兼容
   - 碰到几率：5%
   - 解决方案：如果我们要设置一个标签的最小高度200px，需要进行的设置为：`{min-height:200px; height:auto !important; height:200px; overflow:visible;}`
   - 备注：在B/S系统前端开时，有很多情况下我们有这种需求。当内容小于一个值（如300px）时。容器的高度为300px；当内容高度大于这个值时，容器高度被撑高，而不是出现滚动条。这时候我们就会面临这个兼容性问题。

</details>

<details>
<summary>7. 透明度的兼容css设置</summary> 

   ```css
   .transparent_class {  
       background: rgba(255, 0, 0, 0.3) !important; /* IE无效，FF有效 */    
       filter: alpha(opacity=80);    
       -moz-opacity:0.8;    
       -khtml-opacity: 0.3;    
       opacity: 0.8;    
   }  
   ```

</details>

<details>
<summary>8. 光标手形</summary> 

   firefox不支持hand，但ie支持pointer，统一使用cursor:pointer;

</details>

<details>
<summary>9. 当在a标签中嵌套img标签时，在某些浏览器中img会有蓝色边框</summary> 

   - 给img添加border：0；
   - 或者是border：none；

</details>

<details>
<summary>10. div里的内容，IE默认为居中，而FF默认为左对齐</summary> 

  可以尝试增加代码margin: 0 auto;

</details>

<details>
<summary>11. 万能float 闭合(非常重要!)</summary> 

    将以下代码加入Global CSS 中,给需要闭合的div加上class=”clearfix”即可。
    
    ```css
    .clearfix{overflow: auto;zoom: 1;}
    ```

</details>

<details>
<summary>12. 表单元素行高不一致</summary> 

    - 给表单元素添加float：left（左浮动）；
    - 或者是vertical-align：middle；（垂直对齐方式：居中）

</details>

<details>
<summary>13. 上下margin的重叠问题</summary> 

    - 问题症状：给上边元素设置了margin-bottom，给下边元素设置了margin-top，浏览器只会识别较大值；
    
    - 解决方案：margin-top和margin-bottom中选择一个，只设置其中一个值；

</details>

<details>
<summary>14. body 对象</summary> 

    - 问题症状：FF的 body 在 body 标签没有被浏览器完全读入之前就存在，而IE则必须在 body 完全被读入之后才存在。这会产生在IE下，文档没有载入完时，在body上appendChild会出现空白页面的问题
    - 解决方法：一切在body上插入节点的动作，全部在onload后进行

</details>

<details>
<summary>15. click在ios上有300ms延迟，原因及如何解决？</summary> 

为了实现safari的双击事件的设计

    - 粗暴型，禁用缩放
    
    ```html
       <meta name="viewport" content="width=device-width, user-scalable=no"> 
    ```
    
    - 利用FastClick，其原理是：检测到touchend事件后，立刻出发模拟click事件，并且把浏览器300毫秒之后真正出发的事件给阻断掉

</details>



## prefetch, preload, dns-prefetch，defer和async

参考:[https://segmentfault.com/a/1190000011577248](https://segmentfault.com/a/1190000011577248)



#### dns-prefetch

预先解析DNS

非常简单，效果立竿见影，加快页面加载时间，多用于预解析CDN的地址的DNS

```html
<!--在head标签中，越早越好-->
<link rel="dns-prefetch" href="//example.com">
```



#### preload

浏览器遇到rel='preload'的link标签时，会立即开始下载(不阻塞parser)，并放入内存中，<span style='color:red'>不会执行其中语句</span>。只有当遇到script标签加载相同资源时，浏览器才会直接将预先加载的js执行掉。

<span style='color:red'>parser读到script标签时，如果已下载，则执行，如果没下载完，会等到下载完再执行。</span>

```html
<link rel="preload" href="/main.js" as="script">
```

#### preload的as属性

1. 浏览器可以设置正确的资源加载优先级，这种方式可以确保资源根据其重要性依次加载， 所以，Preload既不会影响重要资源的加载，又不会让次要资源影响自身的加载。、
2. 浏览器可以确保请求是符合内容安全策略的，比如，如果我们的安全策略是`Content-Security-Policy: script-src 'self'`，只允许浏览器执行自家服务器的脚本，as 值为 script 的外部服务器资源就不会被加载。
3. 浏览器能根据 as 的值发送适当的 Accept 头部信息
4. 浏览器通过 as 值能得知资源类型，因此当获取的资源相同时，浏览器能够判断前面获取的资源是否能重用。
5. 可能的 as 值包括："script"、"style"、"image"、"media"、"document"

#### prefetch

浏览器会在空闲时，下载rel='prefetch'的link资源，并缓存到disk。有使用时，从disk缓存读取。

如果还没下载完之前，发现script标签引用了该资源，浏览器会<span style='color:red'>再次发起请求</span>，会严重影响性能，所以不要在当前页面马上要用的资源上用prefetch，要用preload。

```html
<link href="main.js" rel="prefetch">
```



#### defer和async

是script标签的两个属性，用于<span style='color:red'>在不阻塞页面文档解析</span>的前提下，控制脚本的下载和执行。

defer执行时间是在所有元素解析完成后，DOMContentLoaded事件触发前。

async是脚本下载完成后，立即执行。所以多个async脚本执行顺序不是固定的。所以<span style='color:red'>只能用于加载一些独立无依赖的代码，如第三方统计等</span>。而且async<span style='color:red'>会阻塞 window 的 onload 事件</span>。



所以较好的脚本加载顺序如下：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Faster</title>
  <link rel="dns-prefetch" href="//cdn.com/">
  <link rel="preload" href="//js.cdn.com/currentPage-part1.js" as="script">
  <link rel="preload" href="//js.cdn.com/currentPage-part2.js" as="script">
  <link rel="preload" href="//js.cdn.com/currentPage-part3.js" as="script">

  <link rel="prefetch" href="//js.cdn.com/prefetch.js">
</head>
<body>

<script type="text/javascript" src="//js.cdn.com/currentPage-part1.js" defer></script>
<script type="text/javascript" src="//js.cdn.com/currentPage-part2.js" defer></script>
<script type="text/javascript" src="//js.cdn.com/currentPage-part3.js" defer></script>
</body>
</html>
```



你想尽可能快的加载一段统计页面访问量的代码，但又不愿意这段代码的加载给页面渲染造成延迟从而影响用户体验，关键是，你不想延迟 window 的 onload 事件。

有了preload， 分分钟搞定。

```html
<link rel="preload" as="script" href="async_script.js"
      onload="var script = document.createElement('script'); script.src = this.href; document.body.appendChild(script);">
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
  - document.ready
- onload:

  - 页面上所有的资源（图片，音频，视频等）被加载以后才会触发load事件，简单来说，页面的load事件会在DOMContentLoaded被触发之后才触发
  - 所有浏览器都兼容
  - document.onload

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

<details>
<summary>6.如何实现浏览器内多个标签页之间的通信</summary> 

**localstorage**:

- localstorage是浏览器多个标签共用的存储空间，所以可以用来实现多标签之间的通信(ps：session是会话级的存储空间，每个标签页都是单独的）。

-  localstorage 在另一个浏览上下文里被添加、修改或删除时，它都会触发一个事件，我们通过直接在window对象上添加监听事件，控制它的值来进行页面信息通信。

  ```javascript
    window.onstorage = (e) => {console.log(e)}
    // 或者这样
    window.addEventListener('storage', (e) => console.log(e))
    
    onstorage以及storage事件，针对都是非当前页面对localStorage进行修改时才会触发，当前页面修改localStorage不会触发监听函数。然后就是在对原有的数据的值进行修改时才会触发，比如原本已经有一个key为a值为b的localStorage，你再执行：localStorage.setItem('a', 'b')代码，同样是不会触发监听函数的。
  ```
- 注意：Safari 在无痕模式下设置 localstorage 值时会抛出QuotaExceededError 的异常

**WebSocket服务器中转**：

- 需要页面都与服务器建立 WebSockets 连接
- 支持跨域

**cookie**:

使用cookie+setInterval，将要传递的信息存储在cookie中，每隔一定时间读取cookie信息，即可随时获取要传递的信息

```javascript
<input id="name">  
<input type="button" id="btn" value="提交">  
<script type="text/javascript">  
    $(function(){    
        $("#btn").click(function(){    
            var name=$("#name").val();    
            document.cookie="name="+name;    
        });    
    });    
</script>  
标签页2：

<script type="text/javascript">  
    $(function(){   
        function getCookie(key) {    
            return JSON.parse("{\"" + document.cookie.replace(/;\s+/gim,"\",\"").replace(/=/gim, "\":\"") + "\"}")[key];    
        }     
        setInterval(function(){    
            console.log("name=" + getCookie("name"));    
        }, 10000);    
    });  
</script>  

```

**SharedWorker**:

- html5浏览器的新特性
- 普通的webworker直接使用new Worker()即可创建，是**当前页面**专有的。
- 共享worker(SharedWorker)，是可以多个标签页、iframe共同使用的。
- 必须保证这些标签页都是同源的(相同的协议，主机和端口号)

**window.postMessage()** ：

- 支持两个页面跨域
- 只能传递字符串数据（旧版本）

</details>

<details>
<summary>7.webSocket如何兼容低浏览器</summary> 

- Adobe Flash Socket 
- ActiveX HTMLFile (IE) 
- 基于 multipart 编码发送 XHR 
- 基于长轮询的 XHR
- 引用WebSocket.js这个文件来兼容低版本浏览器

</details>

<details>
<summary>8.页面可见性（Page Visibility）API 可以有哪些用途？</summary> 

- 通过visibility state的值来检测页面当前是否可见，以及打开网页的时间。

- 在页面被切换到其他后台进程时，自动暂停音乐或视频的播放。

  备注：


  - Visibilitychange事件监听

  - html5新api，之前可以用下列模拟


    - ```javascript
      // 当前窗口得到焦点
      window.onfocus = function() {
        // 动画
        // ajax 轮询等等
      };
      
      // 当前窗口失去焦点
      window.onblur = function() {
        // 停止动画
        // 停止 ajax 轮询等等
      };
      ```
</details>

<details>
<summary>9.无样式内容闪烁（FOUC）Flash of Unstyle Content</summary> 

@import导入CSS文件会等到文档加载完后再加载CSS样式表。因此，在页面DOM加载完成到CSS导入完成之间会有一段时间页面上的内容是没有样式的。

解决方法：使用link标签加载CSS样式文件。因为link是顺序加载的，这样页面会等到CSS下载完之后再下载HTML文件，这样先布局好，就不会出现FOUC问题。

</details>

<details>
<summary>10.为什么会有双核浏览器？</summary> 

因为有些像网银和公司校园这类网站用Chrome浏览器打不开或会出问题，但却可以用IE浏览器打开。但是对于常见的网站用 IE 浏览器搞不好就会卡死。我们称之为“网站存在兼容性问题”。

鉴于国内的环境，网银和IE内核的关系将长期存在，但是又忍不住webkit的诱惑，所以，才有了双核, 其中一个内核是Trident，然后再增加一个其他内核。国内的厂商一般把其他内核叫做“高速浏览模式”，而Trident则是“兼容浏览模式”，用户可以来回切换。

- 360浏览器、猎豹浏览器内核：IE+Chrome双内核；
- 搜狗、遨游、QQ浏览器内核：Trident（兼容模式）+Webkit（高速模式）


</details>

<details>
<summary>11.从url到页面展现，这之中发生了什么？</summary> 

1. 用户输入网址
2. 浏览器通过DNS获取网站的IP地址。客户端先检查本地是否有对应的IP地址，若找到则返回响应的IP地址。若没找到则请求上级DNS服务器，直至找到或到根节点。

　　> DNS查找IP地址的顺序: 浏览器缓存、系统缓存、互联网服务提供商（ISP）的DNS缓存、递归搜索（从浏览器缓存开始，如果没找到就继续往下一个找。）找到后，浏览器会获得一个IP地址。

3. 浏览器客户端发送http请求

>  HTTP请求包括请求报头和请求主体两个部分，其中请求报头包含了至关重要的信息，包括请求的方法（GET / POST）、目标url、遵循的协议（http / https / ftp…），返回的信息是否需要缓存，以及客户端是否发送cookie等。

4. 传输层TCP传输报文。TCP协议通过“三次握手”等方法保证传输的安全可靠。

5. 网络层IP协议查询MAC地址

>  IP协议的作用是把TCP分割好的各种数据包传送给接收方。而要保证确实能传到接收方还需要接收方的MAC地址，也就是物理地址。IP地址和MAC地址是一一对应的关系，一个网络设备的IP地址可以更换，但是MAC地址一般是固定不变的。ARP协议可以将IP地址解析成对应的MAC地址。当通信的双方不在同一个局域网时，需要多次中转才能到达最终的目标，在中转的过程中需要通过下一个中转站的MAC地址来搜索下一个中转目标。

6. 数据到达数据链路层

>  在找到对方的MAC地址后，就将数据发送到数据链路层传输。这时，客户端发送请求的阶段结束

7. 服务器接收数据

   接收端的服务器在链路层接收到数据包，再层层向上直到应用层。这过程中包括在运输层通过TCP协议将分段的数据包重新组成原来的HTTP请求报文。

8. 服务器响应请求

   服务接收到客户端发送的HTTP请求后，查找客户端请求的资源，并返回响应报文，响应报文中包括一个重要的信息——状态码。

9. 服务器返回响应文件

   请求成功后，服务器会返回相应的HTML文件。接下来就到了页面的渲染阶段了。

10. 页面渲染： 解析HTML以构建DOM树 –> 构建渲染树 –> 布局渲染树 –> 绘制渲染树。

    


</details>

<details>
<summary>12.什么是无头浏览器，它的作用是什么？</summary> 

无头浏览器（headless browser），是一种没有界面的浏览器。既然是浏览器那么浏览器该有的东西它都应该有，只是看不到界面而已。我们日常使用浏览器的步骤为：启动浏览器、打开一个网页、进行交互。而无头浏览器指的是我们使用脚本来执行以上过程的浏览器，能模拟真实的浏览器使用场景。

有了无头浏览器，我们就能做包括但不限于以下事情：

- 对网页进行截图保存为图片或 pdf
- 抓取单页应用(SPA)执行并渲染(解决传统 HTTP 爬虫抓取单页应用难以处理异步请求的问题)
- 做表单的自动提交、UI的自动化测试、模拟键盘输入等
- 用浏览器自带的一些调试工具和性能分析工具帮助我们分析问题
- 在最新的无头浏览器环境里做测试、使用最新浏览器特性
- 写爬虫做你想做的事情~



**PhantomJS, 基于 Webkit**

**SlimerJS, 基于 Gecko**

**HtmlUnit, 基于 Rhnio**

**TrifleJS, 基于 Trident**

**Splash, 基于 Webkit**

</details>

<details>
<summary>13.浏览器是怎么对HTML5的离线储存资源进行管理和加载的呢？</summary> 

- 在线的情况下，浏览器发现html头部有manifest属性，它会请求manifest文件，如果是第一次访问app，那么浏览器就会根据 manifest文件的内容下载相应的资源并且进行离线存储。如果已经访问过app并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后 浏览器会对比新的manifest文件与旧的manifest文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。

- 离线的情况下，浏览器就直接使用离线存储的资源。


</details>

<details>
<summary>14.浏览器本地存储</summary> 

1. **cookie**

  - cookie的特点是会随着HTTP请求头信息一起发送，
  - 大小和数目受限制，不同浏览器cookie大小不一样，一般为4kb，而IE6大约只有2K。

  - 不可以跨域
  - 有的移动端浏览器不支持cookie或浏览器禁用cookie
  - 浪费带宽，因为我每次请求一个新的页面，cookie都会被自动发送过去
  - 易被人拦截

2. **userData**

  userData只能在IE浏览器来存储数据，容量可以达到640K。

3. **sessionStorage**

   临时存储，只支持一些高版本的浏览器（ie不支持），用这种方式存储的数据仅窗口级别有效，当新开窗口或者关闭页面时，原来的数据就失效了。

4. **globalStorage**

   只支持高版本的浏览器，类似于IE的userData。

5. **localStorage**

   localStorage是Web Storage互联网存储规范中的一部分，大部分浏览器都能支持。

</details>

<details>
<summary>15.浏览器兼容性问题</summary> 

参见上一节


</details>

<details>
<summary>16.Doctype作用？标准模式与兼容模式各有什么区别?HTML5 为什么只需要写 DOCTYPE HTML？</summary> 

参见 [DOM节点](study/frontend/dom/node?id=_12种节点类型)

1.  _<!DOCTYPE>声明位于位于HTML文档中的第一行，处于 <html> 标签之前。告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE不存在或格式不正确会<span style='color:red'>导致文档以兼容模式呈现</span>。

2. 标准模式的排版 和JS运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。

3. HTML5 不基于 SGML，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为（让浏览器按照它们应该的方式来运行）而HTML4.01基于SGML,所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型。

</details>

<details>
<summary>17.如何区分HTML5</summary> 

- DOCTYPE声明
- 新增的结构元素
- 功能元素

</details>

<details>
<summary>18.HTML与XHTML的区别</summary> 

- XHTML 与 HTML 4.01 标准没有太多的不同
- XHTML 元素必须被正确地嵌套。
- XHTML 元素必须被关闭。
- 标签名必须用小写字母。
- XHTML 文档必须拥有根元素。

</details>


<details>
<summary>19.判断IE6,7,8</summary> 

```
 var isIE=!!window.ActiveXObject;
 var isIE6=isIE&&!window.XMLHttpRequest;
 var isIE8=isIE&&!!document.documentMode;
 var isIE7=isIE&&!isIE6&&!isIE8;
```


</details>





