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

### Cache相关部分

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