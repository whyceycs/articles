

# DOM节点



## 12种节点类型

|                     节点名                      |                             | nodeType |      **nodeName**       |           **nodeValue**           |
| :---------------------------------------------: | :-------------------------- | :------: | :---------------------: | :-------------------------------: |
|                    元素节点                     | ELEMENT_NODE                |    1     | 标签名(大写)，P,DIV,... |               null                |
|                    属性节点                     | ATTRIBUTE_NODE              |    2     |         属性名          |              属性值               |
|                    文本节点                     | TEXT_NODE                   |    3     |          #text          |             文本内容              |
|    <span style='color:red'>CDATA节点</span>     | CDATA_SECTION_NODE          |    4     |     #cdata-section      |          CDATA区域的内容          |
| <span style='color:red'>实体引用名称节点</span> | ENTRY_REFERENCE_NODE        |    5     |        引用名称         |               null                |
|   <span style='color:red'>实体名称节点</span>   | ENTITY_NODE                 |    6     |        实体名称         |               null                |
|   <span style='color:red'>处理指令节点</span>   | PROCESSING_INSTRUCTION_NODE |    7     |         target          | entire content cluding the target |
|                    注释节点                     | COMMENT_NODE                |    8     |        #comment         |             注释内容              |
|                    文档节点                     | DOCUMENT_NODE               |    9     |        #document        |               null                |
|                  文档类型节点                   | DOCUMENT_TYPE_NODE          |    10    |      doctype的名称      |               null                |
|                  文档片段节点                   | DOCUMENT_FRAGMENT_NODE      |    11    |   #document-fragment    |               null                |
|   <span style='color:red'>DTD声明节点</span>    | NOTATION_NODE               |    12    |        符号名称         |               null                |



1. **元素节点**：元素节点对应网页的HTML标签元素。

   ```
   // 1 'BODY' null
   2 console.log(document.body.nodeType,document.body.nodeName,document.body.nodeValue)
   3 console.log(Node.ELEMENT_NODE === 1);//true
   ```

2. **属性节点**：属性节点对应网页中HTML标签的属性，它只存在于元素的attributes属性中，<span style='color:red'>并不是DOM文档树的一部分</span>。

   ```
   <div id="test"></div>
   <script>
       var attr = test.attributes.id;
       //2 'id' 'test'
       console.log(attr.nodeType,attr.nodeName,attr.nodeValue)
       console.log(Node.ATTRIBUTE_NODE === 2);//true 
   </script>
   ```

3. **文本节点**：文本节点代表网页中的HTML标签内容。

   1. 它可以包含许多信息或为空

   ```
   <div id="test">测试</div>
   <script>
       var txt = test.firstChild;
       //3 '#text' '测试'
       console.log(txt.nodeType,txt.nodeName,txt.nodeValue)
       console.log(Node.TEXT_NODE === 3);//true 
   </script>
   ```

!> **4,5,6,7红色节点是针对XML文档的，HTML中未出现，略过。**

8. **注释节点**：注释节点comment表示网页中的HTML注释。

   1. 注释节点没有子节点

   ```
   <div id="myDiv"><!-- 我是注释内容 --></div>
   <script>
       var com = myDiv.firstChild;
       //8 '#comment' '我是注释内容'
       console.log(com.nodeType,com.nodeName,com.nodeValue)
       console.log(Node.COMMENT_NODE === 8);//true 
   </script>
   ```

5. **文档节点**：文档节点表示HTML文档，也称为根节点，<span style='color:red'>指向document对象</span>。

   ```
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>Document</title>
   </head>
   <body>
   <script>
       var nodeDocumentType = document.firstChild;
       //10 "html" null
   console.log(nodeDocumentType.nodeType,nodeDocumentType.nodeName,nodeDocumentType.nodeValue);
       console.log(Node.DOCUMENT_TYPE_NODE === 10);
   </script>
   </body>
   </html>
   ```

6. **文档类型节点**：<!DOCTYPE html>这部分

   1. 文档类型节点有一个快捷写法是document.doctype，但是该写法IE8-浏览器不支持
   2. 文档类型节点没有子节点
   3. IE8-浏览器将标签名为"!"的元素视作注释节点，所以文档声明也被视作<span style='color:red'>注释节点</span>。
   4. 我们都知道HTML有HTML4.01，XHTML等等，每种版本的标记语言中还有三种细分的定义：Strict（严格）、Transitional（过渡）、Frameset（框架集）。如果没写DTD，浏览器就不知道正在处理的文档是用哪种标记语言来写的，就造成了解析结果的不同，最常见的错误就是用XHTML较为严格的规范来解析以HTML这种宽松标准所构建的文本，自然会出现很多问题。w3c给出的解释是：由于HTML4.01基于SGML，DTD规定了标记语言的规则，故需要在HTML声明中引用DTD。在如今的HTML5时代，由于HTML5不基于SGML，故我们也不再需要在文档声明中包含DTD信息，使用<!DOCTYPE HTML>即可。

   ```
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>Document</title>
   </head>
   <body>
   <script>
   //IE8-浏览器不支持document.doctype
   var oDoctype = document.doctype;
   if(oDoctype){
       // html 10 null
       console.log(oDoctype.nodeName,oDoctype.nodeType,oDoctype.nodeValue);
       //#document []
       console.log(oDoctype.parentNode,oDoctype.childNodes)
   }
   </script>
   </body>
   </html>
   ```

