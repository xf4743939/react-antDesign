# http 协议原理

http+实践（第二章看完）

## http请求头返回头
### General部分
1.Request URL:https://www.baidu.com
2.Request Methon: GET | POST |PUT | DELETE
3.Status Code:200 ok
4.Remote Address:170.30.68.94:8080
5.Referer Policy:strict-origin-when-cross-origin(不发送query 和路径等)
### Request Header 部分
1. Accept
2. Accept-Language:ZH-CN;zh;q=0.9
3. Cache-Control:no-chache | max-age | no-store
4. Connection:keep-alive
5. Content-Type:'application/json'
6. Cookie
7. Host:gz.meituan.com(域名)
8. Origin:https://gz.meituan.com
9. Referer:https://gz.meituan.com/
10. User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36
### Response Header 部分
1. Access-Control-Allow-Credentials: true
2. Access-Control-Allow-Origin: http://gz.meituan.com
3. Connection: keep-alive
4. Content-Length: 2
5. Content-Type: application/json; charset=utf-8
6. Date: Thu, 22 Apr 2021 01:51:32 GMT
7. Server: openresty

## 示例

- 输入 URL 打开网页
- AJAX 获取数据
- img 标签加载图片

## HTTP/0.9

- 只有一个命令 GET
- 没有 HEADER 等描述数据的信息
- 服务器发送完毕,就关闭 TCP 连接

## HTTP/1.0

- 增加了很多命令
- 增加 status code 和 header
- 多字符集支持、多部分发送、权限、缓存等

## Http/1.1

- 持久连接
- pipeline
- 增加 host 和其他一些命令

## HTTP2

- 所有数据以二进制传输(以前是字符串传输)
- 同一个连接里面发送多个请求不需要按照顺序来
- 头信息压缩以及推送等提高效率的功能

## 为什么要三次握手

防止服务端开启无用的连接

## URI(uniform Resource identifier) 统一资源标志符

用来唯一标识互联网上的信息资源;包含 URL(Uniform Resource Locator)和 URN(永久统一资源定位符)在资源移动之后还能被找到
## WebSocket 与 HTTP
webSocket 协议2008年诞生,2011年成为国际标准.webSocket最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息,是真正的双向平等对话。
http1.0和1.1 所为的keep-alive,吧多个HTTP请求合并为一个。websocket 为了兼容现有浏览器,所以在握手阶段使用了HTTP.
WebSoeket 的其他特点：
 1. 建立在 TCP 协议之上，服务器端的实现比较容易
 2. 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器
 3. 数据格式比较轻量，性能开销小，通信高效
 4. 可以发送文本，也可以发送二进制数据
 5. 没有同源限制，客户端可以与任意服务器通信
 6. 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL
 ### webpack 是什么协议有什么作用
 是持久性的协议,相对于http这种非持久性来说
 - ajax轮询的原理非常简单，让浏览器隔个几秒就发送一次请求，询问服务器是否有新信息
 - long poll 其实原理跟 ajax轮询 差不多，都是采用轮询的方式，不过采取的是阻塞模型（一直打电话，没收到就不挂电话），也就是说，客户端发起请求后，如果没消息，就一直不返回 Response 给客户端。直到有消息才返回，返回完之后，客户端再次建立连接，周而复始。
 - 两种都是非常消耗资源的.ajax 轮询需要服务器有很快的处理速度和资源.long poll需要有很高的并发,就是说同时接待客户的能力.
 ### websocker 协议的优缺点 
 优点：websocket协议一旦建立后，相互沟通所消耗的请求头是很小的.服务器可以向客户端推送消息了
 缺点：少部分浏览器不支持,浏览器支持的程度与方式有区别
 运用场景：即时聊天通信、多玩家游戏、在线协调编辑、实时数据流的拉取与推送、实时地图位置
