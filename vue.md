👉 Vue 3 的响应式系统和 Vue 2 的核心区别是什么？
Vue 2 和 Vue 3 响应式的本质差别在于：拦截方式不同，能力边界也不同。

Vue 2 是基于 Object.defineProperty，只能劫持已有属性，所以：
	•	新增属性需要 Vue.set
	•	数组通过重写方法实现，逻辑比较绕

Vue 3 改成了 Proxy，它是对整个对象做代理：
	•	可以直接监听属性的新增、删除
	•	数组、Map、Set 都可以天然支持

从开发体验上看，Vue 3 的响应式更完整、更直观，基本不用再考虑“这个值是不是响应式的”，心智负担更小。

另外在实现上，Vue 3 把响应式系统拆成了更细的模块，track / trigger 机制更清晰，对性能和维护性都有提升。

⸻


既然 Proxy 这么好，为什么 Vue 2 当时不用？
一方面确实是 浏览器支持问题。
Vue 2 设计时期（2015 年左右），Proxy 兼容性非常差，
如果强行使用，会直接放弃 IE 和一大批旧环境，这是当时不可接受的。

但更重要的是设计成熟度问题。

Vue 2 当时的响应式目标主要是：
	•	普通对象
	•	简单数组

Object.defineProperty 已经足够满足需求，而且实现相对可控、稳定。

到 Vue 3 时，应用复杂度明显上升：
	•	需要支持 Map / Set
	•	需要更精细的依赖收集
	•	需要更好的性能和可维护性

这时候 Proxy 的优势才真正被放大，
所以 Vue 3 是在 时机成熟 + 需求升级 的前提下，才全面切换 Proxy。

👉 Vue 3 的 Proxy 响应式有没有“代价”或“坑”？
第一个比较常见的坑是解构会丢失响应性。
比如直接从 reactive 对象中解构属性，解构出来的是普通值，不再是响应式的。
实际项目中一般通过 toRefs 或 storeToRefs 来解决。

第二是 ref 和 reactive 的使用边界。
简单类型我会用 ref，复杂对象用 reactive，
否则在模板和逻辑层容易混用 .value，可读性会变差。

第三是 Proxy 无法被 polyfill。
这意味着 Vue 3 天然放弃了 IE，这在早期项目升级时需要提前评估。

另外在性能和行为控制上，也需要注意一些“逃逸点”。
比如对于不需要响应式的大对象（第三方库实例、配置常量），
会使用 markRaw 或 shallowReactive 来避免不必要的代理开销。

总体来说，Vue 3 的响应式能力更强，但也要求开发者对响应式边界更清楚，
否则容易出现“看起来没问题，但视图不更新”的问题。
😈 面试官追问 3（拉开差距题｜⭐⭐⭐⭐⭐）

那我给你一个真实场景：

在 Vue 3 + Pinia 项目中，
我从 store 里解构了 state，用在组件里，结果视图不更新。

👉 你如何定位问题？
👉 最终你会怎么改？
👉 为什么这样改？

我会先检查是否直接对 Pinia 的 state 做了解构。
因为在 Vue 3 中，从响应式对象里直接解构出来的值，会变成普通局部变量，从而丢失响应性。

Pinia 的 store 本身是响应式的，但如果写成：
const { count } = store
那 count 实际上只是当时的一个值快照，视图自然不会更新。

正确的做法是使用 toRefs 或 Pinia 提供的 storeToRefs：
const { count } = storeToRefs(store)
这样解构出来的每个属性依然是 ref，能保持和 store 的响应式连接。

最终我会统一在项目中约定：
	•	解构 state 一律用 storeToRefs
	•	actions / getters 直接从 store 上取，避免不必要的响应式包裹

这样既能保证视图更新正常，也能让代码风格保持一致。

那为什么 actions / getters 不需要用 storeToRefs？
⭐ 标准补刀回答（你可以一句带走）

因为 actions 是函数，不存在响应性问题；
getters 本身是基于响应式依赖的计算属性，直接从 store 上访问就已经是响应式的，不需要再包一层 ref。

⸻

🎯 题目 2（Vue 3 响应 & 性能｜⭐⭐⭐⭐）

❓ 问题

