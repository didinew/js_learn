# JS 内存模型（先立世界观）

JS 内存分两块
区域
存什么
栈内存
基本类型、执行上下文、函数调用
堆内存
对象、数组、函数

📌 引用类型一定在堆中
---
## GC 是什么时候发生的？

JS 引擎会在“合适的时机”自动回收无用内存
你 不能手动 GC
---
## 垃圾回收的两大算法（必背）
---
1️⃣ 引用计数（老古董，但要懂）
```js
let a = {}
let b = a
```
a = null
- b 还指向对象 → 不回收

❌ 致命缺陷：循环引用
```js
function fn() {
  const a = {}
  const b = {}
```
  a.b = b
  b.a = a
}

引用计数会误判“还在用”
---
2️⃣ 标记清除（现代 JS 核心）

核心思想
从“根对象”开始找，找不到的就是垃圾

根对象包括
- 全局对象（window）
- 当前执行栈中的变量
- 闭包引用的变量
---
标记清除流程

1. 标记所有可达对象
2. 清除不可达对象

📌 循环引用在这里没问题
---
## 闭包为什么不会被回收？（必考）

```js
function foo() {
  let a = 1
  return function () {
    console.log(a)
```
  }
}

🧠 原因
- a 被 inner 函数引用
- 从 GC 根可达
- 标记为“存活对象”
- 不是“闭包特殊”，而是“仍然可达”
---
## 真正的内存泄漏是什么？

应该被回收，却因为错误引用还活着
---
常见泄漏场景（项目级）
---
1️⃣ 意外的全局变量（最常见）

```js
function foo() {
```
  a = 1 // ❌
}


📌 a 挂在 window 上，永远不回收
---
2️⃣ 定时器未清除
setInterval(() => {
```js
  console.log('running')
```
}, 1000)


📌 回调引用的变量无法释放
---
3️⃣ 事件监听未解绑

element.addEventListener('click', handler)

📌 element 被引用
---
4️⃣ DOM + 闭包（地狱组合）

```js
function bind() {
  const el = document.getElementById('box')
```
  el.onclick = () => {
```js
    console.log(el)
```
  }
}

📌 DOM 永不释放
---
5️⃣ 缓存不设上限
```js
const cache = {}

```
📌 无限增长 = 慢性泄漏
---
## Chrome DevTools 内存分析（面试加分）

常用工具
- Memory → Heap Snapshot
- Allocation Timeline

排查思路
	1.	多次操作
	2.	快照对比
	3.	查找 Detached DOM
	4.	看 Retainers

📌 会说这段，面试官直接高看你一眼
---
七、如何“正确使用闭包”？

工程级原则
- 闭包中不要引用 DOM
- 用完清空引用
  fn = null

  	组件销毁时解绑事件 / 清除定时器
---
八、面试高频追杀题（必背）

❓ JS 为什么不用引用计数？

因为循环引用无法回收
---
❓ WeakMap / WeakSet 有什么用？

弱引用，不影响 GC，适合缓存 DOM
---
❓ 怎么判断是否内存泄漏？

内存随操作持续增长且不回落
---
九、封神级总结（背下来）

GC 只关心“是否可达”，不关心“你怎么写”

闭包不危险，
危险的是 不释放的引用
