

# DOM 



**文档对象模型（Document Object Model，DOM）是一种用于HTML和XML文档的编程接口。它给文档提供了一种结构化的表示方法，可以改变文档的内容和呈现方式。**

1. W3C 文档对象模型 （DOM） 是中立于平台和语言的接口，它允许程序和脚本动态地访问和更新文档的内容、结构和样式。

2. DOM定义了HTML文档和XML文档的逻辑结构（DOM树），给出了一种访问和处理这两种文档的方法。

3. 文档代表的是数据，而DOM则代表了如何去处理这些数据

4. W3C DOM 标准被分为 3 个不同的部分：

   - Core Dom ：核心Dom，针对任何结构化文档的标准模型
   - XML DOM：用于XML文档的标准模型，对XML元素进行操作
   - HTML DOM： 用于HTML文档的标准模型，对HTML元素进行操作。

5. Core Dom是结构化文档比较底层对象的集合，这一部分所定义的对象已经完全可以表达出任何HTML和XML文档中的数据了。

   HTML DOM和XML DOM两部分则是专为操作具体HTML文档和XML文档所提供的方法。



**DOM共12种节点**

常见节点类型：

- 文档DOCUMENT_NODE（根节点） ：文档节点是整个文档中所有其他节点的父节点。

- 元素节点ELEMENT_NODE：元素可以有其他元素、文本节点或两者兼有来作为其子节点。

- 文本节点TEXT_NODE：确切来讲，文本节点是文本。它可以包含许多信息或为空。

- 属性节点ATTRIBUTE_NODE：属性节点包含关于元素节点的信息。

- 较不常见的节点类型：注释、处理指令等。



## DOM操作


### 获取节点

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

**element.querySelectorAll("cssSelector")**：选择一个集合，返回一个和NodeList一样的类数组对象。返回的是静态的



!> 由于节点比较多，所以一般用元素节点的方法

**parentElement**：返回当前元素的父元素节点

**children**：返回当前元素的元素子节点

**firstElementChild**：返回的是第一个元素子节点

**lastElementChild**：返回的是最后一个元素子节点

**nextElementSibling**：返回的是后一个兄弟元素节点

**previousElementSibling**：返回的是前一个兄弟元素节点



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
