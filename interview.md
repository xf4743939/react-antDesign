# 面试总结

B 站 2021 前端面试必刷(p18 没看)
匹配大厂面试要求(第 8 章看完了)

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
// 箭头函数不能被new;报错:TypeError: xx is not a constructor
function myNew() {
  var obj = new Object();
  var Con = [].shift.call(arguments);
  obj.__proto__ = Con.prototype;
  var ret = Con.apply(obj, arguments);
  return ret instanceof Object ? ret : obj;
}
```

## 手写 bind

```js
Array.prototype.bind1 = function () {
  const args = Array.prototype.slice.call(arguments);
  const t = args.shift();
  const self = this;
  return function () {
    return self.apply(t, args);
  };
};
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

## z-index 详解

z-index 属性用来控制元素在 Z 轴上的顺序

- 适用范围
  z-index 仅适用于定位元素即 postition 值为 relative,absolute,fixed、sticky 属性;
- 作用
  指定当前元素的堆叠顺序;创建新的堆叠上下文

  - 什么是堆叠顺序
    堆叠顺序是当前元素位于 z 轴上的值。值越大表示元素越靠近屏幕，反之元素越远离屏幕
    在同一个堆叠上下文中， z-index 值越大，越靠近屏幕。除了 z-index 控制着元素的 堆叠顺序，还有其他因素控制着元素的 堆叠顺序，如下：

    ```HTML
     <img src="https://www.github.com/hileix/blogs/raw/master/src/assets/堆叠顺序.png">
    ```

  - 什么是堆叠上下文？
    堆叠上下文是一个在该元素内的堆叠顺序不会影响到其他堆叠上下文堆叠顺序的一个环境 HTML 文档默认的堆叠上下文:html 元素

## 类型转换规则

1. 对象 == 字符串 对象 toString()变为字符串
2. null == undefined 相等,但是和其它值比较就不在相等了
3. 剩余的值都是转换为数字
4. NaN 和自己和其他都不相等

## 作用域和执行上下文

- 区别 1

1. 全局作用域之外,每个函数都会创建自己的作用域,作用域在函数定义时就已经确定了,而不是在函数调用时。
2. 全局执行上下文环境时在全局作用域确定之后,js 代码马上执行之前创建的
3. 函数执行上下文是在调用函数时,函数体代码执行之前创建

- 区别 2

1. 作用域时静态的,只要函数定义好了就一直存在,且不会变化
2. 上下文环境时动态的,调用函数时创建,函数调用结束时上下文环境就会被释放

- 联系

1. 上下文环境(对象)是从属于所在的作用域
2. 全局上下文环境 ==>全局作用域
3. 函数上下文环境 ==> 对应的函数使用域

## 创建对象方式

- Object 构造函数模式

  - 套路:先创建空 Object 对象,在动态添加属性/方法
  - 适用场景:起始时不确定对象内部数据
  - 问题:语句太多

- 对象字面量模式
  - 适用场景:起始时对象内部数据是确定的
  - 问题:如果创建多个对象,有重复代码
- 工厂模式
  - 通过工厂函数动态创建对象并返回
  - 适用场景:需要创建多个对象
  - 问题: 对象没有一个具体的类型,都是 object 类型
- 自定义构造函数模式
  - 套路:自定义构造函数,通过 new 创建对象
  - 适用场景: 需要创建多个类型确定的对象
  - 问题:每个对象都有相同的数据,浪费内存
- 构造函数+原型的组合模式
  - 套路: 自定义构造函数,属性在函数中初始化,方法添加到原型上
  - 适用场景:需要创建多个类型确定的对象
- 构造函数+子原型对象等于父原型示例并把 constructor 指针修改为本身
- 组合继承(原型链+借用构造函数的组合继承)
  1. 利用原型链实现对父类型对象的方法继承
  2. 利用 super() 调用父类型的构造函数初始化相同属性

## 何为多进程与多线程

