

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







## DOM操作 - 创建节点

### 1. 创建一个属性节点

   document.createAttribute(*attributename*)

   ```
   创建 class 属性, 属性值为 "democlass", 并将clas属性添加到 H1 元素中:
   var att=document.createAttribute("class");
   att.value="democlass";
   document.getElementsByTagName("H1")[0].setAttributeNode(att);
   ```

### 2. 创建注释节点

   document.createComment(*text*)

   ```
   可创建注释节点, 并插入HTML文档:
   var c=document.createComment("My personal comments");
   document.body.appendChild(c);
   输出结果：
   <!--My personal comments-->
   ```

   

### 3. 创建空的 DocumentFragment 对象

   document.createDocumentFragment()

   ```
   创建一个 documentFragment 节点:
   var d=document.createDocumentFragment();
   d.appendChild(document.getElementsByTagName("LI")[0]);
   d.childNodes[0].childNodes[0].nodeValue="Milk";
   document.getElementsByTagName("UL")[0].appendChild(d);
   ```

   

### 4. 创建元素节点

   document.createElement(*tagName*)

   ```
   创建一个按钮:
   var btn=document.createElement("BUTTON");
   ```

   

### 5. 创建文本节点

   document.createTextNode(*text*)

   ```
   创建一个文本节点:
   var btn=document.createTextNode("Hello World");
   
   HTML元素通常是由元素节点和文本节点组成。
   创建一个标题 (H1), 你必须创建 "H1" 元素和文本节点:
   var h=document.createElement("H1")
   var t=document.createTextNode("Hello World");
   h.appendChild(t);
   ```

   







## DOM操作 - 操作节点

!> 如果节点有父节点，会先从父节点移除



### 1. 添加节点

   *node*.appendChild(*node*)

   ```
   如果文档树中已经存在了 newchild，它将从文档树中删除，然后重新插入它的新位置。如果 newchild 是 DocumentFragment 节点，则不会直接插入它，而是把它的子节点按序插入当前节点的 childNodes[] 数组的末尾。
   你可以使用 appendChild() 方法移除元素到另外一个元素。
   var node=document.getElementById("myList2").lastChild;
   document.getElementById("myList1").appendChild(node);
   ```

### 2. 前插入节点

   *node*.insertBefore(*newnode,existingnode*)

   两个互为兄弟节点

### 3. 替换节点

   *node*.replaceChild(*newnode*,*oldnode*)

### 4. 移除节点

   *node*.removeChild(*node*)

### 5. 深浅复制节点

   *node*.cloneNode(*deep*)

   若true,则表示深度复制element节点,会复制起子节点;若false,表示浅复制,只复制element节点本身,不复制element子代节点

*无法复制绑定的事件监听器*

### 6. 后插入

   自己实现

```
function insertAfter(ele,ins){
    ele.parentNode.insertBefore(ins,ele.nextSibling);
}
```



## DOM操作 - 元素属性



 ### 获取属性

1. 使用**element.getAttribute("attributeName")*;***
2. 使用原型链的 <span style='color:red'>对象.属性</span> 来访问
   1. element.tagName：获取节点的标签名
   2. element.innerHTML：获取节点内部的所有HTML代码
   3. element.innerText：获取节点内部的所有文字



### 设置修改属性

1. 使用**element.setAttribute("attributeName","value")*;***
2. 使用原型链的 <span style='color:red'>对象.属性</span> 来修改****
3. 为元素设置新样式，注意驼峰命名法
   1. div1.style.backgroundColor="red";
   2. 同时修改多个样式：div1.style.<span style='color:red'>cssText</span>="width:100px;height:100px";

### 移除属性

1. 使用**element.removeAttribute("attributeName")*;***

!> 原型链 HTMLDIVElement < HTMLElement < Element < Node < EventTarget < Object

### 延伸 - class属性

1. class是es6关键字，所以用**className**代替
2. 由于class属性一般可以有多个 class='class1 class2 class3...'所以添加class应使用html5的**.classList.add**或者

```html
element.className=element.className+" newClassName";注意空格
```

3. 删除class采用**.classList.remove**或者封装方法：

