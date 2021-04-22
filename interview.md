# 面试总结
## MVC、MVP、MVVM，我到底该怎么选？
 ### mvc
 button 点击事件触发:view->Controller 获取用户信息事件的触发：controller -> Model;绑定用户信息到view: controller -> view;
 * 具有一定的分层, Model 彻底解耦,controller 和 view 并没有解耦
 * 城与层之间交互尽量使用回调或者去消息机制完成,尽量避免直接持有
 * controller和view在android中无法做到彻底分离，但在代码逻辑层面一定要分清
 ### MVP
 ## 前端跨域解决方案
 1. JSONP实现跨域请求原理就是动态创建script,然后利用script的scr不受同源策略约束来跨域获取数据。jsonp 只要由回调函数和数据两部分组成。回调的函数名字一般在请求中指定。而数据就是传入回调函数中的json 数据.
 2. cors 跨域：原理在服务端设置响应头header  的 Access-control-Allow-origin 字段,这样浏览器检测到header中的Access-Control-Allow-Origin,这样就可以跨域. 设置了cors之后network 会出现两次请求问题，第一次OPTIONS方法 请求预检,分别为简单请求和非简单请求两种. HTTP 头来告诉浏览器让运行在一个origin(domin) 上web应用被准许访问来自不同源服务器上的指定资源.
 3. postMessage 实现跨域 window.open 或iframe.contentWindow 引用调用
 4. socket.io 实现跨域
 5. nginx 反向代理:只需要修改nginx的配置即可解决跨域问题,支持所有浏览器，只是session，不会影响服务器性能. 实现思路:通过nginx 配置一个服务器(域名与domain1相同,端口不同)做跳板机,反向代理访问domain2 接口,并且可以顺便修改cookie中domain 信息，方便当前域cookie 写入，实现跨域登录
   - nginx 正向代理: 用户端比如需要访问某些国外网站,我们可能需要购买vpn.(**vpn是在我们用户浏览器设置的不是在远端服务器设置**) 浏览器先访问vpn 地址，vpn地址转发请求,并最后将请求结果原路返回。    最大特点：客户端非常明确要访问的服务器地址,服务器只清楚请求来自哪个代理服务器，二不清楚来自哪个具体的客户端，正向代理屏蔽或者隐藏了真实的客户端信息。
   - 反向代理：反向代理作用在服务端的,是一个虚拟ip(VIP).对于用户的一个请求，会转发到多个后端处理器中一台来处理具体请求。
   最大特点:请求来源客户端是明确的,但是请求具体那台服务器处理并不明确。主要运用服务器集群分布式部署情况，反向代理隐藏了服务器信息
 
