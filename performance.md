# 前端性能优化(慕课网-前端性能优化企业级解决方案)

## 进度(第二章)

## 性能优化指标与测量工具

- 行业标准
- 优化模型
- 测量工具
- 性能相关 APis

## 代码优化

- javascript 优化
- html 优化
- css 优化

## 渲染优化

- 现代浏览器渲染原理
- 可优化的渲染环节和方法

## 资源优化

- 压缩&合并
- 图片格式
- 图片加载
- 字体优化

## 构建优化

- webpack 的优化配置
- 代码拆分
- 代码压缩
- 持久化缓存
- 检测与分析
- 按需加载

## 传输加载优化

- Gzip
- keepAlive
- Http 缓存
- $service worker
- Http/2
- ssr
- Nginx

## 其他流行优化方案

- SVG 优化图标
- FlexBox 布局
- 预加载
- 懒加载
- 窗口化提高列表性能
- 骨架组件

## DNS 预解析

DNS(Domain Name System, 域名系统)，是域名和 IP 地址相互映射的一个分布式数据库。DNS 查询就是将域名转换成 IP 的过程，这个过程短的话 2ms 几乎无感，长则可能达到几秒钟
当浏览器访问一个域名的时候，需要解析一次 DNS，获得对应域名的 ip 地址。在解析过程中，按照浏览器缓存、系统缓存、路由器缓存、ISP(运营商)DNS 缓存、根域名服务器、顶级域名服务器、主域名服务器的顺序，逐步读取缓存，直到拿到 IP 地址
　 DNS Prefetch，即 DNS 预解析就是根据浏览器定义的规则，提前解析之后可能会用到的域名，使解析结果缓存到系统缓存中，缩短 DNS 解析时间，来提高网站的访问速度

使用:
1、html 源码下载完成后，会解析页面的包含链接的标签，提前查询对应的域名
2、对于访问过的页面，浏览器会记录一份域名列表，当再次打开时，会在 html 下载的同时去解析 DNS

DNS 预解析分两种: 自动解析和手动解析。
自动解析:浏览器使用超链接的 href 属性来查找要预解析的主机名。当遇到 a 标签，浏览器会自动将 href 中的域名解析为 IP 地址，这个解析过程是与用户浏览网页并行处理的。但是为了确保安全性，在 HTTPS 页面中不会自动解析

作用：
DNS Prefetch 有效缩短了 DNS 的解析时间
浏览器底层缓存进行了建模，当 Chrome 浏览器启动的时候，就会自动的快速解析浏览器最近一次启动时记录的前 10 个域名。所以经常访问的网址就没有 DNS 解析的延迟，打开速度更快

## 前端资源加载失败优化

1. 监控上报：脚本错误主要两类：语法错误、运行时错误;监控的方式主要两种：try catch、window onerror. try catch 无法正常捕捉 发生语法错误或异步错误
2. 上报方式：监控错误拿到了报错信息，接下来则是将捕抓的错误信息发送到信息收集平台上，发送的形式主要有两种:(通过 ajax 发生数据|动态创建 img 标签相似)

```js
function report(msg, level) {
  var reportUrl = "http://localhost:8055/report";
  new Image().src = reportUrl + "?msg=" + msg;
}
```

3. 产生 Script error 的原因：浏览器在同源策略限制下所产生的.浏览器出于安全上的考虑，当页面引用的非同域的外部脚本中抛出了异常，此时本页面无权限获得这个异常详情， 将输出 Script error 的错误信息.
4. 优化 script onerror:Script error 来自同源策略的影响，那么解决的方案之一是进行资源的同源化，另外也可以利用跨源资源共享机制( CORS ).
   - 方案一:同源化
     两种方法可以简单解决问题，但也有可能带来其他影响,如内联资源不好利用文件缓存，同域无法充分利用 cdn 优势
   1. 将 js 代码内联到 html 文件中
   2. 将 js 文件与 html 文件放到同一域名下
   - 跨源资源共享机制( CORS )
   1. 为页面上 script 标签添加 crossorigin 属性:
      增加 crossorigin 属性后，浏览器将自动在请求头中添加一个 Origin 字段，发起一个 跨来源资源共享 请求。Origin 向服务端表明了请求来源，服务端将根据来源判断是否正常响应
   ```js
   <script src="http://127.0.0.1:8077/main.js" crossorigin></script>
   ```
   2. 响应头中增加 Access-Control-Allow-Origin 来支持跨域资源共享
   3. 指定域名的 Access-Control-Allow-Origin 的响应头中需带上 Vary:Origin

### 方案一：script onerror

script 标签添加上 onerror 属性,这样在加载失败时触发事件回调,从而捕捉异常

```js
<script onerror="onError(this)"></script>;
// 可以借助 webpack 插件 完成onerror 标签自动化注入
new ScriptExtHtmlWebpackPlugin({
  custom: {
    test: /\.js$/,
    attribute: "onerror",
    value: "onError(this)",
  },
});
```

### 方案二 window.addEventListener

冒泡虽不行，但捕获可以！我们可以通过捕获的方式全局监控加载失败的错误，虽然这也监控到了脚本错误，但通过 !(event instanceof ErrorEvent) 判断便可以筛选出加载失败的错误。

```js
window.addEventListener(
  "error",
  (event) => {
    if (!(event instanceof ErrorEvent)) {
      // todo
    }
  },
  true
);
```

### 优化资源加载失败

- 方案一：加载失败时，刷新页面(reload）
  一直刷新，用户体验不好
- 方案二：针对加载失败的文件进行重加载

1.  替换域名动态重加载
    只对加载失败的文件进行重加载。并且，为了防止域名劫持等导致加载失败的原因，对加载失败文件采用替换域名的方式进行重加载。替换域名的方式可以采用重试多个 cdn 域名，并最终重试到页面主域名的静态服务器上（主域名被劫持的可能性小）
    **但是，失败资源加载成功后，页面原有的加载顺序可能发生变化，最终执行顺序发生变化也将导致执行异常\***
2.  保证 js 按顺序执行
    在不需要考虑兼容性的情况下，资源加载失败时通过 document.write 写入新的 script 标签，可以阻塞后续 script 脚本的执行，直到新标签加载并执行完毕，从而保证原来的顺序。但它在 IE、Edge 却无法正常工作，满足不了我们项目的兼容性。于是我们需要增加 “管理 JS 执行顺序” 的逻辑。使 JS 文件加载完成后，先检查所依赖的文件是否都加载完成，再执行业务逻辑。当存在加载失败时，则会等待文件加载完成后再执行，从而保证正常执行。
    然而，在默认情况下，业务代码的执行不会判断配置的 external 模块是否存在。所以当 external 文件未加载完成或加载失败时，使用对应模块将会导致报错。
    所以我们需要在业务逻辑执行前，保证所依赖的 external 都加载完成。最终通过开发 wait-external-webpack-plugin webpack 插件，在构建时分析所依赖的 external，并注入监控代码，等待所有依赖的文件都加载完成后再统一顺序执行
