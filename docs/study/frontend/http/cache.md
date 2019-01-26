# 缓存相关



**http缓存的是指:当Web请求抵达缓存时， 如果本地有“已缓存的”副本，就可以从本地存储设备而不是从原始服务器中提取这个文档。**

缓存的好处是显而易见的， 好处有，

1. 减少了冗余的数据传输，节省了网费。
2. 减少了服务器的负担， 大大提高了网站的性能
3. 加快了客户端加载网页的速度



## 与缓存有关的header

参考request和response相关内容

### Request

- If-Modified-Since

- If-None-Match

- Pragma

- Cache-Control

### Response

- Date

-  Expires



## 如何判断缓存新鲜度

第一种， 浏览器把缓存文件的最后修改时间通过 header ”If-Modified-Since“来告诉Web服务器。

第二种， 浏览器把缓存文件的ETag, 通过header "If-None-Match", 来告诉Web服务器。



> **Last-Modified** **与ETag** 是可以一起使用的，服务器会优先验证**ETag**，一致的情况下，才会继续比对**Last-Modified**，最后才决定是否返回**304**



## 强制缓存和协商缓存



![cache](https://whyceycs.github.io/articles/study/frontend/http/cache.png)



### 缓存命中

刷新浏览器和在地址栏里输入网址然后回车。 这两个行为是不一样的。

- 刷新浏览器， 浏览器会去Web服务器验证缓存。
- 在地址栏输入网址然后回车，浏览器会"直接使用有效的缓存", 而<span style='color:red'>不会发http request </span>去服务器验证缓存，这种情况叫做<span style='color:red'>缓存命中</span>



### 强缓存（也叫本地缓存）

浏览器在请求某一资源时，会先获取该资源缓存的header信息，判断是否命中强缓存（cache-control和expires信息），若命中直接从缓存中获取资源信息，包括缓存header信息；本次请求根本就<span style='color:red'>不会</span>与服务器进行通信



### 协商缓存

如果没有命中强缓存，浏览器会发送请求到服务器，请求会携带第一次请求返回的有关缓存的header字段信息（Last-Modified/If-Modified-Since和Etag/If-None-Match），由服务器根据请求中的相关header信息来比对结果是否协商缓存命中；若命中，则服务器返回新的响应header信息更新缓存中的对应header信息，但是并不返回资源内容，它会告知浏览器可以直接从缓存获取；否则返回最新的资源内容




## 面试相关


<details>
<summary>1.如果同时存在cache-control和Expires怎么办呢？</summary> 

浏览器总是优先使用cache-control，如果没有cache-control才考虑Expires

</details>

<details>
<summary>2.为什么使用ETag呢？</summary> 

1. 某些服务器不能精确得到文件的最后修改时间， 这样就无法通过最后修改时间来判断文件是否更新了。

2. 某些文件的修改非常频繁，在秒以下的时间内进行修改. Last-Modified只能精确到秒。

3. 一些文件的最后修改时间改变了，但是内容并未改变。 我们不希望客户端认为这个文件修改了。

</details>