# react 知识

前端框架面试题(7-22 章节看完)

## StrictMode

- 识别具有不安全生命周期的组件
- 有关旧字符串 ref 用法的警告
- 以废弃 findDOMNode 用法警告
- 检查意外的副作用
- 检查遗留 context API

## react 中 event(组合)

event.nativeEvent 是原生事件对象
事件触发时当前元素,所有事件都被挂载到 document 上

## 受控组件和非受控组件

优先使用受控组件;必须操作 DOM 时,再使用非受控组件

- 受控组件
  input 的值受 state 控制
  state 和 input 关联在一起
- 非受控组件-使用场景

  - 必须手动操作 DOM 元素,setState 实现不了
  - 文件上传

  ```html
  <input type="file" />
  ```

  - 某些富文本编辑器,需要传入 DOM 元素

## setState

- 不可变值(生命周期 setState 什么时候修改,不能影响到之前的 state 的值)

```js
// 在之前就改变了，数据后面再SCU里面数据已经一样，不会再渲染了
this.state.list.push({});
this.setState({
  list: this.state.list,
});
```

- 可能是异步更新(有可能是同步)
  - 在 setTimeout 中是同步的
  - 在自定义 DOM 事件中也是同步的
- 可能会被合并

  - 异步传入对象会合并 state 执行三次 state.count+1 还是 1

  ```js
  this.setState({
    count: this.state.count + 1,
  });
  ```

  - 传入函数,不会被合并

  ```js
  this.setState((prevState, props) => {
    return {
      props: prevState.count + 1,
    };
  });
  ```

## 组件生命周期

自己画出来

## React 高级特性

- 非受控组件
  - ref => createRef()
  - defaultValue,defaultChecked
- portals(传送门)
  - 组件默认会按照既定层次嵌套渲染
  - 如何让组件渲染到父组件以外?
  - 使用场景
    - overflow:hidden
    - 父组件 z-index 值太小
    - fixed 需要放到 body 第一层级
- context

  - 公共信息(语言、主题)如何传递给每个组件

  ```js
  const themeContext = React.createContext();
  themeContext.provider; themeContext.consumer;
  static ContextType = themeContext
  ```

- 异步组件
  - import()
  - React.lazy()
  - React.suspense
- 性能优化

  - react 默认:父组件有更新,子组件则无条件更新
  - 性能优化对于 react 更加重要
  - shouldComponentUpdate(SCU)
  - SCU 一定要用吗？ - 需要的时候才优化
  - SCU 不建议深度比较,比较耗费性能

  ```js
  // 默认返回true
   shouldComponentUpdate(nextProps,nextState){
     if(nextState.count !== this.state.count){
       return true
     }
     return false
   }
  ```

  - pureComponent 和 React.memo
  - 不可变值 immutable.js
    - 彻底拥抱,不可变质
    - 基于共享数据(不是深拷贝),速度好
    - 有一点学习和迁移成本
  - PureComponent ,SCU 中实现了浅比较
  - memo,函数组件中的 pureComponent

  ```js
  function MyComponnet(props) {}
  function areEqual(prevProps, nextProps) {}
  export default React.memo(myComponent, areEqual);
  ```

- 高阶组件 HOC
- render Props
- 函数组件
  - 输入 props,输出 jsx
  - 没有实列,没有生命周期,没有 state
  - 不能扩展其他方法
