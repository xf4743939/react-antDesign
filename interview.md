# 面试总结

B 站 2021 前端面试必刷(p18 没看)

## MVC、MVP、MVVM，我到底该怎么选？

### mvc

button 点击事件触发:view->Controller 获取用户信息事件的触发：controller -> Model;绑定用户信息到 view: controller -> view;

- 具有一定的分层, Model 彻底解耦,controller 和 view 并没有解耦
- 城与层之间交互尽量使用回调或者去消息机制完成,尽量避免直接持有
- controller 和 view 在 android 中无法做到彻底分离，但在代码逻辑层面一定要分清

### MVP

## 前端跨域解决方案

造成跨域的两种策略:

- DOM 同源策略：禁止对不同源页面 DOM 进行操作。这里主要场景是 iframe 跨域的情况，不同域名的 iframe 是限制互相访问的。
- XmlHttpRequest 同源策略：禁止使用 XHR 对象向不同源的服务器地址发起 HTTP 请求

1.  JSONP 实现跨域请求原理就是动态创建 script,然后利用 script 的 scr 不受同源策略约束来跨域获取数据。jsonp 只要由回调函数和数据两部分组成。回调的函数名字一般在请求中指定。而数据就是传入回调函数中的 json 数据.
2.  cors 跨域：原理在服务端设置响应头 header 的 Access-control-Allow-origin 字段,这样浏览器检测到 header 中的 Access-Control-Allow-Origin,这样就可以跨域. 设置了 cors 之后 network 会出现两次请求问题，第一次 OPTIONS 方法 请求预检,分别为简单请求和非简单请求两种. HTTP 头来告诉浏览器让运行在一个 origin(domin) 上 web 应用被准许访问来自不同源服务器上的指定资源.
3.  postMessage 实现跨域 window.open 或 iframe.contentWindow 引用调用
4.  socket.io 实现跨域
5.  nginx 反向代理:只需要修改 nginx 的配置即可解决跨域问题,支持所有浏览器，只是 session，不会影响服务器性能. 实现思路:通过 nginx 配置一个服务器(域名与 domain1 相同,端口不同)做跳板机,反向代理访问 domain2 接口,并且可以顺便修改 cookie 中 domain 信息，方便当前域 cookie 写入，实现跨域登录.(**主要是通过同源策略对服务器不加限制**)

- nginx 正向代理: 用户端比如需要访问某些国外网站,我们可能需要购买 vpn.(**vpn 是在我们用户浏览器设置的不是在远端服务器设置**) 浏览器先访问 vpn 地址，vpn 地址转发请求,并最后将请求结果原路返回。 最大特点：客户端非常明确要访问的服务器地址,服务器只清楚请求来自哪个代理服务器，二不清楚来自哪个具体的客户端，正向代理屏蔽或者隐藏了真实的客户端信息。
- 反向代理：反向代理作用在服务端的,是一个虚拟 ip(VIP).对于用户的一个请求，会转发到多个后端处理器中一台来处理具体请求。
  最大特点:请求来源客户端是明确的,但是请求具体那台服务器处理并不明确。主要运用服务器集群分布式部署情况，反向代理隐藏了服务器信息

6. window.name+iframe 实现跨域 （name 在不同页面甚至不同域名下）加载后依旧存在,并且支持非常长 2MB
7. location.hash+iframe 跨域
8. document.domain + iframe 该方式只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式

## 移动端 1px 解决方案

- 产生原因
  DPR(devicePixelRation)设备像素比,他是默认缩放 100%情况下,设备像素和 css 像素比值： window.devicePixelRatio=物理像素 /CSS 像素

1.  border:0.5px solid #e5e5e5;
    优点:简单,没有副作用; 缺点：支持 ios8+,不支持安卓
2.  使用伪类元素

```css
.setOnePx {
  position: relative;
  &::after {
    position: absolute;
    content: "";
    background-color: #e5e5e5;
    display: block;
    width: 100%;
    height: 1px; /*no*/
    transform: scale(1, 0.5);
    top: 0;
    left: 0;
  }
}
```

## 手写深拷贝

```js
 funciton deepClone(target){
   if(target === null) return;
   if(typeof target !== 'object') return target
   if(target instanceof Function) retutn new Function(target);
   if(target instanceof Date) retutn new Date(target)
   if(target instanceof RegExp) retutn  new RegExp(target)
   const result = new target.constructor;
   for(let i in target){
     result[i]=deepClone(target[i])
   }
   return result
 }
```

## 手写 new

- new 原理
  mdn 把 new 的内部操作分为 4 步

1. 创建一个空的简单 javascript 对象
2. 链接对象到另外一个对象;因此 this 就指向了这个新对象
3. 执行构造函数中代码为新对象添加属性
4. 如果函数没有返回对象,则返回 this

```js
function myNew() {
  var obj = new Object();
  var Con = [].shift.call(arguments);
  obj.__proto__ = Con.prototype;
  var ret = Con.apply(obj, arguments);
  return ret instanceof Object ? ret : obj;
}
```

## vue-router 完整的导航解析流程

1. 导航被触发
2. 在失活的组件里调用 beforeRouteLeave 守卫
3. 调用全局 beforeEach 守卫
4. 在重用组件里调用 beforeRouteUpdate 守卫
5. 在路由配置里调用 beforeEnter
6. 解析异步路由组件
7. 在被激活的组件里调用 beforeRouteEnter
8. 调用全局 beforeResolve 守卫
9. 导航被确认
10. 调用全局的 affterEach 钩子
11. 触发 DOM 更新
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

## 移动端兼容性

- 禁止图片点击放大
  部分安卓手机点击图片会放大设置 css 属性

```js
// 这个会让img标签的点击事件失效
img{
  pointer-events:none
}
```

- 禁止 IOS 识别长串数字为电话

```html
<meta name="format-detection" content="telephone=no" />
```

- 禁止复制选中文本

```CSS
 webkit-user-select:none
```

- 上下拉动滚动条卡顿

```CSS
body{
  -webkit-overflow-scrolling:touch;
  overflow-scrolling:touch
}
```

## hybrid app

1. 有安卓 ios 程序员写一部分,然后你写 HTML 代码,给 ios 或者安卓嵌套进去
2. 直接 HTML 网站,给他打包嵌套一个 app 壳(在壳里面,其实就只做了一个内嵌浏览器)

## 浏览器输入 url 发生了什么？

1. 对输入网址进行 DNS 域名解析,得到对应的 ip 地址
2. 根据这个 ip,找到对应的服务器,发起 TCP 的三次握手
3. 建立 TCP 连接后发起 HTTP 请求
4. 服务器响应 HTTP 请求,浏览器得到 HTML 代码
5. 浏览器解析 HTML 代码,并请求 HTML 代码中的资源(js、css、图片)(解析 HTML 可以详细说)
6. 浏览器对页面进行渲染呈现给用户
7. 服务器关闭 TCP 连接

## DNS 解析(域名解析服务器)

1. 首先会搜索浏览器自身的 DNS 缓存(缓存时间比较短,大概只有 1 分钟,且只能容纳 1000 条缓存)
2. 如果浏览器自身的缓存里面没有找到,那么浏览器会搜索操作系统自身的 DNS 缓存
3. 如果还没有找到,那么尝试从 hosts 文件里面去找
4. 在前面三个过程都没获取到的情况下,就递归地去域名服务器去查找
