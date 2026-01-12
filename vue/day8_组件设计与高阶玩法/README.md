

⸻

🟢 Day 8：组件设计原则

一、核心目标

写组件不是写功能，是写可维护、可复用、可组合的逻辑单元。


一、组件设计原则（必背）
	1.	单一职责
	•	一个组件只做一件事
	•	方便复用、测试、维护
	2.	Props 最小化 + 单向流
	•	父组件 → 子组件
	•	子组件只通过 emit 通知父组件状态变化
	3.	Slots 高度可定制
	•	提供默认内容 + 自定义内容
	•	支持作用域插槽暴露内部状态
	4.	组合优于继承
	•	Hooks + 插槽 + Provide/Inject 替代 mixin /继承
	5.	透明副作用管理
	•	组件内部副作用要可控
	•	生命周期钩子 + onUnmounted 清理

⸻

二、Props / Emit 高阶技巧

1️⃣ Props 验证 + 默认值

props: {
  count: {
    type: Number,
    default: 0,
    required: true
  },
  label: String
}

✅ 面试加分点：
	•	类型校验
	•	默认值
	•	required + validator

⸻

2️⃣ Emit 高阶

const emit = defineEmits(['update:count', 'submit'])

emit('update:count', 10)  // v-model 同步
emit('submit', payload)
	•	v-model 对应 emit
	•	可以同时支持 多个 v-model

// 多 v-model
defineProps({ value: String, visible: Boolean })
defineEmits(['update:value', 'update:visible'])


⸻

3️⃣ 父子通信模式

场景
方案
父传子
props
子通知父
emit
跨级传递
Provide / Inject
插槽暴露方法
作用域插槽


⸻

三、Slots 高阶玩法

1️⃣ 默认插槽

<MyCard>
  <p>默认内容</p>
</MyCard>

2️⃣ 命名插槽

<MyCard>
  <template #header>
    <h3>标题</h3>
  </template>
</MyCard>

3️⃣ 作用域插槽

<MyCard v-slot="{ count, increment }">
  <button @click="increment">{{ count }}</button>
</MyCard>
	•	⚡ 父组件可以访问子组件内部状态
	•	⚡ 高阶面试题必考点：v-slot 与解构

⸻

四、组合模式实践

1️⃣ Compound Components（复合组件）
<MyTab>
  <MyTabList>
    <MyTabItem>Tab1</MyTabItem>
    <MyTabItem>Tab2</MyTabItem>
  </MyTabList>
  <MyTabPanels>
    <MyTabPanel>内容1</MyTabPanel>
    <MyTabPanel>内容2</MyTabPanel>
  </MyTabPanels>
</MyTab>

	•	Provide/Inject + Slots
	•	父组件维护状态，子组件渲染视图
	•	⚡ 面试高频考点：组件组合模式设计

⸻

2️⃣ 自定义 Hooks + 组件组合

function useTabs() {
  const activeIndex = ref(0)
  const setActive = i => activeIndex.value = i
  return { activeIndex, setActive }
}

setup() {
  const { activeIndex, setActive } = useTabs()
  provide('tabs', { activeIndex, setActive })
}

	•	子组件 inject 状态
	•	Hooks + Provide/Inject 实现状态复用
	•	⚡ 面试问：为什么不用 prop 链传？

⸻

五、Day 8 面试标准答案
	1.	组件通信模式有哪些？

Props（父传子）、Emit（子通知父）、Provide/Inject（跨级）、Slots（插槽传递结构或方法）

	2.	v-slot / 作用域插槽原理？

父组件通过 slot props 获取子组件内部状态，解构使用，可控制渲染逻辑

	3.	多 v-model 实现方式？

子组件 defineEmits([‘update:propName’]) + defineProps({ propName })

	4.	组合模式优势？

提高复用、解耦父子逻辑、可控副作用、避免复杂继承或 mixin


四、Day 8 面试高分总结模板
	1.	组件设计原则？

单一职责、Props 单向流、Slots 可定制、组合优于继承、副作用透明可控

	2.	父子通信模式？

Props → Emit，跨级 → Provide/Inject，插槽 → 作用域插槽

	3.	v-slot 作用域插槽面试问法？

父组件通过解构拿到子组件内部状态，实现渲染控制，逻辑解耦

	4.	多 v-model 实现？

子组件 defineEmits([‘update:propName’]) + defineProps({ propName })，父组件 v-model 同步

	5.	副作用如何安全管理？

Hooks / watchEffect / timer / eventListener 必须在 onUnmounted 或 cleanup 时清理