7. **文档片段节点**：DocumentFragment，是唯一在HTML文档中没有对应标记的节点，不会在我们编写的HTML代码中。

   1. 文档片段是一种轻量级的文档，可以包含很多DOM节点。

   2. 如果DOM操作非常多的话，就会不断地进行页面重绘，带来沉重的浏览器负担，拖慢运行速度。如果<span style='color:red'>将节点加入文档片段之中，这些节点就会脱离文档树，这个时候进行DOM操作的话就不会造成页面重绘</span>。等大量DOM操作都执行完成之后，再<span style='color:red'>将文档片段添加到页面中</span>，这时完成操作的节点会一次性渲染完毕，避免了多次渲染带来的性能拖慢。

   3. JavaScript提供了<span style='color:red'>document.createDocumentFragment()</span>方法

   4. 若使用IE浏览器，则使用文档片段DocumentFragment的性能并不会更好，反而变差

   5. 若使用chrome和firefox浏览器，使用文档片段DocumentFragment可以提升性能

      ```
       function appendItems() {
              const fragment = document.createDocumentFragment();
              for (let i = 0; i < 10; i++) {
                  const ndItem = document.createElement('li');
                  ndItem.innerText = i + 1;
                  fragment.appendChild(ndItem);
              }
              // 每次批处理只修改 1 次 DOM
              ndContainer.appendChild(fragment);
              doBatchAppend();
          }
      ```

      



!> **12红色节点是针对XML文档的，HTML中未出现，略过。**



## 延伸：requestAnimationFrame

```tex
计时器一直是javascript动画的核心技术。而编写动画循环的关键是要知道延迟时间多长合适。一方面，循环间隔必须足够短，这样才能让不同的动画效果显得平滑流畅；另一方面，循环间隔还要足够长，这样才能确保浏览器有能力渲染产生的变化。
大多数电脑显示器的刷新频率是60Hz，大概相当于每秒钟重绘60次。大多数浏览器都会对重绘操作加以限制，不超过显示器的重绘频率，因为即使超过那个频率用户体验也不会有提升。因此，最平滑动画的最佳循环间隔是1000ms/60，约等于16.6ms。
而setTimeout和setInterval的问题是，它们都不精确。它们的内在运行机制决定了时间间隔参数实际上只是指定了把动画代码添加到浏览器UI线程队列中以等待执行的时间。如果队列前面已经加入了其他任务，那动画代码就要等前面的任务完成后再执行。
requestAnimationFrame采用系统时间间隔，保持最佳绘制效率，不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间太长，使用动画卡顿不流畅，让各种网页动画效果能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。
```

1. requestAnimationFrame会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率
2. 在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的CPU、GPU和内存使用量
3. requestAnimationFrame是由浏览器专门为动画提供的API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了CPU开销
4. HTML5新增的定时器，会有兼容问题。IE9-浏览器不支持该方法，可以使用setTimeout来兼容
5. <span style='color:red'>React Fiber</span>中使用到了这一方法.
   1. React16 以前，对virtural dom的更新和渲染是同步的。就是当一次更新或者一次加载开始以后，diff virtual dom并且渲染的过程是一口气完成的。如果组件层级比较深，相应的堆栈也会很深，长时间占用浏览器主线程，一些类似用户输入、鼠标滚动等操作得不到响应。
   2. React16 用了分片的方式解决上面的问题。 (React16 Fiber Reconciler)
      就是把一个任务分成很多小片，当分配给这个小片的时间用尽的时候，就检查任务列表中有没有新的、优先级更高的任务，有就做这个新任务，没有就继续做原来的任务。这种方式被叫做异步渲染(Async Rendering)。

```javascript
requestAnimationFrame的用法与settimeout很相似，只是不需要设置时间间隔而已。requestAnimationFrame使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。它返回一个整数，表示定时器的编号，这个值可以传递给cancelAnimationFrame用于取消这个函数的执行

requestID = requestAnimationFrame(callback); 
//控制台输出1和0
var timer = requestAnimationFrame(function(){
    console.log(0);
}); 
console.log(timer);//1
cancelAnimationFrame方法用于取消定时器 
cancelAnimationFrame(timer);
也可以直接使用返回值进行取消
cancelAnimationFrame(1);
```




