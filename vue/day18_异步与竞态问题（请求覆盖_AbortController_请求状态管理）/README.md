🟠 Day 18：异步与竞态问题（请求覆盖 / AbortController / 请求状态管理）

目标：
	•	理解异步请求竞态问题
	•	掌握取消请求的正确方法
	•	将请求状态管理和组件状态结合，避免 UI 不一致

⸻

一、竞态问题（Race Condition）

1️⃣ 什么是竞态

异步请求发出顺序与返回顺序不一致，导致 UI 展示错误数据

watch(id, async (id) => {
  data.value = await fetchData(id)
})

	•	id=1 → 请求 A
	•	id=2 → 请求 B
	•	B 先返回 → UI 显示 A 的数据 ❌

⸻

2️⃣ 常见场景
	•	搜索框防抖 + 异步接口
	•	下拉列表联动异步加载
	•	Tab 切换加载数据
	•	分页请求覆盖

⸻

二、解决方案 1：AbortController（现代方案）

watch(id, async (id, _, onCleanup) => {
  const controller = new AbortController()
  onCleanup(() => controller.abort()) // 上一次请求被取消

  const res = await fetch(`/api/data?id=${id}`, {
    signal: controller.signal
  })
  data.value = res
})

优势
	•	彻底取消上一次请求
	•	避免浪费带宽
	•	UI 数据始终保持最新

⸻

三、解决方案 2：请求序号 / Token（兼容旧 API）

let currentToken = 0

watch(id, async (id) => {
  const token = ++currentToken
  const res = await fetchData(id)
  if (token === currentToken) data.value = res
})

	•	用 token 判断“最新请求”
	•	上一次返回被丢弃
	•	适合 axios / 老接口不支持 AbortController

⸻

四、请求状态管理（Day 18 核心能力）

为什么要管理状态？
	•	loading / error / success
	•	避免重复请求
	•	UI 显示一致

推荐模式

const state = reactive({
  data: null,
  loading: false,
  error: null
})

async function fetchData(id) {
  state.loading = true
  state.error = null
  try {
    const res = await api.getData(id)
    state.data = res
  } catch (e) {
    state.error = e
  } finally {
    state.loading = false
  }
}

📌 注意：loading / error 必须与请求本身绑定，不要全局复用状态

⸻

五、防抖 / 节流结合异步请求

const run = debounce(async (q) => {
  await fetchData(q)
}, 300)

watch(keyword, q => run(q))

✅ 配合 AbortController → 完美解决搜索框异步竞态

七、Day 18 面试追杀题

Q：什么是异步竞态？

异步请求返回顺序与发起顺序不一致，导致 UI 显示错误或覆盖数据。

Q：AbortController 如何解决竞态？

在发起新请求前取消上一次请求，确保 UI 数据与最新请求一致。

Q：为什么要管理请求状态？

避免重复请求、UI 不一致、loading / error 混乱，是可维护工程化必备。

⸻

