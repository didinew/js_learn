
⸻

一、场景设定（真实业务）

页面结构
	•	顶部：搜索框 / Tab / 筛选条件（高频变化）
	•	下方：1000 条商品列表
	•	列表项内容：
	•	图片
	•	标题
	•	价格
	•	状态标签

👉 问题：
只要搜索条件变化，整个列表都会跟着更新

⸻

二、未使用 v-memo（灾难现场）

父组件

<template>
  <SearchBar v-model="keyword" />
  <Item
    v-for="item in list"
    :key="item.id"
    :item="item"
  />
</template>

子组件 Item.vue

<script setup>
defineProps({
  item: Object
})
</script>

发生了什么？
	•	keyword 改变
	•	父组件 render 重新执行
	•	1000 个 Item 全部进入更新流程
	•	即使 item 本身没变

📉 性能表现

操作
结果
输入一个字
1000 次子组件 render
滚动
明显卡顿
DevTools
update 闪一片


⸻

三、第一步优化：保证 props 稳定（基础）

❌ 错误示例（隐形杀手）

const list = computed(() =>
  rawList.map(item => ({ ...item }))
)
👉 每次都是 新对象

⸻

✅ 正确做法

const list = shallowRef(rawList)

或：

const list = computed(() => rawList)
📌 这是 v-memo 的前置条件

⸻

四、v-memo 上场（核心）

父组件改造

<Item
  v-for="item in list"
  :key="item.id"
  :item="item"
  v-memo="[item.id, item.price, item.status]"
/>
v-memo 在做什么？

当 item.id / price / status 都没变
👉 直接复用上一次 vnode
👉 跳过子组件 render + patch

⸻

五、性能对比（真实效果）

📊 输入搜索关键词
场景
子组件 render 次数
无 v-memo
1000 次
有 v-memo
0 次


⸻

📊 单个商品价格变化

场景
更新范围
无 v-memo
1000 条
有 v-memo
1 条



⸻

📊 页面 FPS（模拟）
状态
FPS
无 v-memo
30–40
有 v-memo
55–60


⸻

六、为什么 v-memo + key 才是王炸？

key：定位组件

v-memo：判断是否需要更新

key 决定 “谁是谁”
memo 决定 “要不要动”

⸻

七、面试官最爱追问（提前帮你答）

Q：为什么不用 watch 阻止更新？

✅ 高分回答：

watch 是事后响应副作用
v-memo 是渲染阶段直接跳过
一个是补救，一个是源头优化。

⸻

Q：v-memo 能代替虚拟列表吗？

❌ 不能

v-memo 减少 更新次数
虚拟列表减少 节点数量
两者解决的问题不同，但可以叠加使用。

⸻

八、使用 v-memo 的黄金法则（必背）

✅ 适合
	•	大列表
	•	列表项渲染重
	•	props 稳定
	•	局部更新

❌ 不适合
	•	props 高频变化
	•	依赖复杂
	•	小组件 / 轻组件

⸻

九、一句话封神总结

v-memo 不是让列表不更新
而是让“不该更新的项，一个都别动”
