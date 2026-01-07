🟦 Day 3｜事件冒泡与捕获

🎯 今日目标
	•	理解 DOM 事件 3 个阶段：捕获 → 目标 → 冒泡
	•	掌握 addEventListener 第三个参数（capture）
	•	能阻止事件冒泡 / 默认行为 (stopPropagation / preventDefault)
	•	能手写事件冒泡顺序实验
	•	面试能清楚解释事件流、冒泡与捕获机制

⸻

一、事件流阶段回顾

事件流包括：
捕获阶段 (capture) → 目标阶段 (target) → 冒泡阶段 (bubble)

	•	捕获阶段：事件从 window → document → body → 目标元素
	•	目标阶段：事件到达目标元素
	•	冒泡阶段：事件从目标元素向上传播回 window


⸻

二、捕获 vs 冒泡
<div id="parent">
  <button id="child">Click</button>
</div>

const parent = document.getElementById('parent')
const child = document.getElementById('child')

// 冒泡阶段监听
parent.addEventListener('click', () => {
  console.log('parent 冒泡')
})

// 捕获阶段监听
parent.addEventListener('click', () => {
  console.log('parent 捕获')
}, true)

child.addEventListener('click', () => {
  console.log('child')
})
点击 child 输出顺序：
parent 捕获
child
parent 冒泡

面试点：顺序必须熟练背，会被问“为什么 parent 捕获在 child 前？”

⸻

三、阻止事件传播

child.addEventListener('click', e => {
  e.stopPropagation()   // 阻止冒泡
  e.preventDefault()    // 阻止默认行为（如 a 标签跳转）
  console.log('child clicked')
})
	•	stopPropagation()：阻止冒泡，不影响捕获阶段
	•	preventDefault()：阻止浏览器默认行为

⸻

四、事件对象核心属性
child.addEventListener('click', e => {
  console.log(e.target)        // 实际点击的元素
  console.log(e.currentTarget) // 当前绑定事件的元素
})
	•	target：事件真正触发的元素
	•	currentTarget：事件当前监听器绑定的元素


