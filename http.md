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
8. Referer:'https://gz.meituan.com/'
9. User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36
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