watch 和 watchEffect 有什么区别？
在什么场景下你会选 watchEffect，而不是 watch？
watch 和 watchEffect 的核心区别在于 依赖声明方式和执行时机。

watch 是 显式声明依赖，只有被监听的值变化时才会触发，
更适合精确控制副作用的场景，比如监听某个 prop 或 store 字段。

watchEffect 是 自动收集依赖，在首次执行时会立即运行，
它更适合依赖关系不固定、或者只是做简单副作用的场景。

在实际项目中：
	•	如果我明确知道监听的是谁，并且关心 newValue / oldValue，我一定用 watch
	•	如果只是根据当前响应式状态，自动触发一些副作用（比如日志、请求、同步状态），我会用 watchEffect

另外 watchEffect 的依赖是“隐式的”，
在逻辑复杂时可读性和可维护性会下降，所以我会谨慎使用。

😈 追问 1（必杀题｜⭐⭐⭐⭐⭐）

那你有没有遇到过：
👉 watchEffect 里“莫名其妙被多次触发”的问题？
原因是什么？你是怎么解决的？

有遇到过 watchEffect 被意外多次触发的情况，
核心原因一般是 依赖是隐式收集的，很容易在不经意间把不该监听的响应式数据也收集进来。

比如：
	•	在 watchEffect 里访问了多个响应式 state
	•	或者间接访问了 DOM、computed、store 中的其他字段

这些都会被当成依赖，一旦任意一个变化，watchEffect 就会重新执行。

在异步场景下问题会更明显，比如：
	•	在 watchEffect 里直接发请求
	•	上一次请求还没结束，依赖又变化，导致重复请求

解决方式我一般有三种：

1️⃣ 明确依赖，改用 watch
当副作用逻辑变复杂、依赖明确时，我会直接换成 watch，避免隐式依赖。

2️⃣ 合理使用清理函数
在 watchEffect 中返回一个 cleanup，用来取消请求或移除监听：

watchEffect((onCleanup) => {
  const controller = new AbortController()
  fetchData({ signal: controller.signal })
  onCleanup(() => controller.abort())
})

3️⃣ 避免在 watchEffect 中访问无关响应式数据
比如不要在里面读取整个 store，而是只取必要字段。

总体来说，watchEffect 适合轻量、副作用简单的场景，
一旦逻辑复杂，我会主动退回 watch，保证可控性。
😈 面试官最终追问（封神题｜⭐⭐⭐⭐⭐）

最后一问：

如果你在一个大型 Vue 3 项目中，
发现很多 watchEffect 难以维护、触发混乱，
你会从代码规范和架构层面如何解决？

在大型 Vue 3 项目中，如果 watchEffect 使用失控，我一般会从 规范、抽象、架构 三个层面去解决。

第一，明确使用规范，限制 watchEffect 的使用场景。
在团队层面我会约定：
	•	watchEffect 只用于轻量、依赖不明确、一次性副作用
	•	涉及请求、状态联动、复杂逻辑的，统一使用 watch

这样可以从源头上避免隐式依赖失控的问题。

第二，把副作用逻辑抽离成 composable。
不直接在组件里写 watch / watchEffect，
而是封装成 useXXX，在 composable 内部集中管理依赖和清理逻辑。

这样可以：
	•	统一依赖来源
	•	更好复用
	•	减少组件复杂度

第三，强制依赖显式化。
在 composable 内部优先使用：
watch(
  () => [state.a, state.b],
  () => { /* side effect */ }
)

而不是让依赖“自动漂移”。

第四，引入代码审查和 ESLint 规则。
比如在 code review 中重点关注：
	•	watchEffect 内是否访问了多个 store / computed
	•	是否缺少 cleanup

必要时通过自定义 lint 规则限制 watchEffect 的滥用。

最后，从架构上减少“被监听的数据”。
	•	合理拆分 store，避免巨型 state
	•	控制响应式粒度，避免整个对象都变成依赖

目标不是禁止 watchEffect，而是让副作用 可预测、可维护、可收敛。

🎯 题目 3（TypeScript × Vue3 实战｜⭐⭐⭐⭐⭐）

❓ 问题