## DOM操作 - 获取节点

**document.getElementById**:返回对拥有指定 ID 的<span style='color:red'>第一个</span>对象的引用

```
document.getElementById("myHeader");
<h1 id="myHeader" onclick="getValue()">This is a header</h1>
```

**document.getElement<span style='color:red'>s</span>ByName**:返回带有指定名称的对象的集合

```
document.getElementsByName("myInput");
<input name="myInput" type="text" size="20" /><br />
<input name="myInput" type="text" size="20" /><br />
<input name="myInput" type="text" size="20" /><br />
```

**<span style='color:red'>document</span>.getElement<span style='color:red'>s</span>ByTagName**:返回带有指定标签名的对象的集合

**<span style='color:red'>element</span>.getElement<span style='color:red'>s</span>ByTagName**:返回带有指定标签名的对象的集合

​	如果把特殊字符串 "*" 传递给 getElementsByTagName() 方法，它将返回文档中所有元素的列表，元素排列的顺序就是它们在文档中的顺序

```
document.getElementsByTagName("input");
<input name="myInput" type="text" size="20" /><br />
<input name="myInput" type="text" size="20" /><br />
<input name="myInput" type="text" size="20" /><br />
```

**<span style='color:red'>document</span>.getElement<span style='color:red'>s</span>ByClassName：返回包含 class="指定类" 的所有元素的一个列表：**

**<span style='color:red'>element</span>.getElement<span style='color:red'>s</span>ByClassName：返回包含 class="指定类" 的所有元素的一个列表：**

​	getElementsByClassName() 在 Internet Explorer 5,6,7,8 中无效。



**element.querySelector("cssSelector")**：只选一个，返回一个对象。返回的是静态的

```javascript
获取文档中第一个 <p> 元素：
document.querySelector("p");

获取文档中 class="example" 的第一个元素:
document.querySelector(".example");

获取文档中 class="example" 的第一个 <p> 元素:
document.querySelector("p.example");

获取文档中有 "target" 属性的第一个 <a> 元素：
document.querySelector("a[target]");

假定你选择了两个选择器: <h2> 和 <h3> 元素。
以下代码将为文档的第一个 <h2> 元素添加背景颜色：
<h2>A h2 element</h2>
<h3>A h3 element</h3>
document.querySelector("h2, h3").style.backgroundColor = "red";

但是，如果文档中 <h3> 元素位于 <h2> 元素之前，<h3> 元素将会被设置指定的背景颜色。
<h3>A h3 element</h3>
<h2>A h2 element</h2>
document.querySelector("h2, h3").style.backgroundColor = "red";
```



**element.querySelectorAll("cssSelector")**：选择一个集合，返回一个和NodeList一样的类数组对象。返回的是静态的

```javascript
获取文档中所有的 <p> 元素， 并为匹配的第一个 <p> 元素 (索引为 0) 设置背景颜色:
// 获取文档中所有的 <p> 元素
var x = document.querySelectorAll("p"); 
// 设置第一个 <p> 元素的背景颜色
x[0].style.backgroundColor = "red";

获取文档中所有 class="example" 的 <p> 元素， 并为匹配的第一个 <p> 元素 (索引为 0) 设置背景颜色:
// 获取文档中所有 class="example" 的 <p> 元素
var x = document.querySelectorAll("p.example"); 
// 设置 class="example" 的第一个 <p> 元素的背景颜色
x[0].style.backgroundColor = "red";

计算文档中 class="example" 的 <p> 元素的数量（使用 NodeList 对象的 length 属性）:
var x = document.querySelectorAll(".example").length;

设置文档中所有 class="example" 元素的背景颜色:
var x = document.querySelectorAll(".example");
var i;
for (i = 0; i < x.length; i++) {
    x[i].style.backgroundColor = "red";
}

设置文档中所有 <p> 元素的背景颜色：
var x = document.querySelectorAll(".example");
var i;
for (i = 0; i < x.length; i++) {
    x[i].style.backgroundColor = "red";
}

查找文档中共包含 "target" 属性的 <a> 标签，并为其设置边框:
var x = document.querySelectorAll("a[target]");
var i;
for (i = 0; i < x.length; i++) {
    x[i].style.border = "10px solid red";
}

查找每个父元素为 <div> 的 <p> 元素，并为其设置背景颜色:
var x = document.querySelectorAll("div > p");
var i;
for (i = 0; i < x.length; i++) {
    x[i].style.backgroundColor = "red";
}

给文档中所有的 <h2>, <div> 和 <span> 元素设置背景颜色：
var x = document.querySelectorAll("h2, div, span");
var i;
for (i = 0; i < x.length; i++) {
    x[i].style.backgroundColor = "red";
}
```



