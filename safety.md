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
