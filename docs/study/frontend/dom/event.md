# DOM事件



参考：[http://www.cnblogs.com/starof/p/4066381.html](http://www.cnblogs.com/starof/p/4066381.html)

## 事件流



流是具有方向的数据。

事件流：从页面中接受事件的顺序。

- IE：:事件冒泡流，事件冒泡，事件从最具体的元素接收，然后逐级向上传播，主流浏览器都支持
- Netscape：事件捕获流，从最不具体的节点向下逐级传播到最具体的节点
- w3c：任何发生在w3c事件模型中的事件，首是进入捕获阶段，直到达到目标元素，再进入冒泡阶段。对于正常的web开发，可以选择是在捕获阶段还是冒泡阶段绑定事件处理函数，这是通过addEventListener()方法实现的。

**现主流是事件冒泡。**



## DOM事件相关级别

- **DOM0**：直接通过 onclick写在html里面的事件
  - DOM0的事件具有极好的跨浏览器优势, 会以最快的速度绑定, 如果你通过DOM2绑定要等到JS运行, DOM0不用, 因为DOM0是写在元素上面的哇
  - 只能绑定一个
- **DOM2**：通过 ***addEventListener*** 绑定的事件, 还有IE下的DOM2事件通过 ***attachEvent*** 绑定;
  - DOM2级的事件规定了事件流包含三个阶段包括:**捕获阶段 - 目标阶段 - 冒泡阶段**
  - IE8以及更早版本不支持DOM事件流
- **DOM3**：一些新的事件，除了鼠标点击click事件外，还提供了键盘按压、弹起等类型



## 事件阶段（Event Phases）

![event_phases](https://whyceycs.github.io/articles/study/frontend/dom/event_phases.png)

当一个DOM事件触发时，它不是在触发的对象上只触发一次的，而是经历三个阶段。分别为

1. 一开始从文档的根节点流向目标对象（捕获阶段）

   1. 事件从文档的根节点出发，<span style='color:red'>随着DOM树的结构</span>向事件的目标节点流去。途中经过各个层次的DOM节点，并在各节点上<span style='color:red'>触发捕获事件</span>，直到到达事件的目标节点。

   2. 捕获阶段的主要任务是建立传播路径，在冒泡阶段，事件会<span style='color:red'>通过这个路径</span>回溯到文档跟节点。当事件发生时，首先发生的是事件捕获，为父元素截获事件提供了机会。
   3. addEventListener最后一个参数，*为**true**则代表使用事件捕获模式*，false则表示使用事件冒泡模式。

2. 然后在目标对向上被触发（目标阶段）

   1. 事件到了具体元素时，在具体元素上发生。
   2. ✪如果该处**既注册了冒泡事件，也注册了捕获事件**，按照<span style='color:red'>注册顺序</span>执行

3. 之后再回溯到文档的根节点（冒泡阶段）

   1. 随后，冒泡阶段发生，事件开始冒泡。
   2. 尽管DOM标准要求事件应该从document对象开始传播，但浏览器都是从window对象开始捕获事件的



## 阻止事件捕获/冒泡

1. <span style='color:red'>event.stopPropagation()</span>

✪<span style='color:red'>event.stopPropagation()</span>并不只是阻止冒泡，它其实是阻止了事件的传播(捕获->冒泡)

2. **stopImmediatePropagation**
   1. **DOM3新增**
   2. 我们知道 stopPropagation 可以阻止事件的进一步传播，但是他<span style='color:red'>阻止不了该元素上绑定的其他函数的执行</span>，比如我们在 obj 上绑定了 func1 和 func2，如果我们在 func1 中使用了 stopPropagation ，那 func2 依然还是会执行出来。倘若这里使用 stopImmediatePropagation，结果就不一样了，他不仅阻止事件的传播，还阻止 func2 的执行



## 事件代理



**事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。**

1. 在JavaScript中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能，因为需要不断的与dom节点进行交互，访问dom的次数越多，引起浏览器重绘与重排的次数也就越多，就会延长整个页面的交互就绪时间，这就是为什么性能优化的主要思想之一就是减少DOM操作的原因；如果要用事件委托，就会将所有的操作放到js程序里面，**与dom的操作就只需要交互一次**，这样就能大大的减少与dom的交互次数，提高性能。

2. Event对象提供了一个属性叫**target**，可以返回事件的目标节点，我们成为事件源，也就是说，target就可以表示为当前的事件操作的dom，但是不是真正操作dom，当然，这个是有**兼容性**的，标准浏览器用**ev.target**，IE浏览器用**event.srcElement**，此时只是获取了当前节点的位置，并不知道是什么节点名称，这里我们用nodeName来获取具体是什么标签名，这个返回的是一个大写的，我们需要转成小写再做比较。

3. 点击子元素，判断是否点击父元素

   ```
   　var oUl = document.getElementById('test');
       oUl.addEventListener('click',function(e){
       var e = e || window.event;    
       var target = e.target || e.srcElement;
           while(target !== oUl ){
               if(target.tagName.toLowerCase() == 'li'){
                   console.log('li click~');
                   break;
               }
               target = target.parentNode;
           }
       })
   ```

4. 适合用事件委托的事件：click，mousedown，mouseup，keydown，keyup，keypress。

5. 不是所有的事件都能冒泡的。blur、focus、load和unload不能像其它事件一样冒泡。事实上blur和focus可以用事件捕获而非事件冒泡的方法获得（在IE之外的其它浏览器中）。 



点击一个列表时，输出对应的索引

```
<script>
    var ul=document.querySelector('ul');
    var lis=ul.querySelectorAll('ul li');
    ul.addEventListener('click', function (e) {
        var target= e.target;
        if(target.nodeName.toUpperCase()==='LI'){
            alert([].indexOf.call(lis,target));
        }
    },false)
</script>
```



## 鼠标事件

DOM3级事件中定义了9个鼠标事件。

- mousedown:鼠标按钮被按下（左键或者右键）时触发。不能通过键盘触发。
- mouseup:鼠标按钮被释放弹起时触发。不能通过键盘触发。
- click:单击鼠标**左键**或者按下回车键时触发。这点对确保易访问性很重要，意味着onclick事件处理程序既可以通过键盘也可以通过鼠标执行。
- dblclick:双击鼠标**左键**时触发。
- mouseover:鼠标移入目标元素上方。鼠标移到其后代元素上时会触发。
- mouseout:鼠标移出目标元素上方。
- mouseenter:鼠标移入元素范围内触发，**该事件不冒泡**，即鼠标移到其后代元素上时不会触发。
- mouseleave:鼠标移出元素范围时触发，**该事件不冒泡**，即鼠标移到其后代元素时不会触发。
- mousemove:鼠标在元素内部移到时不断触发。不能通过键盘触发。

**note**:

在一个元素上相继触发mousedown和mouseup事件，才会触发click事件。两次click事件相继触发才会触发dblclick事件。

如果取消 了mousedown或mouseup中的一个，click事件就不会被触发。直接或间接取消了click事件，dblclick事件就不会被触发了。



### 鼠标左右键

```
<script type="text/javascript">
document.onmousedown=function (ev)
{
    var oEvent=ev||event; //IE浏览器直接使用event或者window.event得到事件本身。
    alert(oEvent.button);// IE下鼠标的 左键是1 ，  右键是2   ff和chrome下 鼠标左键是0  右键是2
};
</script>
```





## 面试相关



<details>
<summary>1.为什么没有Dom1级事件?</summary> 

因为Dom1设计的时候没有设计到事件的部分，所以没有Dom1级事件。

</details>


<details>
<summary>2.Dom3级事件与Dom2级事件的区别</summary> 

只是事件的类型增加了更多的键盘事件和鼠标事件。

</details>

<details>
<summary>3.移除dom，绑定的事件如何?</summary> 

移除dom并不会移除事件句柄，这个必须手动释放

</details>

<details>
<summary>4.写一个通用的(兼容dom0,dom2,IE的)事件侦听器函数</summary> 

```
// event(事件)工具集，来源：github.com/markyun
    markyun.Event = {
        // 页面加载完成后
        readyEvent : function(fn) {
            if (fn==null) {
                fn=document;
            }
            var oldonload = window.onload;
            if (typeof window.onload != 'function') {
                window.onload = fn;
            } else {
                window.onload = function() {
                    oldonload();
                    fn();
                };
            }
        },
        // 视能力分别使用dom0||dom2||IE方式 来绑定事件
        // 参数： 操作的元素,事件名称 ,事件处理程序
        addEvent : function(element, type, handler) {
            if (element.addEventListener) {
                //事件类型、需要执行的函数、是否捕捉
                element.addEventListener(type, handler, false);//dom2
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, function() {
                    handler.call(element);
                });//IE
            } else {
                element['on' + type] = handler;//dom0
            }
        },
        // 移除事件
        removeEvent : function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.datachEvent) {
                element.detachEvent('on' + type, handler);
            } else {
                element['on' + type] = null;
            }
        },
        // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
        stopPropagation : function(ev) {
            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else {
                ev.cancelBubble = true;
            }
        },
        // 取消事件的默认行为
        preventDefault : function(event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        // 获取事件目标
        getTarget : function(event) {
            return event.target || event.srcElement;
        },
        // 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
        getEvent : function(e) {
            var ev = e || window.event;
            if (!ev) {
                var c = this.getEvent.caller;
                while (c) {
                    ev = c.arguments[0];
                    if (ev && Event == ev.constructor) {
                        break;
                    }
                    c = c.caller;
                }
            }
            return ev;
        }
    };
```

</details>

<details>
<summary>5.自定义事件的实现</summary> 

```
<!--自定义事件Event-->
<script>
    var event1 = new Event('myEvent');
    element.addEventListener('myEvent',function () {
        console.log('event1');
    })
    element.dispatchEvent(event1);

</script>
```

```
<!--自定义事件CustomEvent-->
<script>
    var event2 = new CustomEvent('myCustomEvent',{detail:{name:'lalaBao'}})
    var box2 = document.getElementsByClassName('event-custom-box2')[0];
    element.addEventListener('myCustomEvent',function (event) {
        console.log(event.detail.name);//lalaBao
    })
    element.dispatchEvent(event2);
</script>
```



</details>

<details>
<summary>6.CustomEvent 和 Event的区别？</summary> 

CustomEvent可以给事件绑定数据，传入对象的属性会被绑定到event上,见上一题

</details>

<details>
<summary>7.我们给一个dom同时绑定两个点击事件，一个用捕获，一个用冒泡。会执行几次事件，会先执行冒泡还是捕获？</summary> 

执行两次，按注册顺序执行。

</details>

<details>
<summary>8.IE与其他浏览器不一样的事件特性</summary> 

1. 参见上面第四题

2. this的含义


    1. attachEvent中this是window
    2. addEventListener中的this是绑定的dom对象呀；

3. IE不支持事件捕获
    1. IE 中阻止事件进一步冒泡，需要设置 cancelBubble 为 true
    2. 其它的调用 stopPropagation()；

4. 触发事件的元素
    1. 认为是目标（target）：event.target
    2. 在 IE 中，目标包含在 event 对象的 srcElement 属性：event.srcElement;

5. 获取字符代码、如果按键代表一个字符（shift、ctrl、alt除外）
    1. IE 的 keyCode 会返回字符代码（Unicode）
    2. DOM 中按键的代码和字符是分离的，要获取字符代码，需要使用 charCode 属性；

6. 阻止某个事件的默认行为

    1. IE 中阻止某个事件的默认行为，必须将 returnValue 属性设置为 false
    2. 其它浏览器中，需要调用 preventDefault() 方法；

    

</details>

<details>
<summary>9.addEventListener的click和onclick的区别</summary> 

- onclick不能对事件捕获或事件冒泡进行控制，只能使用事件冒泡，无法切换成事件捕获 
- onclick一次只能对一个元素绑定一个事件处理程序
- IE8以下不支持addEventListener
- **同时使用时，onclick先执行**

</details>

<summary>10.labek相关的执行顺序</summary> 

```
<label>Click me <input type="text"></label>
<script>
    document.querySelector('label').addEventListener('click',function () {
        console.log(1)
    })
    document.querySelector('input').addEventListener('click',function () {
        console.log(2)
    })
</script>
```

点击label，输出：1，2，1。因为点击label后，浏览器自动帮你再点击一次input

点击input,输出：2，1

</details>


<details>
<summary>11.双击按钮，事件顺序</summary> 
mousedown
mouseup
click
mousedown
mouseup
click
dblclick


</details>

<details>
<summary>12.原生实现自定义事件模型</summary> 

```javascript
function Emitter() {
    this._listener = {}; //_listener[自定义的事件名] = [所用执行的匿名函数1, 所用执行的匿名函数2]
}

//注册事件
Emitter.prototype.bind = function(eventName, funCallback) {
        var listenersArr = this._listener[eventName] || []; ////this._listener[eventName]没有值则将listener定义为[](数组)。
        listenersArr.push(funCallback);
        this._listener[eventName] = listenersArr;
    }
    //触发事件
Emitter.prototype.trigger = function(eventName) {
        //未绑定事件    
        if (!this._listener.hasOwnProperty(eventName)) {
            console.log('you do not bind this event');
            return;
        }
        var args = Array.prototype.slice.call(arguments, 1); ////args为获得除了eventName后面的参数(最后被用作注册事件的参数)
        var listenersArr = this._listener[eventName];
        var _this = this;
        if (!Array.isArray(listenersArr)) return; ////自定义事件名不存在

        listenersArr.forEach(function(callback) {
            try {
                callback.call(_this, args);
            } catch (e) {
                console.log(e);
            }
        });
    }
    //解绑
Emitter.prototype.unbind = function(eventName, callback) {
    this._listener.hasOwnProperty(eventName) && delete this._listener[eventName];
    callback && callback();
}
```


</details>
