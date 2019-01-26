# Request 请求

## 结构：

```
Method | path to resource | http/version number
-----------------------------------------------
Header name 1: value 
Header name 2: value
  ...
-----------------------------------------------

-----------------------------------------------
request body(optional)
```

可以看到http请求分为三个部分：

- 第一部分是request line，包括请求的方法Method（GET/POST）、请求资源的路径path to resource（对应后端路由部分定义的路径）和http协议的版本号。
- 第二部分是request header请求头
- 第三部分是request body请求体，当使用GET方法发送请求的时候，请求体是空的



## Header字段详解

### Cache相关

### If-Modified-Since

把本地缓存页面的最后修改时间发送到服务器去，服务器把这个时间与实际文件的最后修改时间Last-Modified对比。

- <span style='color:red'>如果时间一致，返回304，客户端就直接使用本地缓存文件</span>。

- 如果时间不一致，就会返回200和新的文件内容。客户端会丢弃旧文件，把新文件缓存起来



### If-None-Match

If-None-Match和<span style='color:red'>ETag</span>一起工作，工作原理是：浏览器初次请求某个资源时，服务器在HTTP Response中会添加一个Etag信息，当浏览器再次请求该资源时，会在HTTP Request中加入If-None-Match，其值就是之前收到的Etag值，

- 如果服务器验证资源的ETag没有改变（没有更新），将返回一个304状态告诉客户端使用本地缓存文件。
- 否则将返回200状态和新的资源和Etag.  使用这样的机制将提高网站的性能



### Pragma

防止页面被缓存， 在HTTP/1.1版本中，它和Cache-Control:no-cache作用一模一样

Pargma只有一个用法：Pragma: no-cache

<span style='color:red'>注意: 在HTTP/1.0版本中，只实现了Pragema:no-cache, 没有实现Cache-Control</span>



### Cache-Control

这个是非常重要的规则。 这个用来指定请求和响应遵循的缓存机制。<span style='color:red'>默认为private</span>

<span style='color:red'>请求时</span>的缓存指令包括

- no-cache:表示必须先与服务器确认返回的响应是否被更改，然后才能使用该响应来满足后续对同一个网址的请求。因此，如果存在合适的验证令牌 (ETag)，no-cache 会发起往返通信来验证缓存的响应，如果资源未被更改，可以避免下载。
- no-store：用于防止重要的信息被无意的发布。在<span style='color:red'>请求消息中发送</span>将使得请求和响应消息都不使用缓存。也就是说每次用户请求资源时，都会向服务器发送一个请求，每次都会下载完整的响应
- max-age：缓存多少秒后过期，过期之后浏览器才会再次发送请求
- max-stale：指示客户机可以接收超出超时期间的响应消息。如果指定max-stale消息的值，那么客户机可以接收超出超时期指定值之内的响应消息
- min-fresh：指示客户机可以接收响应时间小于<span style='color:red'>当前时间加上指定时间的响应</span>
- only-if-cached

<span style='color:red'>响应消息中</span>的指令包括

- public：指示响应可被任何缓存区缓存
- private：指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。
- no-cache：指示响应消息不能缓存
- no-store：用于防止重要的信息被无意的发布
- no-transform：主要是用在 proxy 服务器，不允许进行格式转换
- must-revalidate：浏览器可能会用到，如果 max-age 过期，需要重新发送请求，获取这部分数据，再来验证数据是否真的过期，而不能直接使用本地缓存
- proxy-revalidate：用在缓存服务器中，指定缓存服务器过期后，必须向源服务器重新请求，不能直接使用本地缓存
- max-age



### Client相关

### Accept

浏览器端可以接受的媒体类型

- 例如text/html,如果服务器无法返回text/html类型的数据,服务器应该返回一个406错误(non acceptable)
- 通配符 * 代表任意类型，例如  Accept: \*/\*  代表浏览器可以处理所有类型。(<span style='color:red'>一般浏览器发给服务器都是发这个</span>)

### Accept-Encoding

浏览器申明自己接收的编码方法，通常指定<span style='color:red'>压缩方法</span>

例如： Accept-Encoding: gzip, deflate



### Accept-Language

浏览器申明自己接收的<span style='color:red'>语言</span>

语言跟字符集的区别：中文是<span style='color:red'>语言</span>，~~中文有多种字符集，比如big5，gb2312，gbk等等~~；

例如： Accept-Language: en-us



### Accept-Charset

浏览器申明自己接收的字符集

如上述gb2312，utf-8，big5，gbk



### User-Agent

告诉HTTP服务器， 客户端使用的操作系统和浏览器的名称和版本

例如： User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; CIBA; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET4.0C; InfoPath.2; .NET4.0E)



### Entity相关

### Content-Length

```
只用于响应头或者POST请求的请求头，以字节为单位，每个字符都是一个字节
```

发送给HTTP服务器数据的长度

Content-Length: 381



### Content-Type

```
只用于响应头或者POST请求的请求头
```

Http Header里的Content-Type一般有这三种：

- `application/x-www-form-urlencoded`：数据被编码为名称/值对。这是标准的编码格式。
  - 当action为get时候，浏览器用此编码方式把form数据转换成一个字串（name1=value1&name2=value2...），然后追加到url后面，用`?`分割。
  - 当action为post时候，浏览器把form数据封装到http body中，然后发送到server。 如果没有`type=file`的控件，用默认的application/x-www-form-urlencoded就可以了。 但是如果有`type=file`的话，就要用到multipart/form-data了
  - <span style='color:red'>这种方式用的比较多</span>
- `multipart/form-data`： 数据被编码为一条消息，页上的每个控件对应消息中的一个部分。
  - 当action为post且Content-Type类型是`multipart/form-data`，浏览器会把整个表单以控件为单位分割，并为每个部分加上Content-Disposition(form-data或者file),Content-Type(默认为text/plain),name(控件`name`)等信息，并加上分割符(boundary)。
  - <span style='color:red'>一般上传文件才会使用这种方式</span>
- `text/plain`： 数据以纯文本形式(text/json/xml/html)进行编码，其中不含任何控件或格式字符。postman软件里标的是RAW。
  - <span style='color:red'>一般向服务端发送json数据会使用这种方式</span>



### Miscellaneous相关

### referer

请求头，提供了Request的上下文信息的服务器，告诉服务器我是从哪个链接过来的

`验证 HTTP Referer 字段是防御 CSRF 攻击的策略之一`



### Transport相关

### connection

- Connection: keep-alive

  当一个网页打开完成后，客户端和服务器之间用于传输HTTP数据的TCP连接不会关闭，如果客户端再次访问这个服务器上的网页，会继续使用这一条已经建立的连接

- Connection: close

  代表一个Request完成后，客户端和服务器之间用于传输HTTP数据的TCP连接会关闭， 当客户端再次发送Request，需要重新建立TCP连接



### host

发送请求时，该报头域是必需的

请求报头域主要用于指定被请求资源的Internet主机和端口号，它通常从HTTP URL中提取出来的

例如: 我们在浏览器中输入：http://www.guet.edu.cn/index.html

浏览器发送的请求消息中，就会包含Host请求报头域，如下：

Host：http://www.guet.edu.cn

### Cookie相关

### Cookie

最重要的header, 将cookie的值发送给HTTP 服务器

