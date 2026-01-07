🟦 Day 6｜requestAnimationFrame & 动画优化

🎯 今日目标
	•	理解 requestAnimationFrame 工作原理
	•	能用 rAF 写高性能动画
	•	理解 transform / opacity GPU 加速
	•	能优化 频繁 DOM 操作动画
	•	面试能解释 为什么 rAF 优化比 setTimeout / setInterval 更高效

⸻

一、setTimeout / setInterval 的局限性
// ❌ setInterval 动画
setInterval(() => {
  box.style.left = box.offsetLeft + 1 + 'px'
}, 16)

问题：
	•	浏览器可能在后台 tab 降低定时器精度
	•	每次修改 top / left 触发重排 → 性能差
	•	帧率不稳定

⸻

二、requestAnimationFrame 原理
	•	浏览器在 下一次重绘前调用 rAF 回调
	•	保证动画与浏览器刷新同步（一般 60fps）
	•	自动暂停后台 tab → 节省资源

function animate() {
  box.style.left = box.offsetLeft + 1 + 'px'
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

⸻

三、优化动画的核心技巧

1️⃣ 使用 transform / opacity

// 高性能写法
box.style.transform = 'translateX(100px)'
box.style.opacity = 0.5

	•	不会触发重排
	•	只触发 GPU 合成 → 性能最高

2️⃣ 避免直接修改 top / left / width / height
	•	这些会触发重排 → CPU 参与布局 → 慢

3️⃣ 批量动画修改
	•	尽量一次性修改 transform / opacity
	•	避免循环中单个修改 DOM

⸻

四、完整高性能动画示例
const box = document.getElementById('box')
let x = 0

function animate() {
  x += 2
  box.style.transform = `translateX(${x}px)`
  if (x < 500) {
    requestAnimationFrame(animate)
  }
}

requestAnimationFrame(animate)

✅ 高性能、平滑、GPU 加速
✅ 自动暂停后台标签页，不会卡顿