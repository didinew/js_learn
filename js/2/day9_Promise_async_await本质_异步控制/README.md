Day 9：Promise / async / await 本质 + 异步控制（源码级）

🎯 目标：
- 不再“背 async/await”
- 能 手写 Promise 核心思想
- async/await 面试题 100% 不慌
---
# Promise 到底解决了什么问题？

❌ 回调地狱
fs.readFile(a, () => {
  fs.readFile(b, () => {
    fs.readFile(c, () => {})
  })
})

✅ Promise 本质

Promise = 一个“未来才会有结果”的容器
---
## Promise 的 3 种状态（必背）

pending
fulfilled
rejected
📌 状态一旦改变，永远不可逆
---
## Promise.then 的真相（99% 人不知道）
Promise.resolve(1)
  .then(res => res + 1)
  .then(res => console.log(res))

🔥 真相

then 永远返回一个新的 Promise

等价于：
then(() => {
```js
  return new Promise(...)
```
})
📌 所以才能链式调用
---
## Promise.then 是微任务（核心）
setTimeout(() => console.log(1))
Promise.resolve().then(() => console.log(2))
```js
console.log(3)

```
✅ 输出
3
2
1
- 这题你现在必须 秒答
---
## async / await 的本质（面试封神点）

一句话真相

async/await 是 Promise + Generator 的语法糖
---
```js
await 到底做了什么？
```
async function foo() {
```js
  console.log(1)
  await 2
  console.log(3)
```
}
foo()
```js
console.log(4)

```
✅ 输出
1
4
3
🧠 等价拆解
```js
console.log(1)

```
Promise.resolve(2).then(() => {
```js
  console.log(3)
```
})

```js
console.log(4)
```
📌 await 后面的代码 = 微任务
---
## async 函数返回什么？（必考）

async function foo() {
```js
  return 1
```
}
```js
console.log(foo())
```
✅ 输出
Promise { <fulfilled>: 1 }
📌 async 函数永远返回 Promise
---
七、Promise.all / race / allSettled（工程必会）

```js
Promise.all
Promise.all([p1, p2])
```
- 全成功才成功
- 一个失败直接 reject

Promise.race
- 谁快用谁
- 超时控制

```js
Promise.allSettled
```
- 不关心成功失败
- 全部结束才返回

📌 面试最爱问：

请求失败你用哪个？
💯 答：allSettled
---
八、手写 Promise 的核心思想（不写细节）

你只要会讲这 4 点
	1.	Promise 是一个类
	2.	有 state + value
	3.	then 注册回调
	4.	状态改变后统一执行回调

📌 面试不要求你 100% 写对，但要讲对
---
九、异步控制的 3 种高级写法

1️⃣ 串行

```js
await task1()
await task2()
```
2️⃣ 并行

```js
await Promise.all([task1(), task2()])
```
3️⃣ 限流（高阶）

```js
function limitTask(tasks, limit) {
  const results = []
  const executing = []
  let i = 0
  function next() {
    if (i >= tasks.length) return Promise.resolve(results)
    const task = tasks[i++]
    const p = task().then(res => {
```
      results.push(res)
      executing.splice(executing.indexOf(p), 1)
```js
      return next()
```
    })
    executing.push(p)
```js
    return p
```
  }
```js
  return next().then(() => results)
```
}
- 这是 中高级前端分水岭
---
十、Day 9 必杀面试题（现在就能答）

❓ await 会阻塞线程吗？

不会，只是暂停 async 函数，JS 线程继续执行

❓ try/catch 能捕获 Promise 错误吗？

只能捕获 await 的 reject

❓ Promise.then 为什么比 setTimeout 先执行？

因为 then 是微任务
---
🧠 Day 9 封神总结（背下来）
- Promise 是异步状态机
- then 永远返回新 Promise
- await 后面是微任务
- async 函数永远返回 Promise
- 异步控制 = 面试分水岭


