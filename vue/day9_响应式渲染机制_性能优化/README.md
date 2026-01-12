🟢 Day 9：响应式渲染机制 & 性能优化

🎯 目标
理解 Vue3 响应式更新 + 批量渲染机制 + 虚拟 DOM diff 原理，掌握性能优化手段，并能在项目中落地。

⸻

一、为什么要关注渲染机制？
	•	Vue3 响应式 + 虚拟 DOM 是性能优化核心
	•	了解渲染流程能帮助：
	1.	避免重复渲染
	2.	精准更新 DOM
	3.	优化大列表、复杂组件性能
	4.	面试中秒杀“为什么 Vue3 性能比 Vue2 好”题

⸻

二、核心内容

1️⃣ Vue3 渲染流程

状态变化 → effect → scheduler → job queue → render() → VNode diff → patch → DOM 更新
	•	effect：注册副作用函数
	•	scheduler：批量调度，避免重复渲染
	•	job queue：去重队列
	•	VNode diff：最小化 DOM 更新

⸻

2️⃣ 批量渲染原理
	•	多次 set 只渲染一次：

	let queue = new Set()
function queueJob(job) {
  queue.add(job)
  Promise.resolve().then(() => {
    queue.forEach(fn => fn())
    queue.clear()
  })
}

	•	原理：多次状态更新加入队列 → 微任务 flush → 去重 → 一次渲染完成
	•	⚡ 面试高频点：多次 set 为什么不重复渲染

⸻

3️⃣ 虚拟 DOM + key 优化
	•	v-for 渲染必须提供唯一 key

	<li v-for="item in list" :key="item.id">{{ item.name }}</li>

		•	key 唯一 → diff 更精准
	•	key 不唯一 → DOM 可能被复用错误，导致渲染 bug

⸻

4️⃣ 避免深度代理带来的性能问题
const state = reactive({ a: 1, b: 2 })
// 如果只需要 a，b 可用 shallowReactive 或 ref 避免深度代理
	•	deep reactive 会递归代理整个对象
	•	性能敏感场景尽量只代理必要字段

⸻

5️⃣ computed / watch / watchEffect 高效使用
	•	computed：缓存派生状态
	•	watchEffect：响应式副作用，注意 onCleanup 清理
	•	watch：避免 deep watch 对大对象性能消耗高

⸻

6️⃣ 事件 & DOM 操作优化
	•	尽量使用 transform / opacity 做动画
	•	避免频繁操作 DOM
	•	可配合 requestAnimationFrame / debounce / throttle

⸻

三、面试高分模板
	1.	Vue3 性能比 Vue2 好的原因？

Proxy + effect + scheduler + job queue 精准更新 + 虚拟 DOM diff 最小化 DOM 操作 + computed 缓存派生状态

	2.	多次 set 为什么不重复渲染？

Vue3 批量更新：effect 放入 job queue，flush 时去重，一次渲染完成多次状态变化

	3.	VNode key 的作用？

用于 diff 算法精准匹配节点，减少 DOM 删除/创建

	4.	避免深度响应式性能问题的方法？

shallowReactive / ref，或者只对必要字段代理

	5.	watchEffect 副作用如何管理？

使用 onCleanup / onUnmounted 清理，防止副作用累积

⸻

四、实践示例

1️⃣ 批量更新模拟

let count = ref(0)
effect(() => console.log(count.value), { scheduler: queueJob })

count.value++
count.value++
count.value++
// 只会触发一次 effect
2️⃣ v-for + key 调试

<ul>
  <li v-for="item in list" :key="item.id">{{ item.name }}</li>
</ul>
	•	修改 list 顺序，观察 DOM 是否复用
	•	key 不唯一时可能出现渲染 bug

3️⃣ shallowReactive 优化

const state = shallowReactive({ a: 1, b: { c: 2 } })
state.a++          // 响应
state.b.c++        // 不响应（避免深度代理性能开销）
六、自检清单
	•	Vue3 响应式 + 渲染流程能画出流程图吗？
	•	多次 set 批量更新原理理解了吗？
	•	v-for key 的作用理解清楚了吗？
	•	shallowReactive / ref 在性能敏感场景下如何应用？
	•	computed / watch / watchEffect 高效使用与副作用管理？

⸻

✅ Day 9 核心总结

Vue3 性能优化核心是 批量渲染 + VNode diff + 响应式精准更新 + 避免深度代理开销 + 副作用管理，掌握这些，面对大列表、复杂组件和性能面试题都能从容应对。

