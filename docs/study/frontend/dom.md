

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



## DOM共12种节点

常见节点类型：

- 文档DOCUMENT_NODE（根节点） ：文档节点是整个文档中所有其他节点的父节点。

- 元素节点ELEMENT_NODE：元素可以有其他元素、文本节点或两者兼有来作为其子节点。

- 文本节点TEXT_NODE：确切来讲，文本节点是文本。它可以包含许多信息或为空。

- 属性节点ATTRIBUTE_NODE：属性节点包含关于元素节点的信息。

- 较不常见的节点类型：注释、处理指令等。




## DOM获取节点

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



!> 由于节点比较多，所以一般用遍历元素节点的方法

**parentElement**：返回当前元素的父元素节点

**children**：返回当前元素的元素子节点

**firstElementChild**：返回的是第一个元素子节点

**lastElementChild**：返回的是最后一个元素子节点

**nextElementSibling**：返回的是后一个兄弟元素节点

**previousElementSibling**：返回的是前一个兄弟元素节点



