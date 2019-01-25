# DOM事件



## 事件流



流是具有方向的数据。

事件流：从页面中接受事件的顺序。

有两种观点，事件冒泡和事件捕获。例如：*当点击按钮时，是按钮最外层的父元素先收到事件并执行，还是具体元素先收到事件并执行*

**现主流是事件冒泡。**



### 事件冒泡

事件冒泡即事件开始时，由最具体的元素接收（也就是事件发生所在的节点），然后逐级传播到较为不具体的节点。

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Event Bubbling</title>
</head>
<body>
  <button id="clickMe">Click Me</button>
</body>
</html>
```

点击button后，事件传递为：<span style='color:red'>button > body > document > window</span>

### 事件捕获

事件捕获的概念，与事件冒泡正好相反。它认为当某个事件发生时，父元素应该更早接收到事件，具体元素则最后接收到事件。

比如上面的demo，如果是事件捕获的话，事件发生顺序会是这样的：<span style='color:red'>window > document > body > button</span>



### 事件阶段（Event Phases）

![event_phases](study/frontend/dom/event_phases.png)

