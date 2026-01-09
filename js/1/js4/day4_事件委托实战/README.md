🟦 Day 4｜事件委托实战

🎯 今日目标
- 理解 事件委托原理
- 能用 父级统一绑定事件处理子元素
- 能处理 动态新增元素的事件绑定
- 掌握 性能优化，避免大量重复 addEventListener
- 面试能解释 为什么事件委托性能好 + 原理
---
# 事件委托原理

核心原理：
- 利用 事件冒泡，将子元素事件统一在父元素处理
- 通过 e.target 判断实际点击的子元素

优点：
	1.	减少事件监听器数量 → 提升性能
	2.	支持动态添加元素 → 不需要单独绑定事件
	3.	代码更清晰，易维护

实现方式：
- 在父元素上绑定事件，通过 e.target 判断点击的子元素
---
## 事件委托实战

1️⃣ 基础实现

场景：有一个 ul 列表，每个 li 点击时弹出其文本内容

```js
<ul id="list">
| <li>项目 1</li> | <li>项目 2</li> | <li>项目 3</li> | </ul> |
| --- | --- | --- | --- |
| <script> | const list = document.getElementById('list'); | list.addEventListener('click', e => { | if (e.target.tagName === 'LI') { |
| console.log(e.target.textContent); | } | }); | </script> |
```

解释：点击 li 时，事件冒泡到 ul，通过判断 e.target 是否为 li 来处理点击事件

2️⃣ 动态新增元素

场景：点击按钮新增一个 li 项目，新增的 li 也能响应点击事件

```js
<ul id="list"></ul>
```js
const newLi = document.createElement('li')
```
newLi.textContent = 'TS'
ul.appendChild(newLi) // 事件委托依然生效
```
面试点：动态元素为什么不用再单独绑定事件？
→ 因为事件冒泡会到父元素，父元素统一处理即可

## 性能优化注意点

❌ 低性能写法（面试常问）

```js
const items = document.querySelectorAll('li')
```
items.forEach(item => {
  item.addEventListener('click', handler)
})
- 每个 li 都绑定一次，1000 个元素就 1000 个监听器 → 重量级
- 动态新增元素必须再次绑定事件 → 代码重复

✅ 高性能委托写法
ul.addEventListener('click', e => {
```js
  if (e.target.tagName === 'LI') {
    console.log(e.target.textContent)
```
  }
})
- 只绑定一次监听器
- 支持动态元素
- 节省内存，提高性能

