🟠 Day 16：watch / computed 性能优化（副作用管理）

目标：
	•	分清 派生状态 vs 副作用
	•	写 精准、不泄漏、不重复执行 的 watch
	•	在高频场景下避免性能事故

⸻

一、先给你 3 句“结论级认知”（直接背）

1️⃣ 能用 computed 的，永远不要用 watch
2️⃣ watch 是副作用工具，不是状态同步工具
3️⃣ watch 写错，性能和内存一起炸

⸻

二、computed vs watch 的本质区别（核心）

computed 是什么？

纯函数 + 缓存的派生状态

const fullName = computed(() => first.value + last.value)

特点：
	•	无副作用
	•	依赖不变不重新计算
	•	用在 render 中 几乎零成本

⸻

watch 是什么？

响应式变化 → 执行副作用

watch(id, async () => {
  await fetchData()
})

特点：
	•	有副作用
	•	每次触发都会执行
	•	用不好就是性能杀手

⸻

三、精准 watch（Day 16 核心能力）

❌ 低级写法：watch 整个对象

watch(form, () => {
  validate()
}, { deep: true })

问题：
	•	任意字段变化都触发
	•	deep 成本高
	•	难维护

⸻

✅ 高级写法：watch 精确依赖
watch(
  () => form.email,
  email => validateEmail(email)
)
📌 规则：

watch 谁，就返回谁

⸻

watch 多依赖的正确姿势

watch(
  () => [page.value, pageSize.value],
  ([p, size]) => fetchList(p, size)
)


⸻

四、watchEffect：什么时候用？

定义

自动收集依赖的 watch

watchEffect(() => {
  fetchData(userId.value)
})
适合场景：
	•	依赖很多
	•	不关心“新旧值”
	•	初始化即执行

❌ 不适合：
	•	需要对比 old/new
	•	精准控制触发时机

⸻

五、取消副作用（高频面试点）

❌ 常见事故：请求覆盖

watch(id, async () => {
  data.value = await fetch(id)
})


快速切换 id → 后发请求先返回 ❌

⸻

✅ 正确：清理副作用

watch(id, async (id, _, onCleanup) => {
  const controller = new AbortController()

  onCleanup(() => controller.abort())

  data.value = await fetch(url, {
    signal: controller.signal
  })
})


📌 onCleanup 是 watch 的灵魂

⸻

六、防抖 / 节流（和 watch 的结合）

搜索场景（防抖）

const run = debounce((q) => fetchList(q), 300)

watch(keyword, q => run(q))

滚动 / resize（节流）

const onScroll = throttle(() => {
  loadMore()
}, 200)

📌 不要把 debounce/throttle 写在 watch 里反复创建

⸻

七、watch 的 5 个性能坑（必背）
	1.	deep watch 大对象
	2.	watch 用来同步 props
	3.	watchEffect 里写复杂逻辑
	4.	不清理副作用
	5.	watch 里修改同一依赖（死循环）


⸻

九、Day 16 面试追杀题（标准答案）

Q：为什么 computed 比 watch 性能好？

computed 有缓存机制，依赖不变不会重新执行，而 watch 每次变化都会执行回调。

⸻

Q：watchEffect 和 watch 的区别？

watchEffect 自动收集依赖、立即执行，watch 需要显式指定依赖并可获取新旧值。

⸻

Q：如何避免 watch 中的请求竞态？

使用 onCleanup 或 AbortController 在依赖变化时取消上一次副作用。

⸻

