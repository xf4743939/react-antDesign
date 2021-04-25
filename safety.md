# 前端安全性
## xss处理
本质是HTML注入,用户输入的数据被当成Html 代码执行了
1. cookie 使用HttpOnly限制: 是的客户端的js代码不能读取到cookie值,但是不能防止从HTTP header 里得到cookie
2. 输出文本HTML 转义:对网页上显示的文本内容使用HtmlEncode转义。js函数：OWASP ESAPI中的encodeCharacter。其它的如xmlencode、jsonencode等转义函数。
3. 检查输入的URL
4. 对传入js函数的文本类型参数值进行javascript 转义
## SQL 注入
预防办法：数据与代码分离,即不用字符串拼凑SQL 语句
## XST处理
XST(跨站追踪)攻击，关闭Web 服务器的TRACE方法
## CSRF攻击的防御
## HTTP头注入
## Cookie安全
## 提高资源的安全性-SRI(Subresource Integrity) 与CSP
 - SRI
 SRI 是用来校验资源是否完整的安全方案。通过为页面引用的资源指定信息摘要，当资源被劫持篡改内容时，浏览器校验信息摘要不匹配，将会拒绝代码执行并抛出加载异常，保证加载资源的完整性。
 启用SRI:使用 SRI 只需要给页面标签添加 integrity 属性，属性值为签名算法（sha256、sha384、sha512）和摘要签名内容组成，中间用 - 分隔。
 可以通过webpack webpack-subresource-integrity 插件实现integrity 实现添加过程
