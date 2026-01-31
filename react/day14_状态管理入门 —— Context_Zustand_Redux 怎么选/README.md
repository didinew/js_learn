🟢 Day 14：状态管理入门 —— Context / Zustand / Redux 怎么选

🎯 今日目标
	•	明确 什么状态该放全局
	•	理解 Context 的本质与边界
	•	知道 Zustand / Redux 各自适合什么场景
	•	能在面试中说清 选型理由

⸻

一、先问一个关键问题（🔥 面试官最爱）

❓ 为什么不用 props 一直传？

props drilling 问题

App
 └─ Layout
    └─ Page
       └─ Component

	登录用户信息
	•	主题 / 语言
	•	权限状态

👉 一层一层传 → 代码污染 + 难维护

⸻

二、哪些状态「必须」全局？

✅ 适合全局
	•	登录用户信息
	•	Token / 权限
	•	主题（dark / light）
	•	全局配置
	•	WebSocket 状态

❌ 不适合全局
	•	表单输入
	•	弹窗开关
	•	列表局部选中状态

📌 面试金句：

“状态越靠近使用它的组件越好”

⸻

三、Context：React 自带的全局状态

1️⃣ 基本用法

const UserContext = createContext(null)

const App = () => (
  <UserContext.Provider value={{ name: 'Tom' }}>
    <Layout />
  </UserContext.Provider>
)

2️⃣ 消费状态

const user = useContext(UserContext)


⸻

3️⃣ Context 的问题（🔥 必会）
	•	任意 value 变化 → 所有子组件重渲染
	•	不适合频繁更新的数据

📌 结论：

Context 适合 低频、全局配置类状态


⸻

四、Zustand：轻量级全局状态（🔥 强烈推荐）

1️⃣ 为什么选 Zustand？
	•	API 极简
	•	不需要 Provider
	•	精准更新，不全量刷新


⸻

2️⃣ 创建 Store

import { create } from 'zustand'

const useUserStore = create(set => ({
  user: null,
  login: user => set({ user }),
  logout: () => set({ user: null })
}))


⸻

3️⃣ 使用 Store

const user = useUserStore(state => state.user)
const login = useUserStore(state => state.login)

📌 优势：
	•	用到的 state 变才更新
	•	非侵入式
	•	非常适合中大型项目

⸻

五、Redux：重型但标准（了解即可）

什么时候用 Redux？
	•	超大型项目
	•	严格数据流
	•	中间件（日志 / undo / time-travel）

为什么现在少了？
	•	样板代码多
	•	学习成本高
	•	Zustand / RTK 更高效

📌 面试回答：

Redux 是工程方案，不是必须方案


⸻

六、选型对照表（🔥 背下来）

场景
推荐
少量全局配置
Context
中大型项目
Zustand
超大型复杂项目
Redux / RTK
表单 / UI 状态
本地 state



