
⸻

🟡 Day 11：状态提升 & 组件通信设计（高阶）

目标：
从「会用 props / emit」→「知道状态该放哪、什么时候提升、什么时候下沉」

这是组件设计是否成熟的分水岭。

⸻

一、Day 11 要解决的 3 个核心问题

你今天要彻底想清楚这 3 件事：
	1.	❓ 状态到底该放父组件，还是子组件？
	2.	❓ 什么时候必须“状态提升”？
	3.	❓ emit / v-model / provide 的设计边界是什么？

⸻

二、状态的三种归属（这是总纲）

① 局部状态（Local State）

👉 只影响自己

const isOpen = ref(false)

✔️ 特点：
	•	不对外暴露
	•	父组件不关心
	•	UI 细节状态

✅ 示例：
	•	下拉是否展开
	•	hover / focus
	•	loading

⸻

② 共享状态（Lifted State）

👉 多个组件需要一致

<Parent>
  <ChildA />
  <ChildB />
</Parent>

📌 规则：

谁用，谁管；谁同步，谁提升

// Parent
const activeTab = ref('a')

<Child :active="activeTab" @change="activeTab = $event" />
✔️ 这是 Day 11 的重点

⸻

③ 全局状态（Global State）

👉 跨页面 / 跨模块
	•	Pinia / Vuex
	•	WebSocket 状态
	•	用户信息

❌ Day 11 不深挖（Day 13 专讲）



⸻

三、什么时候“必须”状态提升？

🔥 判断公式（面试必杀）

一个状态被 ≥2 个组件依赖，就必须提升

⸻

❌ 错误示例：状态放子组件

<TabA />
<TabB />

// TabA
const active = ref(true)

// TabB
const active = ref(false)

👉 你永远同步不了

⸻

✅ 正确：提升到最近公共父组件
// Parent
const activeTab = ref('A')

<TabA :active="activeTab === 'A'" />
<TabB :active="activeTab === 'B'" />

⸻

四、emit 设计的「工业级规范」

❌ 初级写法（能用但不优雅）

emit('change', value)
父组件要猜：
<Comp @change="v => xxx = v" />


⸻

✅ 高阶写法（语义清晰）
emit('update:activeTab', tab)

<Comp v-model:activeTab="activeTab" />

📌 规则：

状态 = v-model
行为 = emit 事件

⸻

五、v-model 的本质（Day 11 必懂）

v-model 只是语法糖

<Comp v-model="value" />

等价于：

<Comp
  :modelValue="value"
  @update:modelValue="value = $event"
/>

⸻

多 v-model（高阶组件必用）

<Comp
  v-model:page="page"
  v-model:pageSize="pageSize"
/>

emit('update:page', page)
emit('update:pageSize', size)

👉 复杂组件必备能力

⸻

六、provide / inject 是什么时候用的？

❌ 不要用它代替 props

// ❌ 滥用
provide('value', value)


⸻

✅ 正确用途：跨层级但非业务状态

✔️ 典型场景：
	•	表单系统（Form → FormItem）
	•	UI 库（主题、size）
	•	TabContainer → TabItem

provide('activeTab', activeTab)

八、面试官 Day 11 追问模板（背下来）

Q：什么时候该用状态提升？

当一个状态需要被多个组件共享或保持一致时，应提升到最近的公共父组件。

⸻

Q：v-model 和 emit 的设计原则？

状态同步使用 v-model，行为通知使用普通事件，避免语义混乱。

⸻

Q：provide 和 props 的边界？

provide 用于结构性依赖而非业务数据，不应替代 props。

