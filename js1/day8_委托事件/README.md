📘 Day 8｜DOM 事件机制

冒泡 · 捕获 · 事件委托（必考）

🎯 今日目标
- 搞清 DOM 事件的 3 个阶段
- 理解 事件冒泡 & 捕获
- 掌握 事件委托为什么性能好
- 能说清 Vue / React 事件的本质
---
# DOM 事件的 3 个阶段（必须背）

捕获阶段（capture）
| ↓ | 目标阶段（target） |
| --- | --- |
| ↓ | 冒泡阶段（bubble） |
| 事件从 window → document → body → 目标元素 | 再从 目标元素 → body → document → window |
---
## 捕获 vs 冒泡（代码级理解）

<div id="parent">
  <button id="child">Click</button>
</div>
parent.addEventListener('click', () => {
```js
  console.log('parent 冒泡')
```
})

parent.addEventListener('click', () => {
```js
  console.log('parent 捕获')
```
}, true)

child.addEventListener('click', () => {
```js
  console.log('child')
```
})

点击 button，输出顺序是：
parent 捕获
child
parent 冒泡
---
## 事件对象（面试常问）

child.addEventListener('click', e => {
  e.target      // 实际触发的元素
  e.currentTarget // 当前绑定事件的元素
})
⚠️ 超级重点区别
- target：点到谁
- currentTarget：事件绑在哪
---
## 事件委托（核心）

❌ 错误做法（性能差）

liList.forEach(li => {
  li.addEventListener('click', handler)
})

✅ 正确做法（事件委托）

ul.addEventListener('click', e => {
```js
  if (e.target.tagName === 'LI') {
    console.log(e.target.innerText)
```
  }
})

为什么事件委托性能好？
- 减少事件监听数量
- 支持 动态新增 DOM
- 利用冒泡机制
---
## 阻止事件传播（必会）

e.stopPropagation()

⚠️ 注意：
- 只阻止冒泡，不影响捕获阶段
- React 中是 合成事件
---
## Vue / React 里的事件本质

Vue
<button @click="fn"></button>
- 本质：addEventListener
- .stop .prevent 是语法糖
---
React（重点）
- React 事件不是直接绑定在 DOM 上
- 而是 统一绑定在 root（或 document）

<button onClick={fn} />
本质：事件委托 + 合成事件
---
七、面试官追问（你要能答）

Q1：为什么事件委托能处理动态元素？
- 因为事件是冒泡到父元素统一处理的

Q2：React 为什么要做合成事件？
- 统一浏览器差异 + 提升性能


