
⸻

🟡 Day 13：状态管理 & 跨组件通信设计（Pinia 思维）

目标：
知道 什么状态必须进 Store，什么坚决不进
能设计一个 “不会失控、不污染组件”的状态架构

⸻

一、先给你一句“架构级结论”（背下来）

Store 不是用来“省 props 的”，
而是用来管理“跨生命周期的共享状态”。

⸻

二、Day 13 要解决的 4 个问题
	1.	❓ 什么状态「必须」放 Store？
	2.	❓ 什么状态「绝对不该」放 Store？
	3.	❓ Pinia 的正确使用姿势？
	4.	❓ 跨组件通信的 5 种方式怎么选？

⸻

三、什么状态该进 Store？（红线）

✅ 必须进 Store 的 5 类状态

1️⃣ 跨页面共享
	•	用户信息
	•	登录态
	•	权限

2️⃣ 生命周期长于组件
	•	WebSocket 连接状态
	•	全局 loading
	•	全局通知队列

3️⃣ 多组件强一致
	•	购物车
	•	选中项集合
	•	播放器状态

4️⃣ 可被多个业务复用
	•	字典
	•	配置
	•	Feature Flag

5️⃣ 可被调试 / 回放
	•	表单草稿
	•	操作历史

⸻

四、什么状态不该进 Store？（必踩坑）

❌ 以下状态进 Store = 架构污染
	•	单个组件的 open / hover
	•	UI 临时状态
	•	纯展示状态
	•	只在父子组件间流动

📌 口诀：

UI 状态留组件，
业务状态进 Store

⸻

五、Pinia 的正确分层设计（重点）

❌ 新手写法（巨大 Store）

useAppStore() // 用户 + tab + modal + loading

👉 难维护、难拆、难测

⸻

✅ 正确：领域型 Store

stores/
 ├─ user.store.ts
 ├─ cart.store.ts
 ├─ socket.store.ts
 ├─ ui.store.ts（谨慎）


 📌 一个 Store = 一个业务域

⸻

六、Pinia 设计三件套（必会）

1️⃣ state：事实源（single source of truth）
state: () => ({
  user: null,
  token: ''
})

⸻

2️⃣ getters：派生状态（不存）

getters: {
  isLogin: state => !!state.token
}

❌ 不要在 getters 里写副作用

⸻

3️⃣ actions：唯一能改状态的地方

actions: {
  async login() {
    const res = await api.login()
    this.user = res.user
  }
}

📌 组件不直接改 state

⸻

七、跨组件通信 5 种方式（选型表）

场景
推荐
父 → 子
props
子 → 父
emit
兄弟
状态提升
跨层级
provide / inject
跨页面
Store

👉 不要跳级用 Store


⸻

九、面试官 Day 13 追杀题（背）

Q：为什么不把所有状态放 Pinia？

会导致状态膨胀、组件失去自治性，增加维护和调试成本。

⸻

Q：Pinia 和 Vuex 本质区别？

Pinia 去除了 mutation 概念，使用组合式 API，类型推导更友好。

⸻

Q：getter 能不能改 state？

不应该，getter 只用于派生状态，修改应放在 action。

⸻