浏览器对Element.querySelector和Element.querySelectorAll的实现有错误。大神Andrew Dupont提出了一种方法修复这个bug，被广泛应用到各个框架中，在selector前面指定调用元素的id，限制匹配范围。给搜索加了一层id的限制，巧妙的利用了这个bug，得到正确结果



### 节点与元素节点

| 节点             |                                                | 元素节点                |                            |
| ---------------- | ---------------------------------------------- | ----------------------- | -------------------------- |
| .parentNode      | 返回某节点的父节点，没有父节点则返回 null      | .parentElement          | 返回当前元素的父元素节点   |
| .childNodes      | childNodes只会返回文本和元素的节点             | .children               | 返回当前元素的元素子节点   |
| .firstChild      | 返回被选节点的第一个子节点                     | .firstElementChild      | 返回的是第一个元素子节点   |
| .lastChild       | 返回文档的最后一个子节点                       | .lastElementChild       | 返回的是最后一个元素子节点 |
| .nextSibling     | 返回某个元素之后紧跟的节点（处于同一树层级中） | .nextElementSibling     | 返回的是后一个兄弟元素节点 |
| .previousSibling | 返回某节点之前紧跟的节点（处于同一树层级）     | .previousElementSibling | 返回的是前一个兄弟元素节点 |

1. 由于节点比较多，所以一般用元素节点的方法
2. 如需循环子节点列表，使用 nextSibling 属性，要比使用父对象的 childNodes 列表效率更高
3. document子节点的parentElement为空，parentNode为#document



### 创建节点

**Document.createElement(tagName)**:创建元素节点

**Document.createTextNode(textContent)**:创建文本节点

```html
element.appendChild(textNode);
```



### 节点操作

!> 如果节点有父节点，会先从父节点移除

**添加：parentElement.appendChild(willAppendElement)**：加入的节点为父节点的最后一个节点;

**前插入：parentElement.insertBefore(willInsertElement,reference element)**：在参照节点（reference element）之前插入节点(willInsertElement),两个互为同胞（兄弟）节点;

**替换：parentElement.replaceChild(willInsertElement,willReplaceElement)**：用插入的节点(willInsertElement)代替willReplaceElement节点;

**移除：parentElement.removeChild(willRemoveElement)**：从DOM树中移除willRemoveElement节点;

**深浅复制：ele=element.cloneNode(true|false)**：若true,则表示深度复制element节点,会复制起子节点;若false,表示浅复制,只复制element节点本身,不复制element子代节点;

**后插入**：

```
function insertAfter(ele,ins){
    ele.parentNode.insertBefore(ins,ele.nextSibling);
}
```



## 元素属性操作



 ### 获取

element.getAttribute("attributeName")*;*

**tagName**：获取节点的标签名

**innerHTML**：设置或者获取节点内部的所有HTML代码

**innerText**：设置或者获取节点内部的所有文字

### 设置

element.setAttribute("attributeName","value")*;*

**为元素设置新的样式，注意驼峰命名法**

div1.style.backgroundColor="red";

**为元素同时修改多个样式cssText**

div1.style.cssText="width:100px;height:100px";

### 移除

element.removeAttribute("attributeName")*;*



### class属性

由于class是es6关键字，所以用className代替

由于class属性一般可以有多个 class='class1 class2 class3...'

所以添加class应使用：

```html
element.className=element.className+" add";注意空格
```

删除class 封装方法：

```
HTMLElement.prototype.deleteClassName=function(del){
        var classes=this.className.split(/\s+/);
        for(var i=0;i<classes.length;i++){
            if(classes[i]===del){
                classes.splice(i,1);
                break;
            }
        }
        this.className=classes.join(" ");
    }//后面会用到这里的代码
```



!> 原型链 HTMLDIVElement < HTMLElement < Element < Node < EventTarget < Object



### 通过原型链的 <span style='color:red'>对象.属性</span> 来访问修改

element.id、element.className ...



### HTML5自定义属性，data-前缀加自定属性名

1. 通过getAttribute()和setAttribute()来获取和设置。**set/getAttribute() 继承自Element中**

2. 通过查询原型链我们发现原型中有一个dataset属性，指向DOMStringMap原型对象，他是专门记录我们自定义属性的。我们可以通过 `element.dataset.属性的后缀名` 来设置和访问，**dataset方法继承自HTMLElement原型对象**

3. 过查询原型链我们发现原型中有一个attributes属性，指向NamedNodeMap对象，NamedNodeMap是一个和NodeList类似的类数组对象，他记录着元素的这个元素全部属性，他**继承自HTMLElement原型对象**；我们可以用 element.attributes[i].nodeValue 来获取共有的和自定义属性的属性值。

   !> 特别地，attributes/NamedNodeMap对象在我们序列化元素的所有属性名和对应的属性值时很方便
