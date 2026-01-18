
⸻

Day 22：模板编译原理
	•	AST（抽象语法树）
	•	作用：把模板字符串 → 语法树 → 渲染函数
	•	面试追问：
	•	Q: 为什么 Vue 要先转 AST？
A: 可以做静态分析、优化，减少运行时开销。
	•	静态提升
	•	原理：将不依赖响应式的数据提升为常量节点，减少 Patch 更新。
	•	面试追问：
	•	Q: 静态节点什么时候不会被提升？
A: 动态绑定属性、插值、事件等。
	•	Patch Flag
	•	原理：编译阶段生成的标记，用来告诉渲染器哪些节点需要动态更新。
	•	面试追问：
	•	Q: Patch Flag 有哪些类型？
A: TEXT、CLASS、STYLE、PROPS、FULL_PROPS、KEYED_FRAGMENT 等。

⸻

Day 23：虚拟 DOM & diff
	•	双端 diff
	•	原理：从两端同时遍历，新旧节点头尾比对，减少遍历次数。
	•	key 为什么重要
	•	保持节点身份，减少移动 & 重渲染。
	•	Vue vs React diff
	•	Vue：有 PatchFlag + 静态提升 + 深度依赖追踪 → 精准更新
	•	React：不可变 + JSX → diff 依赖 key，更新策略较保守

⸻

Day 24：调度器 & job queue
	•	scheduler
	•	原理：effect 注册到队列，避免重复触发。
	•	面试追问：
	•	Q: scheduler 如何去重？
A: 用 Set 或 Map 存储 job。
	•	flush 时机
	•	在 microtask（Promise）中 flush，保证同步逻辑完成后再渲染。
	•	nextTick 内部
	•	原理：Promise.then → flushPostFlushCbs → 执行更新。

⸻

Day 25：生命周期本质
	•	生命周期与 effect
	•	每个生命周期钩子本质就是 effect 或 watchEffect 的封装。
	•	父子组件顺序
	•	beforeCreate → created → beforeMount → mounted → 更新 → unmount
	•	父先子后，卸载时子先父后。

⸻

Day 26：SSR & Hydration
	•	为什么需要 SSR
	•	SEO + 首屏渲染快 + 数据预取。
	•	Hydration 做了什么
	•	将服务端渲染的 HTML 绑定到客户端虚拟 DOM，复用已有 DOM 而不是重新渲染。

⸻

Day 27：Vue 与 React 思想对比
	•	响应式 vs 不可变
	•	Vue：Proxy 响应式，数据变化自动触发渲染
	•	React：不可变状态 + setState → diff
	•	模板 vs JSX
	•	Vue 模板更声明式，React JSX 更灵活、逻辑嵌套强
	•	适用场景
	•	Vue：快速开发、模板清晰、数据驱动
	•	React：逻辑复杂、状态管理复杂、生态成熟

⸻

Day 28：高频面试“追杀题”
	•	50 道深水题，一问三杀：答题要点 → 原理 → 源码 → 场景
	•	核心技巧：先答概念，再答原理，再举例证实

⸻

Day 29：模拟面试
	•	压力追问：记住结构化表达：原理 → 举例 → 源码/性能 → 适用场景
	•	项目追问：用你做过的项目举例说明原理落地

⸻

Day 30：终极复盘
	•	技术总结：画流程图 + 写面试笔记
	•	技术表达：简洁 + 原理清晰 + 源码印证
	•	简历升级：突出技术点 + 原理理解 + 项目落地
