📘 Day 7｜事件循环（Event Loop）

连环输出题 · 专杀版

🎯 今日目标
- 在脑中跑完整个事件循环
- 一眼看出输出顺序
- 面试时能说清：为什么是这个顺序
---
# 事件循环【唯一正确模型】

记住这张“脑内流程图”👇

| ┌─────────────┐ | │  同步代码    │  ← 先全部执行 | └─────┬───────┘ | ↓ |
| --- | --- | --- | --- |
| ┌─────────────┐ | │  微任务队列  │  ← Promise.then / await | └─────┬───────┘ | ↓ |
| ┌─────────────┐ | │  宏任务队列  │  ← setTimeout / setInterval | └─────────────┘ | ↑ |
   进入下一轮 Event Loop

口诀（必背）

同步 → 微任务 → 宏任务（一轮一轮）
---
## 基础连环题（热身）

🔹 题 1

```js
console.log(1)

```
setTimeout(() => {
```js
  console.log(2)
```
}, 0)

Promise.resolve().then(() => {
```js
  console.log(3)
```
})

```js
console.log(4)
```
✅ 正确输出

1
| 4 | 3 |
| --- | --- |
| 2 | 拆解 |
| 1️⃣ 同步：1 → 4 | 2️⃣ 微任务：3 |
3️⃣ 宏任务：2
---
## async / await 连环题（重点）

🔹 题 2
async function test() {
```js
  console.log(1)
  await Promise.resolve()
  console.log(2)
```
}

test()
```js
console.log(3)

```
✅ 输出
1
3
2

核心解释（面试官最想听）

```js
await 后面的代码，会被放进 微任务队列
```
---
## Promise 套 Promise（常挂点）

🔹 题 3

Promise.resolve().then(() => {
```js
  console.log(1)
```
  Promise.resolve().then(() => {
```js
    console.log(2)
```
  })
})

```js
console.log(3)
```
✅ 输出
3
1
2

关键点
- 微任务中创建的微任务
- 仍然在本轮微任务队列中执行
---
## 综合杀手题（面试最爱）

🔥 题 4（经典必挂）
```js
console.log(1)

```
setTimeout(() => {
```js
  console.log(2)
```
  Promise.resolve().then(() => {
```js
    console.log(3)
```
  })
}, 0)

Promise.resolve().then(() => {
```js
  console.log(4)
```
})

```js
console.log(5)
```
| ✨ 正确输出 | 1 |
| --- | --- |
| 5 | 4 |
| 2 | 3 |
逐行拆解（一定要会）

1️⃣ 同步执行：1 → 5
2️⃣ 微任务：4
3️⃣ 宏任务（setTimeout）：2
4️⃣ 宏任务里的微任务：3
---
## 面试官追问（你现在要会答）

Q1：为什么微任务比宏任务先执行？
- 为了保证 Promise 的状态一致性

Q2：await 一定会产生微任务吗？
- 是的，await 后续代码一定进微任务队列

Q3：Promise.then 是同步还是异步？
- 注册是同步，执行是异步（微任务）
