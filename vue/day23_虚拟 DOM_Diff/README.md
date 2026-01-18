Day 23：虚拟 DOM & Diff

1️⃣ 虚拟 DOM（VNode）
	•	概念：JS 对象形式的 DOM 描述，不是真正的 DOM，而是内存中的树。
	•	作用：
	1.	避免直接操作真实 DOM（性能消耗大）
	2.	可做跨平台渲染（Web、Native、SSR）
	3.	便于 diff 算法更新
	•	面试追问：
	•	Q: 为什么 Vue 和 React 都使用虚拟 DOM？
A: 提高渲染性能，减少 DOM 操作，便于优化更新。

⸻

2️⃣ Diff 算法
	•	概念：比较新旧虚拟 DOM 树，找到最小更新操作。
	•	Vue 双端 Diff 原理：
	1.	同层比较（VNode 对比只在同一层，不跨层）
	2.	从 头尾双端遍历（Head/Tail pointer）
	3.	key 相同 → patch
	4.	key 不同 → 创建/删除节点
	•	优点：
	•	避免全量遍历
	•	减少移动节点次数
	•	面试追问：
	•	Q: 双端 diff 和简单 diff 有什么区别？
A: 双端 diff 能处理前后插入/删除，减少移动；简单 diff 只按顺序比对。

⸻

3️⃣ key 的作用
	•	概念：唯一标识一个节点，保证 identity。
	•	为什么重要：
	•	Vue 用 key 来判断节点是否可复用
	•	避免重复渲染或错误复用
	•	面试追问：
	•	Q: 没有 key 会怎么样？
A: Vue 会按索引复用，可能导致 DOM 不必要重建或状态错乱。

⸻

4️⃣ Vue vs React Diff

特性
Vue
React
响应式
Proxy 响应式，依赖追踪，精准更新
不可变状态 + setState，更新全量 diff
静态优化
编译时静态提升 + PatchFlag
不存在编译时优化，靠 PureComponent / memo
Diff 方式
双端 + PatchFlag
简单 key + 深度遍历
优化目标
减少 DOM 操作、精准更新
保证正确性、易用性


⸻

5️⃣ 渲染流程（简化图）

模板 Template
     │
     ▼
渲染函数 Render()
     │
     ▼
旧 VNode ←→ 新 VNode
     │
     ▼
Diff 算法
     │
     ├─ 双端指针比较头尾
     ├─ key 对比
     └─ 生成最小 DOM 操作
     │
     ▼
Patch 更新真实 DOM

