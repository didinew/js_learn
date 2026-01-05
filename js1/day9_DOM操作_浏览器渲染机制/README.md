
⸻

📘 Day 9｜DOM 操作优化 & 浏览器渲染机制

🎯 今日目标
	•	理解浏览器渲染流程：HTML → DOM → 渲染树 → 布局 → 绘制
	•	分清 重排 (Reflow) 与 重绘 (Repaint)
	•	掌握 频繁 DOM 操作优化技巧
	•	学会 批量操作 / 虚拟 DOM / requestAnimationFrame
	•	能在面试中清楚解释“为什么 DOM 操作会卡”

⸻

一、浏览器渲染流程

1️⃣ 流程图（必须脑里跑一遍）

HTML + CSS + JS
       ↓
  DOM 树 / CSSOM 树
       ↓
   渲染树 (Render Tree)
       ↓
   布局 (Layout / Reflow)  ← 元素大小/位置计算
       ↓
   绘制 (Paint)             ← 绘制像素
       ↓
   合成 (Composite)          ← 合成层显示到屏幕


✅ 重点：
	•	DOM 改变 → 可能触发重排 / 重绘
	•	CSS 改变 → 可能触发重排 / 重绘
	•	布局计算最耗性能

⸻

二、重排 (Reflow) vs 重绘 (Repaint)
操作类型
触发情况
性能消耗
重排 (Reflow/Layout)
改变元素几何信息（宽、高、位置）
高
重绘 (Repaint)
改变元素样式（颜色、背景）
中
两者区别
重排包含重绘
重绘不改变布局

🔹 示例
// 重排
div.style.width = '200px'

// 重绘
div.style.backgroundColor = 'red'

面试常问：修改 width 会导致重排还是重绘？ → 重排

⸻

三、频繁 DOM 操作优化技巧

1️⃣ 批量修改（DocumentFragment / innerHTML）
const ul = document.createElement('ul')
const fragment = document.createDocumentFragment()

for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li')
  li.textContent = i
  fragment.appendChild(li)
}

ul.appendChild(fragment) // 一次性插入，避免 1000 次重排

⸻

2️⃣ 使用 class / 样式批量修改

// ⚠️ 不要频繁修改 style
div.style.width = '100px'
div.style.height = '100px'

// ✅ 使用 class
div.classList.add('active') // CSS 控制宽高


⸻

3️⃣ requestAnimationFrame 控制动画
function animate() {
  // 改变位置 / transform
  div.style.transform = 'translateX(100px)'

  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

⚠️ 优化动画性能，避免 setTimeout 卡顿

⸻

4️⃣ 虚拟 DOM（框架原理）
	•	React / Vue 通过虚拟 DOM 批量计算差异 → 最小化真实 DOM 更新
	•	原理就是减少重排重绘次数


⸻

四、常用性能小技巧（面试高频）
	1.	减少 layout thrashing（布局抖动）
	•	避免多次读写 DOM交替操作
	2.	缓存尺寸 / 样式
	•	const width = el.offsetWidth，一次性拿值
	3.	复用 DOM 节点
	4.	CSS transform 替代 top/left
	•	transform GPU 加速，不触发重排