多进程运行:一应用程序可以同时启动多个实例运行
多线程: 在一个进程内,同是有多个线程运行

## 比较单线程与多进程

- 多线程
  优点:能有效提升 CPU 的利用率
  缺点: 创建多线程开销;线程间切换开销；死锁与状态同步问题
- 单线程
  优点:顺序编程简单易懂
  缺点:效率低

## 浏览器内核

chrome,safari:webkit
firefox:Gecko
Ie:Trident
360,搜狗等国内浏览器:trident+webkit

- 内核很多模块组成
  主线程

1. js 引擎模块:负责 js 程序的编译与运行
2. html,css 文档解析模块:负责页面文本的解析
3. DOM/CSS 模块:负责 DOM/CSS 在内存在的相关处理
4. 布局与渲染模块:负责页面的布局与效果的绘制
   分线程
5. 网络请求模块:负责 ajax 请求
6. 事件响应模块: 负责事件的管理
7. 定时器模块:负责定时器的管理
8. 等等...

## webview 主要有于什么地方

是基于 webkit 的引擎,可以解析 Dom 元素,展示 html 页面的控制，和浏览器展示页面的原理是相同的,所以可以把他当做浏览器看待.
webview 的作用即用于手机系统来展示 Html 界面,所以主要在手机系统上加载 html 文件被需要

## javaScript 调用 Native 的方式

- 注入 API
  主要原理:通过 webview 提供的接口,向 javascript 的 context(window)中注入对象或者方法,让 javaScript 调用时,直接执行相应的 Native 代码逻辑,达到 javascript 调用 Native 的目的

```js
// 前端调用方式
window.postBridgeMessage(message);
```

- jsBridge 接口主要功能：调用 Native(给 Native 发消息),和接被 Native 调用(接收 Native 消息)

```JS
window.JSBridge={
  invoke:function(bridge,data){
    nativeBridge.postMessage({
    bridgeName:bridgeName,
    data: data||{}
    })
  },
  receiveMessage:function(msg){
   // 处理msg
  }
}
```

## for of 知识点

for in/forEach 都是同步执行(不等结果，直接执行完);for of 异步执行(第一个有结果了在执行第二个;所以一个个执行)

## 微任务和宏任务的区别

DOM 渲染和更新是两个过程

1. call Stack 清空
2. 执行当前的微任务
3. 尝试 DOM 渲染
4. 触发 EventLoop

- 宏任务:DOM 渲染后触发,如 setTimeout
- 微任务: DOM 渲染前触发,如:promise
- 为什么微任务比宏任务快？
  宏任务 和 微任务 存放的地方不一样
  - 微任务是 ES6 语法规定的
  - 宏任务是有浏览器规定的

## vite 原理剖析

webpack 改变文件,直接编译,耗时
webpack 有一个模块或者几个模块改变,会根据依赖在重新打包
vite 改变文件热更新，更快
构建过程更快;开发环境
解析 VUE 文件让浏览器可以识别它
开发阶段：按需加载
运行阶段:预打包

- vite 特点
  - 快速启动
  - 按需编译
  - 模块热更新
- vite vs vue-cli
  - vite 在开发模式下不需要打包可以直接运行,使用的是 ES6 的模块化加载规则
  - vue-cli 开发环境模式下必须对项目打包才可以运行
  - vite 基于缓存的热更新
  - vue-cli 基于 webpack 的热更新
- 生产环境需要打包吗？  
  都使用统一模块化规范，就可以不打包了;

## common.js 和 es6 中模块引入的区别？

- common.js 模块输出的是一个值的拷贝,es6 模块输出的是值的引用
- common.js 模块是运行时加载,es6 模块时编译时输出接口
- common.js 时单个值输出,es8 Module 可以导出多个
- common.js 时动态语法可以写在判断里，es6 Module 静态语法只能写在顶层
- common.js 的 this 是当前模块,ES6 Module 的 this 是 undefined