```
HTMLElement.prototype.deleteClassName=function(del){
        var classes=this.className.split(' ');
        for(var i=0;i<classes.length;i++){
            if(classes[i]===del){
                classes.splice(i,1);
                break;
            }
        }
        this.className=classes.join(" ");
    }//后面会用到这里的代码
```



### data-前缀加自定属性名

1. HTML5的自定义属性名
2. 通过getAttribute()和setAttribute()来获取和设置。**set/getAttribute() 继承自Element中**
3. 通过查询原型链我们发现原型中有一个dataset属性，指向DOMStringMap原型对象，他是专门记录我们自定义属性的。我们可以通过 `element.dataset.属性的后缀名` 来设置和访问，**dataset方法继承自HTMLElement原型对象**
4. 过查询原型链我们发现原型中有一个attributes属性，指向NamedNodeMap对象，NamedNodeMap是一个和NodeList类似的类数组对象，他记录着元素的这个元素全部属性，他**继承自HTMLElement原型对象**；我们可以用 element.attributes[i].nodeValue 来获取共有的和自定义属性的属性值。

!> 特别地，attributes/NamedNodeMap对象在我们序列化元素的所有属性名和对应的属性值时很方便



## 面试相关



<details>
<summary>1.自己封装hasChildren()方法，不可用children属性</summary> 

```javascript

Element.prototype.hasChildren = function () {
	var child = this.childNodes;
	var len = child.length;
	var arr = [];
	for(var i = 0; i < len; i++){
		if(child[i].nodeType == 1){
			arr.push(child[i]);
		}
	}
	return arr;
}
```

</details>

<details>
<summary>2.找第n个兄弟节点</summary> 

封装函数，返回元素ele的第n个兄弟节点，n为正，返回后面的兄弟节点，n为负，返回前面的，n为0，返回自己

```javascript
function retSiblings (ele, n) {
	while(ele && n) {
		if(n > 0 && ele.nextElementSibling) {
			n--;
			ele = ele.nextElementSibling;	//注意是要Element，否则会返回text节点即空格
		} else if(ele.previousElementSibling){
			n ++;
			ele = ele.previousElementSibling;
		}
	}
	return ele;
}

```

- 负数也是true
- 没找到返回null
- 不兼容nextElementSibling/previousElementSibling 的情况下，查找nodeType为1的nextSibling/previousSibling

 

</details>

<details>
<summary>3.封装函数insertAfter()</summary> 

```
//原型
Element.prototype.insertAfter = function (newNode, existNode) {	
//第二个参数为null时，同appendChild
	this.insertBefore(newNode, existNode.nextElementSibling);
}
```

```
function insertAfter(newNode, existNode){
    existNode.parentNode.insertBefore(newNode,existNode.nextSibling);
}
```



</details>

<details>
<summary>4.将目标节点内部的节点顺序，逆序。</summary> 
```
<div> <a></a> <em></em></div> ---->    <div><em></em><a></a></div>
```

```

function reverseChildrens (parent){
	var lastChild = parent.lastChild;
	var pre;
	while(pre = lastChild.previousSibling){
		var temp = parent.removeChild(pre);
		parent.appendChild(temp);
	}
}
```




</details>

<details>
<summary>5.DOM是哪种基本的数据结构</summary> 

树结构

</details>

<details>
<summary>6.DOM节点的Attribute和property有何区别</summary> 

- property是DOM中的属性，是JavaScript里的对象；
- attribute是HTML标签上的特性，它的值只能够是字符串；

- property能够从attribute中得到同步；

- attribute不会同步property上的值；

- attribute和property之间的**数据绑定是单向的**，attribute->property；

- 更改property和attribute上的任意值，都会将更新反映到HTML页面中；

- **对属性Property可以赋任何类型的值，而对特性Attribute只能赋值字符串！**

- Attribute中**class**变为property时，为**className**，因为是保留关键字

</details>


<details>
<summary>7.html能通过document获得吗？</summary> 

- document.body是DOM中Document对象里的body节点
- document.documentElement是文档对象根节点(html)的引用

</details>



