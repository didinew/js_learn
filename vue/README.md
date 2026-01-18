🚀 Vue 高阶 30 天进阶路线（完整版）

⸻

🟢 第 1 周：响应式与组合式地基（Day 1–7）

目标：彻底吃透 Vue3 响应式，避免 90% 常见坑

Day 1：Vue3 响应式核心模型
	•	Proxy vs Object.defineProperty
	•	为什么 Vue3 不需要 $set
	•	shallowReactive / shallowRef 使用场景

✅ 输出：

用 3 句话解释 Vue3 响应式

⸻

Day 2：ref / reactive / toRefs 深水区
	•	为什么解构会丢响应？
	•	toRefs 是“补救”，不是“最佳实践”
	•	ref.value 什么时候必须？

💣 面试炸点：

为什么 const { x } = reactive() 不响应？

⸻

Day 3：computed vs watch 本质
	•	computed 缓存机制
	•	watch 何时多次触发？
	•	watchEffect 的依赖收集

✅ 实战：
	•	写一个防抖 watch
	•	写一个“只响应特定字段”的 watch

⸻

Day 4：副作用系统（effect / track / trigger）
	•	effect 是什么？
	•	依赖是怎么被收集的？
	•	scheduler 的作用

📌 提升：

理解 nextTick 本质

⸻

Day 5：异步更新与 nextTick
	•	为什么更新是异步的？
	•	nextTick vs Promise.then
	•	DOM 更新批处理

💣 追问：

连续 setState 会发生什么？

⸻

Day 6：自定义 Hooks（组合式函数）
	•	hooks 的职责边界
	•	hooks vs mixin
	•	副作用清理（onUnmounted）

✅ 实战：
	•	useDebounceRef
	•	useRequest

⸻

Day 7：阶段复盘 + 面试输出
	•	手写 Vue3 响应式最小模型
	•	总结 10 个响应式坑点

📄 输出：

《Vue3 响应式面试速答卡》

⸻

🟡 第 2 周：组件设计与状态架构（Day 8–14）

目标：能写“不会烂尾”的组件

⸻

Day 8：组件设计原则
	•	组件拆分标准
	•	受控 / 非受控组件
	•	Dumb / Smart Component

⸻

Day 9：props / emit 设计艺术
	•	为什么 props 要单向？
	•	emit 的语义设计
	•	v-model 多参数

💣 面试题：

为什么不推荐子组件改 props？

⸻

Day 10：Slot 深度使用
	•	默认 / 具名 / 作用域插槽
	•	slot 为什么能解耦？
	•	slot 性能问题

⸻

Day 11：复杂组件封装
	•	表格 / 日历 / 图表组件设计
	•	状态下沉 or 上提？
	•	受控 + 非受控混合

⸻

Day 12：状态管理边界
	•	Pinia vs Vuex
	•	页面态 / 业务态 / 全局态
	•	状态爆炸如何避免？

⸻

Day 13：Pinia 深水区
	•	store 拆分策略
	•	getter 缓存机制
	•	store 与 hooks 协作

⸻

Day 14：阶段复盘 + 项目改造
	•	重构一个旧组件
	•	状态解耦

📄 输出：

《Vue 组件设计 Checklist》

⸻

🟠 第 3 周：性能优化 & 工程化（Day 15–21）

目标：写“跑得快、不出事故”的 Vue

⸻

Day 15：Vue 性能瓶颈分析
	•	重渲染来源
	•	响应式颗粒度
	•	v-if vs v-show

⸻

Day 16：watch / computed 性能优化
	•	精准 watch
	•	取消副作用
	•	防抖 / 节流

⸻

Day 17：列表与大数据量
	•	key 的真正作用
	•	虚拟列表
	•	Diff 成本控制

⸻

Day 18：异步与竞态问题
	•	请求覆盖
	•	AbortController
	•	请求状态管理

⸻

Day 19：工程结构设计
	•	目录规范
	•	业务模块化
	•	通用能力沉淀

⸻

Day 20：错误处理与稳定性
	•	errorCaptured 全局错误捕获
	•	全局错误
	•	白屏兜底

⸻

Day 21：阶段复盘 + 性能报告
	•	页面性能分析
	•	性能优化总结

📄 输出：

《Vue 性能优化实战清单》

⸻

🔵 第 4 周：原理 + 面试反杀（Day 22–30）

目标：面试官追问你，你还能继续讲

⸻

Day 22：模板编译原理
	•	AST
	•	静态提升
	•	Patch Flag

⸻

Day 23：虚拟 DOM & diff
	•	双端 diff
	•	key 为什么重要
	•	Vue vs React diff

⸻

Day 24：调度器 & job queue
	•	scheduler
	•	flush 时机
	•	nextTick 内部

⸻

Day 25：生命周期本质
	•	生命周期与 effect
	•	父子组件顺序

⸻

Day 26：SSR & Hydration
	•	为什么需要 SSR
	•	Hydration 做了什么

⸻

Day 27：Vue 与 React 思想对比
	•	响应式 vs 不可变
	•	模板 vs JSX
	•	适用场景

⸻

Day 28：高频面试“追杀题”
	•	50 道 Vue 深水区
	•	一问三杀

⸻

Day 29：模拟面试
	•	压力追问
	•	项目追问

⸻

Day 30：终极复盘
	•	技术总结
	•	技术表达
	•	简历升级

📄 输出：

《Vue 高阶知识脑图 + 面试话术》

⸻

🎯 执行建议（非常重要）
	•	每天必须有输出
	•	不“看懂”，要“讲出来”
	•	每周至少 1 次复盘
	