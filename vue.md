# vue 源码笔记总结
## new Vue 发生了什么
 1.合并配置 
 2.初始化生命周期
 3.初始化事件中心($on、$once、$off、$emit)
 4.初始化渲染(createElement)
 5.初始化 data、props、computed、watcher
 ### $mount方法 
 >> 首先缓存了原型上的$mount方法,再重新定义该方法;如果options 没有render方法 则会把el或者template字符串转换成 render 方法 **Vue 的组件的渲染最终都需要 render 方法(调用compileToFunctions)** 调用 mountComponent中_render方法生成虚拟Node,再实例化一个渲染Watcher,在它的回调函数中会调用 updateComponent 方法,vm._update 更新Dom. _render最终是通过执行 createElement 方法并返回的是 vnode
