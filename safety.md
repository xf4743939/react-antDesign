# 前端安全性

腾讯大牛亲授漏洞防御(2-2 看完)

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

浏览器只能拦截前两种

1. HTML 节点内容
2. HTML 属性
3. Javascript 代码
4. 富文本

本质是 HTML 注入,用户输入的数据被当成 Html 代码执行了

1. cookie 使用 HttpOnly 限制: 是的客户端的 js 代码不能读取到 cookie 值,但是不能防止从 HTTP header 里得到 cookie
2. 输出文本 HTML 转义:对网页上显示的文本内容使用 HtmlEncode 转义。js 函数：OWASP ESAPI 中的 encodeCharacter。其它的如 xmlencode、jsonencode 等转义函数。
3. 检查输入的 URL
4. 对传入 js 函数的文本类型参数值进行 javascript 转义

## SQL 注入

预防办法：数据与代码分离,即不用字符串拼凑 SQL 语句

## XST 处理

XST(跨站追踪)攻击，关闭 Web 服务器的 TRACE 方法

## CSRF 攻击的防御

## HTTP 头注入

## Cookie 安全

## 提高资源的安全性-SRI(Subresource Integrity) 与 CSP

- SRI
  SRI 是用来校验资源是否完整的安全方案。通过为页面引用的资源指定信息摘要，当资源被劫持篡改内容时，浏览器校验信息摘要不匹配，将会拒绝代码执行并抛出加载异常，保证加载资源的完整性。
  启用 SRI:使用 SRI 只需要给页面标签添加 integrity 属性，属性值为签名算法（sha256、sha384、sha512）和摘要签名内容组成，中间用 - 分隔。
  可以通过 webpack webpack-subresource-integrity 插件实现 integrity 实现添加过程。
  开启 SRI，浏览器会对相关资源进行 CORS 检查。至此，当资源内容被劫持篡改时，浏览器校验签名不匹配将使得异常资源不被执行，并触发加载失败。从而进入到资源加载失败的监控流程中，最终可以通过切换 CDN 域名或主域名进行加载重试，直到加载上正确资源，避免资源被劫持篡改内容后注入广告或白屏等情况。
  HTTPS 可以有效应对流量劫持的问题，SRI 在资源完整性再上一道屏障，CSP 也进行了其他方面的补充。“三驾马车” 为页面资源安全 “保驾护航”。
