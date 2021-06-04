# rn 开发遇到的坑
## B站黑马react-native学习进度
视频P35看完
## Gradle路径和下载慢的问题
1. 首先 把对应版本的gradle下载到本地任意一个磁盘里;比如说我在到了 Z:\gradle\gradle-2.4-all.zip
2. 然后拖拽 Z:\gradle\文件夹到chrome浏览器 就会得到 file:///Z:/gradle/的访问地址 后面加上文件名 gradle-2.4-all.zip;
   得到 file:///Z:/gradle/gradle-2.4-all.zip的访问地址;然后替换项目中的 android/gradle/wrapper/gradle-wrapper.properties中的 distributionUrl;
   注意::之前要加个\转义即:file\:///Z:/gradle/gradle-2.4-all.zip; Mac和window 通用
## react-native 调试
1. 推荐react-native-debugger:可以查看dom结构
2. 入口index.js 添加:GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;(查看网络请求)
   
