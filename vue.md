# vue 源码笔记总结

## new Vue 发生了什么

1.合并配置 2.初始化生命周期 3.初始化事件中心($on、$once、$off、$emit) 4.初始化渲染(createElement) 5.初始化 data、props、computed、watcher

### $mount 方法

> > 首先缓存了原型上的$mount 方法,再重新定义该方法;如果 options 没有 render 方法 则会把 el 或者 template 字符串转换成 render 方法 **Vue 的组件的渲染最终都需要 render 方法(调用 compileToFunctions)** 调用 mountComponent 中\_render 方法生成虚拟 Node,再实例化一个渲染 Watcher,在它的回调函数中会调用 updateComponent 方法,vm.\_update 更新 Dom. \_render 最终是通过执行 createElement 方法并返回的是 vnode

### update

Vue 的 \_update 是实例的一个私有方法，它被调用的时机有 2 个，一个是首次渲染，一个是数据更新的时候(最重要是调取**patch**方法) patch 两个入参 一个 dom 操作的方法，一个是钩子函数的实现;回到 patch 方法本身，它接收 4 个参数，oldVnode 表示旧的 VNode 节点，它也可以不存在或者是一个 DOM 对象；vnode 表示执行 \_render 后返回的 VNode 的节点；hydrating 表示是否是服务端渲染；removeOnly 是给 transition-group 用的

## computed 和 watch 区别

- computed

1. 支持缓存,只有依赖数据改变，才会重新进行计算; 2. 不支持异步,当 computed 内有异步操作是无效,无法监听到数据变化.3.计算属性是基于它们的响应式依赖进行缓存的

- watch

1. 不支持缓存,数据变，直接会触发相应操作; 2. watch 支持异步;3.immediate：组件加载立即触发回调函数执行，4. deep: 深度监听，为了发现对象内部值的变化，复杂类型的数据时使用
