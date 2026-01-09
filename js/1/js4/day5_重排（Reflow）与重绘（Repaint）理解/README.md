🟦 Day 5｜重排（Reflow）与重绘（Repaint）理解

🎯 今日目标
- 理解 重排 vs 重绘 的区别
- 掌握 哪些操作触发重排 / 重绘
- 学会 批量 DOM 操作优化技巧
- 面试能清楚解释为什么 频繁 DOM 操作会卡
---
# 浏览器渲染流程回顾
DOM / CSSOM → 渲染树 → 布局(Layout / Reflow) → 绘制(Paint) → 合成(Composite)
- 重排(Reflow)：布局计算，改变元素大小、位置 → 性能消耗大
- 重绘(Repaint)：只改变外观（颜色、背景色等） → 性能消耗较小
---
## 重排 vs 重绘示例

```js
const div = document.getElementById('box')

```
// 重排：影响布局
div.style.width = '200px'
div.style.height = '100px'

// 重绘：只改变外观，不影响布局
div.style.backgroundColor = 'red'
div.style.color = 'white'

🔹 面试常问：
- 修改 width / height → 重排
- 修改 color / background-color → 重绘
- 重排包含重绘
---
## 频繁 DOM 操作的性能问题

❌ 低性能示例

for (let i = 0; i < 1000; i++) {
```js
  const li = document.createElement('li')
```
  li.textContent = `Item ${i}`
  ul.appendChild(li) // 每次 appendChild 触发一次重排
}
- 1000 次重排 → 页面卡顿
---
| ✅ 高性能优化方案 | 

1.	批量操作 → DocumentFragment 
```js
 const fragment = document.createDocumentFragment() | for (let i = 0; i < 1000; i++) { 
 const li = document.createElement('li') | li.textContent = `Item ${i}` 
 fragment.appendChild(li)  } 
ul.appendChild(fragment) // 一次性操作 → 只触发一次重排
```
	2.	使用 class 批量修改样式
```js
const boxes = document.querySelectorAll('.box')

boxes.forEach(b => b.classList.add('active')) // CSS 控制样式，避免多次 style 修改
```
	3.	缓存尺寸 / 属性，减少 layout thrashing

```js
	const width = div.offsetWidth

for (let i = 0; i < 100; i++) {
  div.style.width = width + i + 'px'
}
```
---
## 优化动画

// ❌ setInterval + top / left → 会频繁触发重排
setInterval(() => {
  box.style.left = box.offsetLeft + 1 + 'px'
}, 16)

// ✅ requestAnimationFrame + transform
```js
function animate() {

  box.style.transform = `translateX(${box.offsetLeft + 1}px)`
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate)
```
- transform / opacity → GPU 加速 → 不触发重排
- requestAnimationFrame → 浏览器按帧刷新，性能更高
	

