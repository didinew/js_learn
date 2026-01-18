✅ React 30 天学习计划（按天）

⸻

🟢 第 1 阶段：基础入门（Day 1–7）

目标：能独立写 React 页面，不怕 JSX 和 Hooks

⸻

Day 1：React 是什么 + JSX

学什么
	•	React 是 UI 库，不是框架
	•	JSX 本质：React.createElement
	•	JSX 表达式 {}

const App = () => {
  const name = 'React'
  return <h1>Hello {name}</h1>
}

当天产出
	•	一个能跑的 React 项目（Vite / CRA）

⸻

Day 2：函数组件 & 组件拆分

学什么
	•	函数组件
	•	组件拆分原则（单一职责）
	•	组件组合

必敲
	•	父组件 + 子组件
	•	props 传值

当天产出
	•	个人信息卡片（Avatar / Name / Desc 三个组件）

⸻

Day 3：Props & 单向数据流

学什么
	•	props 只读
	•	父 → 子 数据流
	•	为什么不能改 props（面试高频）

必敲

function Item({ title }) {
  return <li>{title}</li>
}

当天产出
	•	商品列表组件（map + key）

⸻

Day 4：State & useState

学什么
	•	state 是什么
	•	setState 触发更新
	•	为什么是异步的（概念）

必敲
	•	计数器
	•	点击 +1 / -1

当天产出
	•	Counter 组件

⸻

Day 5：事件处理 & 受控组件

学什么
	•	onClick / onChange
	•	受控组件概念

必敲
	•	input 输入同步 state

当天产出
	•	输入框实时显示内容

⸻

Day 6：条件渲染 & 列表渲染

学什么
	•	&& / 三元
	•	key 的作用（面试题）

必敲
	•	显示 / 隐藏组件
	•	列表渲染

当天产出
	•	简单 Todo List（展示 + 删除）

⸻

Day 7：useEffect 副作用

学什么
	•	副作用是什么
	•	依赖数组
	•	清理函数

必敲

useEffect(() => {
  console.log('mounted')
  return () => console.log('unmount')
}, [])

当天产出
	•	请求接口并渲染列表

⸻

🟡 第 2 阶段：进阶开发（Day 8–16）

目标：写完整业务页面

⸻

Day 8：Todo List 完整版

功能
	•	新增 / 删除 / 勾选完成
	•	状态拆分

重点
	•	状态设计能力

⸻

Day 9：组件设计 & Dumb / Smart

学什么
	•	展示组件 vs 容器组件
	•	可复用性

产出
	•	TodoItem 拆成 Dumb 组件

⸻

Day 10：React Router

学什么
	•	SPA 路由
	•	useParams / useNavigate

产出
	•	博客：列表页 → 详情页

⸻

Day 11：Context API

学什么
	•	跨层级状态共享
	•	Provider / useContext

产出
	•	登录状态全局共享

⸻

Day 12：Redux / Redux Toolkit

学什么
	•	为什么需要 Redux
	•	slice / dispatch / selector

产出
	•	购物车状态管理

⸻

Day 13：异步请求 & 状态管理

学什么
	•	loading / error / data
	•	useEffect 请求接口

产出
	•	用户列表页

⸻

Day 14：useRef

学什么
	•	操作 DOM
	•	保存不触发渲染的值

产出
	•	自动聚焦 input

⸻

Day 15：useMemo & useCallback

学什么
	•	为什么会重复渲染
	•	依赖设计

产出
	•	优化 Todo List

⸻

Day 16：阶段总结实战

产出
	•	小博客项目（路由 + 请求 + 全局状态）

⸻

🔵 第 3 阶段：高级 & 面试（Day 17–24）

目标：不怕面试追问

⸻

Day 17：React 渲染机制
	•	函数组件为什么会重新执行
	•	state 更新流程

⸻

Day 18：React.memo
	•	父更新子不更新
	•	对比 useMemo

⸻

Day 19：虚拟列表
	•	react-window
	•	大列表性能

⸻

Day 20：自定义 Hooks
	•	抽离逻辑
	•	useXXX 规范

⸻

Day 21：Suspense & lazy
	•	懒加载
	•	首屏优化

⸻

Day 22：Concurrent & useTransition
	•	低优先级更新
	•	卡顿问题解决

⸻

Day 23：错误边界
	•	ErrorBoundary
	•	线上兜底

⸻

Day 24：React 面试题实战
	•	props vs state
	•	key 为什么不能用 index
	•	useEffect 执行时机

⸻

🔴 第 4 阶段：项目 & 面试输出（Day 25–30）

目标：项目能写进简历

⸻

Day 25–27：完整项目

👉 仿知乎 / 微博首页
	•	无限列表
	•	点赞 / 评论
	•	虚拟列表

⸻

Day 28：性能优化专项
	•	memo
	•	callback
	•	列表优化

⸻

Day 29：项目复盘
	•	为什么这么设计
	•	技术选型理由

⸻

Day 30：React 面试模拟
	•	原理追问
	•	项目深挖
	•	性能题