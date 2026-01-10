🟢 Day 4：副作用系统 & 精准更新

⸻

一、核心概念回顾

Vue3 响应式由 三件套 构成：
	1.	effect：副作用函数 → 数据变化后要做的事情
	2.	track：依赖收集 → 哪个 effect 依赖哪个属性
	3.	trigger：触发更新 → 数据变化后调用 effect

今天我们加上 scheduler，才算完整理解“精准更新”。

⸻

二、effect 本质
let activeEffect = null

function effect(fn, options = {}) {
  const effectFn = () => {
    activeEffect = effectFn
    fn()
    activeEffect = null
  }
  effectFn.scheduler = options.scheduler
  effectFn()
  return effectFn
}

✅ 核心点：
	•	effect(fn) 注册副作用
	•	每个 effect 都可以带 scheduler，控制执行时机

⸻

三、track（依赖收集）

function track(target, key) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target) || new Map()
  let dep = depsMap.get(key) || new Set()
  dep.add(activeEffect)
  targetMap.set(target, depsMap)
  depsMap.set(key, dep)
}

	•	什么时候触发？get
	•	为什么能“精准”？每个属性一个 dep（Set）

⸻

四、trigger（触发副作用）
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  const dep = depsMap?.get(key)
  dep?.forEach(effectFn => {
    if (effectFn.scheduler) {
      effectFn.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}

	•	数据变化 → 找到依赖 → 执行 effect
	•	scheduler 可控制更新时机（避免重复渲染）

⸻

五、scheduler（调度器）关键

为什么需要 scheduler？
	•	避免重复执行 effect（多次 set → 合并更新）
	•	控制宏/微任务执行顺序（nextTick）
	•	实现精准更新（只在必要时执行）

effect(() => {
  console.log(state.count)
}, {
  scheduler: fn => queueJob(fn)
})


⸻

Vue3 scheduler 工作原理（简化版）
	1.	effect 放入 job queue
	2.	同一轮更新，每个 effect 只执行一次
	3.	下一轮微任务 flush queue → 更新视图

📌 面试高分点：

Vue3 批量更新 + nextTick 的本质就是 scheduler

⸻

六、执行流程图（必画）

effect(fn)
   ↓
fn 读取 state.xxx
   ↓
Proxy.get → track
   ↓
依赖表：target.key → effect
   ↓
state.xxx = newValue
   ↓
Proxy.set → trigger
   ↓
scheduler(fn) 或直接 fn()
   ↓
视图更新 / computed 更新
✅ 精准：只有真正依赖的 effect 被触发

⸻

七、nextTick 本质
nextTick(() => {
  console.log('DOM 已更新')
})
原理：
	•	Vue 不同步更新 DOM
	•	每次 set → effect → 放入 scheduler queue
	•	flush queue → 微任务触发 → DOM 更新
	•	nextTick 就是微任务回调队列的包装

⸻

八、为什么 computed / watch 都能精准更新
	•	computed 内部是 lazy + effect + scheduler
	•	watch 内部是 effect + scheduler + 副作用
	•	track + trigger 精准找到依赖
	•	scheduler 保证一次更新只跑一次

面试追杀点：
	•	为什么多次 set 只渲染一次？
	•	为什么模板里 ref 不用 .value？
	•	computed 为什么惰性 + 缓存？

⸻

九、Day 4 面试标准答案
	1.	effect / track / trigger 三件套

effect：副作用函数
track：收集依赖
trigger：触发依赖

	2.	scheduler 的作用

控制更新时机，批量处理，避免重复渲染

	3.	nextTick 原理

Vue 异步 DOM 更新，把更新放微任务队列，保证回调时 DOM 已渲染

