🟠 Day 17：列表与大数据量（key / diff / 虚拟列表）

目标：
	•	理解 v-for 的 key 真正作用
	•	掌握 Diff 成本控制
	•	能手写/使用虚拟列表处理大数据

⸻

一、列表性能的三大瓶颈
	1.	v-for 渲染次数
	•	每次数据变化都会触发 render
	2.	key 不稳定
	•	导致节点频繁销毁/创建
	3.	Diff 成本
	•	对比整个虚拟 DOM 树 → 大列表性能暴跌

⸻

二、key 的真正作用（面试必杀）

1️⃣ key 的作用
	•	唯一标识列表项
	•	告诉 Vue 哪一项是同一个 DOM 节点
	•	避免全量重建

	<li v-for="item in list" :key="item.id">


	2️⃣ 错误示例（低级坑）

	<li v-for="(item, index) in list" :key="index">

		•	删除中间一项 → 后续节点全部重建
	•	DOM patch 频繁 → 性能掉
	•	表单输入值可能被重置

⸻

三、Diff 成本控制（Day 17 核心）

Vue 3 diff 核心逻辑

旧节点列表 → 新节点列表
  ↓
通过 key 匹配
  ↓
更新存在节点、创建新节点、删除不存在节点

优化原则
	1.	稳定 key
	•	id 优先，索引仅在列表静态且不会变时用
	2.	减少列表嵌套层
	•	深层 v-for + 复杂组件 → 高 diff 成本
	3.	分块渲染
	•	keepAlive / v-show / 分页 / 虚拟列表

⸻

四、虚拟列表（Virtual List / Windowing）

核心思想：屏幕只渲染可见部分，滚动时动态替换 DOM

优势
	•	避免一次性渲染上千/上万 DOM
	•	大幅减少 patch / 重排 / 回流

简单实现原理

const startIndex = Math.floor(scrollTop / itemHeight)
const endIndex = startIndex + visibleCount
const visibleList = list.slice(startIndex, endIndex)

<li v-for="item in visibleList" :key="item.id">
	•	外层容器设置总高度
	•	内层容器位移模拟滚动
	•	滚动更新 startIndex / endIndex

📌 高级库：vue-virtual-scroller / vue-virtual-list

⸻

五、列表渲染优化技巧（必背）
	1.	使用 stable key
	2.	组件拆分最小粒度
	3.	v-if / v-show 懒渲染
	4.	KeepAlive 缓存列表组件
	5.	分页 / 分块渲染
	6.	虚拟列表处理超大数据
	