# Cookie相关



## Cookie概述

### Cookie是什么？

Cookie 是一小段文本信息，伴随着用户请求和页面在 Web 服务器和浏览器之间传递。Cookie 包含每次用户访问站点时 Web 应用程序都可以读取的信息。

### 为什么需要Cookie？

因为HTTP协议是无状态的，对于一个浏览器发出的多次请求，WEB服务器无法区分是不是来源于同一个浏览器。所以，需要额外的数据用于维护会话。 Cookie 正是这样的一段随HTTP请求一起被传递的额外数据。

### Cookie能做什么？

Cookie只是一段文本，所以它只能保存字符串。而且浏览器对它有大小限制以及它会随着每次请求被发送到服务器，所以应该保证它不要太大。 Cookie的内容也是明文保存的，有些浏览器提供界面修改，所以， 不适合保存重要的或者涉及隐私的内容。

### Cookie 的限制

- 大多数浏览器支持最大为 4096 字节的 Cookie。由于这限制了 Cookie 的大小，最好用 Cookie 来存储少量数据，或者存储用户 ID 之类的标识符。用户 ID 随后便可用于标识用户，以及从数据库或其他数据源中读取用户信息。 
- 浏览器还限制站点可以在用户计算机上存储的 Cookie 的数量。大多数浏览器只允许每个站点存储 20 个 Cookie；如果试图存储更多 Cookie，则最旧的 Cookie 便会被丢弃。有些浏览器还会对它们将接受的来自所有站点的 Cookie 总数作出绝对限制，通常为 300 个。

通过前面的内容，我们了解到Cookie是用于维持服务端会话状态的，<span style='color:red'>通常由服务端写入</span>，在后续请求中，供服务端读取。

1. 我们在服务端写的Cookie，通过<span style='color:red'>HTTP的响应头</span>这种途径发送到客户端的。每一个写入动作， 都会产生一个<span style='color:red'>【Set-Cookie】</span>的响应头。浏览器正是在每次获取请求的响应后，检查这些头来接收Cookie的。
2. 每次HTTP请求，Cookie都会被发送。
3. 服务器删除cookie：其实就是在写Cookie时，设置Expires为一个【早于现在时间的时间】。也就是：设置此Cookie已经过期， 浏览器接收到这个Cookie时，便会删除它们。



### Set-Cookie Header & document.cookie

- [rfc6265第5.2节](http://tools.ietf.org/html/rfc6265#section-5.2)定义的Set-Cookie Header，除了必须包含Cookie正文，还可以选择性包含6个属性

  path、domain、max-age、expires、secure、httponly，它们之间用<span style='color:red'>英文分号和空格</span>（"; "）连接。

```
Set-Cookie: key=value; path=path; domain=domain; max-age=max-age-in-seconds; expires=date-in-GMTString-format; secure; httponly

```

- Cookie的内容除了必须包含正文之外，还可选5个属性：path、domain、max-age、expires、secure

- JS不能读写HttpOnly Cookie



### cookie属性

- name、value：由Cookie正文指定；
- expiry-time：根据Cookie中的expires和max-age产生；
- domain、path：分别由Cookie中的domain和path指定；
- creation-time、last-access-time：由浏览器自行获得；
- persistent-flag：持久化标记，在expiry-time未知的情况下为false，表示这是个session cookie；
- secure-only-flag：在Cookie中包含secure属性时为true，表示<span style='color:red'>这个cookie仅在https环境下才能使用</span>；
- http-only-flag：在Cookie中包含httponly属性时为true，表示<span style='color:red'>这个cookie不允许通过JS来读写</span>；
- host-only-flag：
  - host-only-flag为true时，Domain属性为example.com的Cookie只有在example.com才有可能获取
  - host-only-flag为false时，Domain属性为example.com的Cookie，在example.com、 www.example.com、sub.example.com等等都可能获取到





## JS中读写cookie

Cookie并非只能在服务端读写，在客户端的浏览器中也可以实现对它的读写访问。而且在JS中创建的Cookie对于服务端仍然可见。

1. 在JS中写Cookie很简单，只要给document.cookie赋值一个Cookie字符串即可。

   > 格式为" key1=value1; key2=value2; ........."

```
function WriteCookie() {
        var cookie = "cookie_js=22222222; path=/";
        document.cookie = cookie;
    }    
```



2. 读取Cookie

```
function ReadCookie() {
        alert(document.cookie);
    }   
```



