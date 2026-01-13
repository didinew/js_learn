
⸻

一、一句话先给定位（先声夺人）

computed：算值的缓存
v-memo：渲染的缓存
watch：副作用的触发器

它们解决的是完全不同层级的问题。

⸻

二、性能边界图（面试可画）

           状态变化（reactive / ref）
                     │
         ┌───────────┼───────────┐
         │           │           │
   派生一个值     是否影响视图   是否需要副作用
   （算不算）       （渲不渲）     （干不干）
         │           │           │
     computed      v-memo        watch
   ───────────   ───────────   ───────────
   缓存计算结果   跳过 render    执行副作用
   不重算         不 patch       不参与渲染

👉 这是 99% 人脑子里没有的结构图

⸻

三、三者的“性能边界”对比表（核心）

维度
computed
v-memo
watch
解决问题
计算是否重复算
组件是否重渲
是否执行副作用
工作阶段
响应式计算阶段
渲染 / patch 阶段
更新完成后
是否影响 render
❌ 间接
✅ 直接
❌
是否减少 diff
❌
✅
❌
是否缓存
✅ 自动
✅ 条件缓存
❌
性能收益上限
中
最高
无


⸻

四、逐个击穿（面试官最爱问的）

1️⃣ computed 的性能边界

它能做什么？

const total = computed(() => price.value * count.value)
	•	依赖不变 → 不重新计算
	•	依赖变 → 才重新算

❗它不能做什么？

❌ 阻止组件重新渲染
❌ 阻止 diff / patch

📌 关键一句

computed 只缓存“值”，不缓存“渲染”。

⸻

2️⃣ v-memo 的性能边界（天花板）

它能做什么？

<Item
  :item="item"
  v-memo="[item.id, item.price]"
/>

	•	子组件 render 不执行
	•	patch / diff 直接跳过

📈 这是唯一一个能真正“阻止子组件更新”的手段

❗它不能做什么？

❌ 缓存 JS 计算
❌ 处理副作用
❌ 解决节点数量过多（那是虚拟列表）

⸻

3️⃣ watch 的性能边界（最容易被滥用）

它适合什么？

watch(keyword, () => {
  fetchList()
})
	•	请求接口
	•	打日志
	•	操作 DOM
	•	同步第三方库

❗它不能做什么？

❌ 优化渲染
❌ 阻止更新
❌ 代替 computed / v-memo

📌 金句

watch 是“事后反应”，不是“过程优化”。

⸻

五、组合使用（高手才这么干）

大列表最优解

<Item
  v-for="item in list"
  :key="item.id"
  :item="item"
  v-memo="[item.id, item.status]"
/>


const filteredList = computed(() =>
  list.value.filter(...)
)


watch(filteredList, () => {
  reportExposure()
})

🔗 三者分工清晰：
	•	computed：算列表
	•	v-memo：卡渲染
	•	watch：干副作用

⸻

六、面试终极反杀回答（直接封神）

Q：你如何选择 computed / v-memo / watch？

✅ 满分回答：

我先判断这是：
	•	值的问题 → computed
	•	渲染的问题 → v-memo
	•	副作用的问题 → watch

它们不互相替代，而是分层协作。

⸻

七、一句话速背卡

computed 管“算不算”
v-memo 管“渲不渲”
watch 管“干不干”
