# vue 源码笔记总结

## 前端框架面试 vue react 进度 (3-8)

## new Vue 发生了什么

1.合并配置 2.初始化生命周期 3.初始化事件中心($on、$once、$off、$emit) 4.初始化渲染(createElement) 5.初始化 data、props、computed、watcher

### $mount 方法

> > 首先缓存了原型上的$mount 方法,再重新定义该方法;如果 options 没有 render 方法 则会把 el 或者 template 字符串转换成 render 方法 **Vue 的组件的渲染最终都需要 render 方法(调用 compileToFunctions)** 调用 mountComponent 中\_render 方法生成虚拟 Node,再实例化一个渲染 Watcher,在它的回调函数中会调用 updateComponent 方法,vm.\_update 更新 Dom. \_render 最终是通过执行 createElement 方法并返回的是 vnode

### update

Vue 的 \_update 是实例的一个私有方法，它被调用的时机有 2 个，一个是首次渲染，一个是数据更新的时候(最重要是调取**patch**方法) patch 两个入参 一个 dom 操作的方法，一个是钩子函数的实现;回到 patch 方法本身，它接收 4 个参数，oldVnode 表示旧的 VNode 节点，它也可以不存在或者是一个 DOM 对象；vnode 表示执行 \_render 后返回的 VNode 的节点；hydrating 表示是否是服务端渲染；removeOnly 是给 transition-group 用的

## vue 面试知识点

v-html 引入文本但是会造成 xss 攻击风险

- v-for 和 v-if 建议不在一块用
  v-for 计算优先级高于 v-if (循环后要判断是否显示)造成多次判断浪费性能
- vue 中 event 对象 是原生对象 MouseEvent;事件被挂载在当前元素
- v-model 语法糖

### 生命周期

- 挂载阶段
- 更新阶段
- 销毁阶段
