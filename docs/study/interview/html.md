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



### 浏览器渲染原理???todo

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

```
    页面的显示过程分为以下几个阶段：
    1、生成DOM树(包括display:none的节点)
    
    2、在DOM树的基础上根据节点的集合属性(margin,padding,width,height等)生成render树(不包括display:none，head节点，但是包括visibility:hidden的节点)
    
    3、在render树的基础上继续渲染颜色背景色等样式
```

### 回流与重绘

[回流与重绘](study/interview/reflowrepaint.md)