🟢 Day 5：异步更新 & nextTick 深入

⸻

一、核心问题

state.count++
state.count++
state.count++
为什么视图只更新一次，而不是三次？

Vue3 的秘密武器：异步更新 + scheduler + job queue

⸻

二、Vue3 异步更新的本质

1️⃣ 数据变化 → effect → scheduler

state.count++

	•	Proxy.set → trigger → 找到依赖的 effect
	•	effect 有 scheduler → 加入 job queue
	•	队列保证每个 effect 只执行一次

⸻

2️⃣ Job queue + 微任务
	•	Vue3 使用 微任务（Promise.then） flush queue
	•	同一轮同步代码执行完 → 执行微任务 → 批量更新 DOM


  queue.add(fn)
Promise.resolve().then(flushJobs)

✅ 批量更新好处：
	•	避免重复渲染
	•	提高性能
	•	保证 computed / watch 的同步逻辑正确

⸻

3️⃣ nextTick 本质
nextTick(() => console.log('DOM 已更新'))

	•	nextTick 本质：

把回调放到当前 job queue 执行完之后的微任务中

	•	作用：
	•	保证 DOM 已经更新
	•	方便拿到最新节点
	•	避免 setTimeout 延迟不精准

⸻

三、连续 set 的完整流程（必须会讲）

state.count++    // Proxy.set → trigger → effect → scheduler → job queue.add(effect)
state.count++
state.count++

同步代码执行完
↓
微任务队列 flush job queue
↓
effect 执行 → 更新 DOM


✅ 所以 DOM 只更新一次

⸻

四、computed + nextTick 配合

const double = computed(() => state.count * 2)

state.count++
state.count++

nextTick(() => {
  console.log(double.value)  // 最新值
})

	•	computed 内部 effect + scheduler
	•	nextTick 保证访问时，缓存已经更新
	•	✅ 面试高频题：为什么模板里访问 computed 不需要手动触发？

⸻

五、watch + nextTick 配合
watch(state, async () => {
  await nextTick()
  console.log('DOM 已渲染')
})

	•	watch 是副作用
	•	如果需要操作 DOM，必须 nextTick
	•	否则拿到的是旧 DOM

场景
执行顺序
触发次数
直接 set
trigger → scheduler → queue → flush
批量一次
多次 set
多次加入 queue → flush 时去重
一次
nextTick
等 queue flush 完 → 回调
精准
computed
lazy + effect + scheduler
自动更新缓存

七、Day 5 面试标准答案
	1.	为什么连续 set 只渲染一次？

Vue3 使用异步更新机制，set 触发依赖 effect 被加入 job queue，同一轮同步代码结束后统一 flush job queue，只执行一次 DOM 更新。

	2.	nextTick 本质？

将回调放在当前 job queue 执行完后的微任务中，保证 DOM 已更新。

	3.	computed / watch 如何利用 scheduler 精准更新？

effect + scheduler 控制执行时机，避免重复执行，实现缓存和副作用隔离。


