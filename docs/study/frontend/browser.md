

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
- Firefox：Gecko
  - 代码公开，可开发程度高。跨平台引擎
- Opera：Presto ---> Blink
  - 商用Presto内核，后转为Blink内核

- 双核浏览器：遨游浏览器，360安全浏览器：一个为IE的**Trident**，另一个常为**Webkit**。



## 渲染原理

参考：[http://www.cnblogs.com/slly/p/6640761.html](http://www.cnblogs.com/slly/p/6640761.html)



### 基本流程：

通过网络(通常以8k分块的方式)获得请求文档的内容。之后：

1. 解析html构建dom树  [<span style='color:red'>Parsing HTML to construct the DOM tree</span>]

2. 构建render树  [<span style='color:red'>Render tree construction</span>]

!> display:none的节点不加入render树,而visibility:hidden的节点会。所以如果某个节点最开始不显示，设为display:none更优

3. 布局render树  [<span style='color:red'>Layout of the render tree</span>]

4. 绘制render树   [<span style='color:red'>Painting the render tree</span>]

### 相关名词：

DOM Tree：浏览器将html解析成树形的数据结构

CSS Rule Tree：浏览器将CSS解析成树形的数据结构

Render Tree：DOM 和CSSOM合并后生成Render Tree

Layout：有了Render Tree，浏览器已经知道网页中有哪些节点、各个节点的CSS定义以及它们的从属关系，从而去计算各个节点在屏幕中的位置。

Painting：按照计算出来的规则，通过显卡，把内容画到屏幕上。

reflow：回流。当浏览器发现某个部分发生变化影响了布局，需要倒回去重新渲染。回流会从<html>这个root frame开始递归往下，依次计算所有的节点几何尺寸和位置。[<span style='color:red'>详见后文</span>]

repaint：重绘。改变某个元素的背景色，颜色等不影响内外部布局的属性时，屏幕这部分要重画，但是元素的几何尺寸没变。[<span style='color:red'>详见后文</span>]

