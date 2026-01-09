---
🟦 Day 2｜样式操作 & 类名管理

🎯 今日目标
- 掌握 classList 操作（add / remove / toggle / contains）
- 理解 style 修改 与 CSS 计算样式
- 区分 直接修改 style vs CSS class
- 学会 批量修改样式优化性能
- 面试能解释 为什么频繁 style 改动会触发重排/重绘
---
# classList 操作（必会）
<div id="box" class="red big"></div>

```js
const box = document.getElementById('box')

```
| // 增加 class | box.classList.add('active') |
| --- | --- |
| // 移除 class | box.classList.remove('red') |
| // 切换 class | box.classList.toggle('hidden') |
| // 判断 class 是否存在 | console.log(box.classList.contains('big')) // true |
✅ 面试加分：classList 操作比直接修改 style 更好，方便批量管理 CSS 样式，也利于动画 / 响应式切换。
---
## 直接修改 style
| // 单个属性 | box.style.width = '200px' |
| --- | --- |
| box.style.height = '100px' | box.style.backgroundColor = 'blue' |
| // 批量修改（不建议频繁操作） | box.style.cssText = 'width: 300px; height: 150px; background-color: red;' |
⚠️ 注意：
- style 只能读写内联样式
- 不会读取 CSS class / 外部样式
- 读取 style 时只得到内联值
---
## 获取计算样式
```js
const computedStyle = window.getComputedStyle(box)
console.log(computedStyle.width)
console.log(computedStyle.backgroundColor)

```
这是获取 最终渲染样式（包括 CSS class / 外部样式表）
---
## 批量样式操作优化（必备技巧）
```js
const boxes = document.querySelectorAll('.box')

```
// ❌ 循环单个修改 style → 频繁重排
boxes.forEach(b => b.style.width = '100px')

// ✅ 使用 class 或 DocumentFragment 批量修改
boxes.forEach(b => b.classList.add('active'))

面试高频：
为什么频繁修改 style 会卡？
→ 每次修改可能触发 重排 / 重绘，性能消耗大
→ 使用 class 或 DocumentFragment 可以一次性完成修改，减少渲染次数

