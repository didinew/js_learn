Day 24：调度器 & Job Queue（调度器与任务队列）

1️⃣ Scheduler（调度器）
	•	概念：
Vue 响应式系统中，当数据变化时，effect 会被触发，调度器负责收集更新任务（job）并统一调度执行。
	•	作用：
	1.	去重（同一个 effect 多次触发只执行一次）
	2.	批量更新（避免重复渲染）
	3.	控制执行顺序（父子组件、watch/computed）
	•	源码机制：
	•	每个 effect 可以传入 scheduler 函数 → push 到 job queue
	•	面试追问：
	•	Q: 为什么需要 scheduler？
A: 避免同一个依赖重复触发更新，优化渲染性能。

⸻

2️⃣ Job Queue（任务队列）
	•	概念：
存储所有待执行的更新任务（effect），在下一轮 microtask 中统一 flush。
	•	特性：
	1.	去重：使用 Set 存储
	2.	异步 flush：保证同一轮同步逻辑先完成
	3.	顺序执行：父组件先更新 → 子组件
	•	源码示意：

	const queue = new Set()
function queueJob(job) {
  queue.add(job)
  nextTick(flushJobs)
}
function flushJobs() {
  queue.forEach(job => job())
  queue.clear()
}

⸻

3️⃣ Flush 时机
	•	原理：
	•	Vue 会在微任务（microtask）中 flush job queue
	•	确保同步代码先执行，渲染批量处理
	•	流程：
	1.	响应式数据 set 触发 effect
	2.	scheduler 推入 job queue
	3.	nextTick 安排 flush（Promise.then → microtask）
	4.	执行 job，patch DOM

⸻

4️⃣ nextTick 内部原理
	•	概念：将回调延迟到 DOM 更新之后执行
	•	原理：
	1.	使用 Promise.then / MutationObserver / setTimeout 选可用微任务机制
	2.	确保 effect flush 完成后再执行回调
	•	面试追问：
	•	Q: nextTick 为什么不是同步执行？
A: 需要等待响应式更新批量完成，避免多次 DOM 渲染。
	•	Q: nextTick 内部如何实现去重？
A: 内部有一个 callback queue，同一个回调不会重复入队。

⸻

5️⃣ 渲染更新流程图（简化）

数据变化（reactive/set）
        │
        ▼
触发 effect → scheduler
        │
        ▼
加入 Job Queue（Set 去重）
        │
        ▼
nextTick flush → 微任务队列
        │
        ▼
执行 job → patch 更新 DOM
