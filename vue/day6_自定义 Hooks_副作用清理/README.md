🟢 Day 6：自定义 Hooks + 副作用清理

⸻

一、为什么要自定义 Hooks？
	•	组合式函数（Hooks） = 逻辑复用 + 状态封装
	•	避免 mixin 污染命名空间
	•	可读性高，易维护

示例

import { ref, onUnmounted } from 'vue'

export function useCounter() {
  const count = ref(0)
  
  function increment() {
    count.value++
  }

  return { count, increment }
}
✅ 在组件中使用：
setup() {
  const { count, increment } = useCounter()
  return { count, increment }
}

⸻

二、Hooks 与副作用

很多业务逻辑会有 异步操作或事件监听，必须在组件销毁时清理。

1️⃣ onUnmounted
export function useTimer() {
  const time = ref(0)
  const timer = setInterval(() => time.value++, 1000)
  
  onUnmounted(() => {
    clearInterval(timer)
  })

  return { time }
}

✅ 关键点：
	•	避免内存泄漏
	•	避免多次重复计时器
	•	Hooks 内部自带生命周期

⸻

2️⃣ watchEffect + 清理

watchEffect((onCleanup) => {
  const id = setInterval(() => console.log('tick'), 1000)
  
  onCleanup(() => clearInterval(id))
})

📌 面试点：

watchEffect 回调可接收 onCleanup 来清理副作用，保证响应式依赖变化时不会累积副作用。

⸻

三、Hooks 设计原则（高级）
	1.	单一职责
	•	每个 useXxx 只做一件事（计时 / 请求 / 状态管理）
	2.	可组合
	•	小 Hooks 可以组合成大 Hooks

  useUser() {
  const info = useFetchUser()
  const settings = useUserSettings()
  return { info, settings }
}

3.	安全的副作用管理
	•	所有订阅 / 计时器 / 事件必须在组件卸载时清理
	•	用 onUnmounted 或 watchEffect 的 cleanup
	4.	返回最小状态
	•	Hooks 只暴露需要的数据和方法
	•	内部状态尽量私有



⸻

五、Day 6 面试高分答案
	1.	为什么要用 Hooks？

Hooks 是组合式函数，解决逻辑复用问题，比 mixin 更清晰、安全。

	2.	副作用如何管理？

用 onUnmounted 或 watchEffect 的 onCleanup，保证组件卸载时清理计时器、订阅和异步任务，避免内存泄漏。

	3.	Hooks 的设计原则？

单一职责、可组合、安全副作用、返回最小状态。

