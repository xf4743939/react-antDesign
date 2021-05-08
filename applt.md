# 小程序相关知识
```js
// 整个App只有一个App 实例,是全部页面共享的.
const appInstance = getApp();
getCurrentPages()获取当前页面栈
wx.navigateTo();wx.redirectTo();wx.navidateBack();wx.switchTab();wx.reLaunch();
wx.getUpdateManager()
```
## 微信Web资源离线存储
Web开发者可借助微信提供的资源存储能力，直接从微信本地加载 Web 资源而不需要再从服务端拉取，从而减少网页加载时间，为微信用户提供更优质的网页浏览体验。
每个公众号下所有 Web App 累计最多可缓存 5M 的资源
## 小程序和普通网页开发区别
1. 网页开发渲染线程和脚本线程是互斥的,而小程序,二者是分开的,分别运行在不同的线程中.
2. 网页开发者可以使用浏览器暴露出来的DOMAPI,进行DOM选择和操作.而小程序不行;小程序逻辑层运行在jsCore中,并没有一个完整浏览器对象,缺少相关DOMAPI和BOMAPI.
3. 所以想jquery zepto 在小程序无法运行,同时jsCode环境和node.js 环境也不是不尽相同,所以一些npm 包在小程序中无法运行.
4. 网页开发需要面对pc端ie、谷歌、qq;移动端要safari chrome;而小程序需要面对两个操作系统IOS、Android的微信客户端.
## JSON文件 
1. json key必须包裹在双引号,不加或者写成单引号容易出现错误
2. bool true 或者 false
## 渲染层和逻辑层
wxml模板和wxss样式工作在渲染层,js脚本工作在逻辑层;渲染层界面使用webview 进行渲染,逻辑层采用jsCore线程进行js脚本。一个小程序存在多个界面,所以渲染层存在多个webview 线程;
这两个线程会经由微信客户端做中转
## 场景值
由于Android 系统限制,无法获取到Home键退出到桌面,然后从桌面再次进入小程序的场景值.
## 生命周期函数
app.js->onLaunch->onshow->onhide->onError->onPageNotFound->onThemeChange
page.js->onLoad->onShow->onReady->onHide->onUnload
onPulldownRefresh->onReachBottom->onShareAppMessage->onPageScroll->onResize->onTabItemTap
## 使用组件recycle-view
解决小程序卡顿以及白屏问题：
1. 商品列表数据很大,首次setData的时候耗时高
2. 渲染出来的商品列表DOM结构多,每次setData都需要创建新的虚拟树和旧树diff操作耗时都比较高
3. 渲染出来商品列表DOM结构多,占用内存高,造成页面被系统回收的概率较大
## 使用限制
返回值使用UTF-8
```js
wx.request、wx.uploadFile、wx.downloadFile 最大并发限制为10个
wx.connectSocket 最大并发限制是五个
```
## 存储
同一个小程序storage 上限为10MB
```js
wx.setStorage();wx.getStorage();wx.removeStorage();wx.clearStorage()
```
## 分包加载
1. 整个小程序所有分包大小不超过20M
2. 单个分包/主包大小不超过2M
