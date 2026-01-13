🟡 Day 12：受控 / 非受控组件（Vue × React 思维融合）

目标：
从「组件能用」→「组件不会失控、不会烂尾、不会被骂难维护」

⸻

一、为什么 Day 12 这么重要？

很多 Vue 项目后期都会变成：
	•	状态一半在组件内
	•	一半在父组件
	•	v-model 和内部 ref 打架
	•	bug 修不完

👉 根因：没想清楚组件是“受控”还是“非受控”

⸻

二、先给你一句“面试级结论”

组件要么完全受控，要么完全非受控，
不要两种混着来。

⸻

三、什么是受控组件（Controlled）

定义（背下来）

组件本身不保存核心状态，
所有状态由父组件通过 props 控制。

⸻

✅ Vue 中的受控组件特征
	•	使用 v-model
	•	内部 不定义 对应 ref
	•	只负责 emit

⸻

✅ 正确示例：受控 Input

<script setup lang="ts">
defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <input :value="modelValue" @input="onInput" />
</template>

📌 组件内部没有 value 状态

⸻

❌ 错误示例（半受控，必出 bug）

const innerValue = ref(props.modelValue) // ❌
父组件改了，子组件不一定跟

⸻

四、什么是非受控组件（Uncontrolled）

定义

组件自己管理状态，父组件只触发行为

⸻

✅ Vue 非受控组件示例

<script setup>
const open = ref(false)

function toggle() {
  open.value = !open.value
}
</script>
<Modal />


✔️ 父组件不知道 open

⸻

非受控适合什么？
	•	Modal / Tooltip
	•	Dropdown
	•	UI 细节组件
	•	内部交互复杂但不影响外部

⸻

五、Vue 中“混乱组件”的典型坑（重点）

❌ 反例：同时支持 v-model 又自己管状态

const props = defineProps({ modelValue: Boolean })
const visible = ref(props.modelValue)

watch(() => props.modelValue, v => visible.value = v)



⸻

六、Day 12 高阶：可控 / 不可控双模式组件

工业级 UI 库（AntD / Element）都支持

🔥 判断方式：是否传了 v-model

⸻

标准写法（必会）

const props = defineProps<{ modelValue?: boolean }>()
const emit = defineEmits(['update:modelValue'])

const isControlled = computed(() => props.modelValue !== undefined)

const visible = computed({
  get() {
    return isControlled.value ? props.modelValue! : inner.value
  },
  set(v) {
    if (isControlled.value) {
      emit('update:modelValue', v)
    } else {
      inner.value = v
    }
  }
})

const inner = ref(false)

八、Day 12 面试追杀题（必背）

Q：什么是受控组件？

组件自身不保存核心状态，状态由父组件通过 props 控制，组件只负责触发更新。

⸻

Q：Vue 里如何判断组件是否受控？

是否传入对应的 v-model / modelValue。

⸻

Q：为什么不推荐 watch 同步 props 到 state？

会引入双数据源，导致状态不一致和维护复杂。

