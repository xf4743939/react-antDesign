# promise 知识

B 站 es6 promise 20 章

支持链式调用,可以解决回调地狱问题

1. promise.all 只有所有的 promise 都成功才成功,只有一个失败就直接失败
2. promise.race 包含 n 个 promise,返回一个新的 promise,第一个完成 promise 的结果状态就是最终的结果状态
