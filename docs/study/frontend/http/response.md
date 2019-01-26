# Response响应

## 结构：

```
http/version number | status code | message
-----------------------------------------------
Header name 1: value
header name 2: value
...
-----------------------------------------------

-----------------------------------------------
response body(optional)
```

可以看到http响应也分为三个部分：

- 第一部分是response line，包括http协议版本号，<span style='color:red'>响应状态码</span>和响应状态消息
- 第二部分是response header响应头
- 第三部分是响应体

## 状态码：

HTTP/1.1中定义了5类状态码， 状态码由三位数字组成，第一个数字定义了响应的类别

- 1XX 提示信息类 - 表示请求已被成功接收，继续处理
  - 101 协议升级，主要用于websocket，也可以用于http2的升级。
- 2XX 响应成功类 - 表示请求已被成功接收，理解，接受
  - 200 OK：成功响应状态码，最常见，表明该请求被成功地完成，所请求的资源发送回客户端
  - 201表示请求成功且服务器创建了新的资源
  - 202表示服务器已经接受了请求，但还未处理
- 3XX 重定向类 - 要完成请求必须进行更进一步的处理
  - 301表示永久重定向，请求的网页已经永久移动到新位置
  - 302表示临时重定向，新的URL会在response 中的Location中返回，浏览器将会自动使用新的URL发出新的Request
  - 304 not modified：上次的文档已经被缓存了， 还可以继续使用。<span style='color:red'>禁止包含消息体</span>。
- 4XX 客户端错误类 - 请求有语法错误或请求无法实现
  - 400 Bad Request：客户端请求与语法错误，不能被服务器所理解
  - 401：当前请求需要用户验证
  - 403 Forbidden：服务器收到请求，但是拒绝提供服务
  - 404 not found：请求资源不存在。输错URL或者服务器不存在这个页面
  - 406 non acceptable：请求的资源的内容特性无法满足请求头中的条件，因而无法生成响应实体。对应header中的Accept字段(text/html等...)
  - 414 ：请求的URI 长度超过了服务器能够解释的长度，因此服务器拒绝对该请求提供服务。
- 5XX 服务器端错误类 - 服务器未能实现合法的请求
  - 500 Internal Server Error：一般后端代码出错。
  - 503 Server Unavailable ：服务器当前不能处理客户端的请求，一段时间后可能恢复正常



## Header字段详解



### Cache相关

### Date

生成消息的具体时间和日期

### Expires

浏览器会在指定过期时间内使用本地缓存

eg：`Expires: Tue, 08 Feb 2022 11:35:14 GMT`

### Vary

vary 的值表明需要哪些request header去充分决定一个response是否是fresh的，缓存服务器是否可以不用重新确认就使用一个reponse



### Cookie相关

### P3P

用于跨域设置Cookie, 这样可以解决iframe跨域访问cookie的问题

### Set-Cookie

非常重要的header, 用于把cookie 发送到客户端浏览器， 每一个写入cookie都会生成一个Set-Cookie.



### Entity相关

### ETag

和If-None-Match 配合使用

### Last-Modified

用于指示资源的最后修改日期和时间。（看request章节的If-Modified-Since）

### Content-Type

服务器告诉浏览器自己响应的对象的类型和字符集。

例如：

- Content-Type: text/html; charset=utf-8

- Content-Type:text/html;charset=GB2312

- Content-Type: image/jpeg

### Content-Length

指明实体正文的长度，以字节方式存储的十进制数字来表示

### Content-Encoding

服务器表明自己使用了什么压缩方法（gzip，deflate）压缩响应中的对象

### Content-Language

服务器告诉浏览器自己响应的对象的语言

```
Content-Language： zh-CN
```



### Miscellaneous相关

### Server

指明HTTP服务器的软件信息。例如:Server: Microsoft-IIS/7.5

### X-AspNet-Version:

如果网站是用ASP.NET开发的，这个header用来表示ASP.NET的版本

例如: X-AspNet-Version: 4.0.30319

### X-Powered-By:

表示网站是用什么技术开发的

例如： X-Powered-By: ASP.NET



### Transport相关

### Connection

- Connection: keep-alive   当一个网页打开完成后，客户端和服务器之间用于传输HTTP数据的TCP连接不会关闭，如果客户端再次访问这个服务器上的网页，会继续使用这一条已经建立的连接

-  Connection: close  代表一个Request完成后，客户端和服务器之间用于传输HTTP数据的TCP连接会关闭， 当客户端再次发送Request，需要重新建立TCP连接。



### Location相关

### Location

用于重定向一个新的位置, 包含新的URL地址

参看304状态



## 面试相关

<details>
<summary>1.重定向URI “黑洞”</summary> 

例如每次重定向把旧的 URI 作为新的 URI 的一部分，导致在若干次重定向后 URI 超长。存在安全漏洞的服务器使用固定长度的缓冲读取或操作请求的 URI，当 GET 后的参数超过某个数值后，可能会产生缓冲区溢出，导致任意代码被执行。没有此类漏洞的服务器，应当返回414状态码

</details>

