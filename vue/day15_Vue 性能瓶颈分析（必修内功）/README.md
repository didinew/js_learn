🟠 Day 15：Vue 性能瓶颈分析（必修内功）

目标：
一眼判断页面为什么慢，
知道 “是谁在重渲染、为什么重渲染、该怎么砍掉”

⸻

一、先给你 3 句“性能铁律”（直接背）

1️⃣ Vue 性能问题 ≠ Vue 慢，而是你让它多干活了
2️⃣ 性能优化的核心是：减少不必要的渲染
3️⃣ 90% 的性能问题，来自响应式滥用

⸻

二、Vue 页面为什么会“慢”？（总图）

Vue 渲染触发链路

state 变化
  ↓
依赖的 effect 重新执行
  ↓
render 函数重新执行
  ↓
Virtual DOM diff
  ↓
真实 DOM patch

👉 优化目标：
在这 5 步里 尽早“止损”

⸻

三、重渲染的 4 大来源（Day 15 核心）

① 响应式数据变化（最常见）

state.count++

只要被 render 用到 → 一定重跑 render

📌 关键不是“变没变”，而是“谁依赖了它”

⸻

② 父组件更新 → 子组件默认全更新

<Parent>
  <Child />
</Parent>
父组件 render 一次：
	•	Child render 也会跑
	•	即使 props 没变

👉 这是 Vue 的默认策略

⸻

③ 列表 key 不稳定
<li v-for="(item, index) in list" :key="index">
❌ 会导致：
	•	节点复用错误
	•	diff 成本暴涨
	•	DOM 频繁重建

⸻

④ 不必要的响应式“污染”

const state = reactive({
  bigList: [],
  temp: {}
})

哪怕只用 temp
👉 bigList 也在依赖系统里

⸻

四、响应式颗粒度（Day 15 精髓）

❌ 粗颗粒度（性能杀手）

const state = reactive({
  user: {
    name: '',
    age: 0,
    address: {}
  }
})

任何一处变动 → 整个 user 依赖更新

⸻

✅ 细颗粒度（推荐）

const name = ref('')
const age = ref(0)

或：

const user = shallowReactive({
  name: '',
  age: 0
})

📌 结论：

对象越大，越不要 deep reactive

⸻

五、shallowReactive / shallowRef 的性能价值

什么场景该用？
	•	大对象
	•	外部不可控数据（接口返回）
	•	只关心引用变化，不关心内部变化

const list = shallowRef([])
list.value = newList // 触发更新
👉 内部 push 不触发 render

⸻

六、v-if vs v-show（性能不是一句话）

v-if
	•	销毁 / 重建组件
	•	首次渲染慢
	•	切换成本高

适合：
	•	条件很少变化
	•	初始不展示

⸻

v-show
	•	只是 display: none
	•	初始渲染有成本
	•	切换极快

适合：
	•	高频切换
	•	Tab / 弹窗

⸻

🔥 性能判断口诀（面试必杀）

少切换 → v-if
多切换 → v-show

八、Day 15 面试追杀题（标准答案）

Q：Vue 性能优化的核心是什么？

减少不必要的渲染，尤其是避免无关状态变化触发组件更新。

⸻

Q：父组件更新，子组件一定更新吗？

默认会，但可以通过合理拆分组件、memo 化、或避免无关 state 变化来减少影响。

⸻

Q：什么时候该用 shallowReactive？

当只关心对象引用变化、不关心内部字段变化时，用 shallowReactive 可以减少依赖收集成本。