在 Vue 3 + TypeScript 项目中：
👉 如果让你设计一个「高度可复用的业务组件」，
你会如何用 TypeScript 约束它的 Props 和 Emits，
既保证类型安全，又不牺牲灵活性？


在设计一个 高复用的 Vue 3 业务组件时，我会把重点放在
“对外 API 稳定、对内实现灵活” 上，TypeScript 主要解决的是约束边界，而不是限制能力。

第一步：明确组件的“变化点”和“不变点”。
	•	不变点：组件行为、生命周期、交互模式
	•	变化点：数据结构、展示字段、业务事件

这些变化点会通过 泛型 Props 暴露出去。

⸻

🔹 Props 设计（泛型 + 约束）

比如一个通用列表 / 表格组件：

interface BaseItem {
  id: string | number
}

const props = defineProps<{
  data: BaseItem[]
  columns: ColumnConfig<BaseItem>
}>()
实际项目中我会用 泛型参数，而不是写死结构：

interface ColumnConfig<T> {
  key: keyof T
  title: string
  render?: (row: T) => VNode
}

const props = defineProps<{
  data: T[]
  columns: ColumnConfig<T>[]
}>()

这样组件既能保证 key 一定来自数据结构，又不会限制具体业务字段。

🔹 Emits 设计（事件强类型）

Emits 我会避免使用字符串数组，而是用函数签名约束：
const emit = defineEmits<{
  (e: 'row-click', row: T): void
  (e: 'update:selected', value: T[]): void
}>()
这样在父组件里：
	•	事件名拼错会直接报错
	•	参数类型能完整推导出来

⸻

🔹 扩展点设计（不牺牲灵活性）

对于复杂业务，我会提供：
	•	slots（用于 UI 自定义）
	•	hooks（用于逻辑扩展）
	•	可选 Props（用于行为控制）

同时用 TS 明确标注 哪些是可扩展点，哪些是核心能力。

⸻

🔹 实战原则总结

	•	Props：少而精，用泛型表达变化
	•	Emits：强类型，约束事件契约
	•	内部实现：尽量解耦具体业务字段
	•	TS 的作用不是写得复杂，而是 让错误前置到编译期


⸻

😈 面试官追问（终极加分题｜⭐⭐⭐⭐⭐）

如果这个组件要支持：
👉 不同业务注入不同「数据结构 + 行为规则」，
你会如何用 TypeScript 再“收紧”一层约束，避免错误配置？

当一个高复用组件需要支持 不同业务注入不同数据结构和行为规则 时，
我会用 TypeScript 的 泛型约束 + 条件类型 + 可辨识联合类型（Discriminated Union）
来把「配置合法性」前置到编译期。

核心目标是：
👉 让“错误配置写不出来”，而不是运行时报错。

🔹 一、用「可辨识联合类型」区分业务模式

先用一个 mode 作为判别字段：
type ListMode =
  | {
      mode: 'readonly'
      selectable?: false
      onSelect?: never
    }
  | {
      mode: 'select'
      selectable: true
      onSelect: (rows: T[]) => void
    }

    这样一来：
	•	readonly 模式下 不能传 onSelect
	•	select 模式下 必须传 onSelect

配置不合法 = 直接 TS 报错。


⸻

🔹 二、用泛型约束数据结构能力
interface BaseRow {
  id: string | number
}

type Props<T extends BaseRow> = {
  data: T[]
  columns: ColumnConfig<T>[]
} & ListMode

强制业务数据 至少具备基础能力（如 id），
但不限制额外字段。

⸻

🔹 三、条件类型收紧行为规则

对更复杂规则，可以用条件类型：
type SelectableProps<T> = T extends { selectable: true }
  ? { onSelect: (rows: T[]) => void }
  : { onSelect?: never }

  让 TS 根据配置自动推导 必填 / 禁用字段。

  🔹 四、对外暴露「安全扩展点」

对外我会明确划分：
	•	强约束配置（必须正确）
	•	弱约束扩展（slot / render）

避免让 TS 类型失控，又能保证业务自由度。

⸻

🔹 五、设计原则总结（面试必杀）

	•	用类型系统表达业务规则
	•	用 mode 做“业务分流”
	•	用条件类型 自动收紧 Props
	•	让错误在写代码时就被发现



