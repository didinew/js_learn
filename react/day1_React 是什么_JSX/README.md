🟢 Day 1：React 是什么 + JSX

🎯 今日目标（达成才算过）
	•	知道 React 是做什么的
	•	理解 JSX 不是魔法
	•	能独立写一个 最小 React 组件

⸻

一、React 到底是什么？（面试版）

👉 一句话

React 是一个用于构建用户界面的 JavaScript 库，本质是 状态 → UI 的映射函数。

👉 再狠一点

UI = f(state)

	•	state 变了
	•	React 重新执行组件函数
	•	生成新的 UI 描述
	•	最小化更新 DOM

❗React 不管：
	•	路由（react-router）
	•	状态管理（redux）
	•	请求（axios）

⸻

二、JSX 到底是什么？

1️⃣ JSX ≠ HTML

const el = <h1>Hello</h1>

本质是：

const el = React.createElement('h1', null, 'Hello')

👉 JSX 只是 语法糖

⸻

2️⃣ JSX 里的 {} 是什么？

{} 里面 只能写 JS 表达式

✅ 可以：

{count + 1}
{isLogin && <User />}
{list.map(item => <li>{item}</li>)}

❌ 不可以：

if () {}
for () {}

原因（面试点）

JSX 在编译阶段会变成函数调用，必须是“有返回值的表达式”。

⸻

三、你的第一个 React 组件

✅ 函数组件标准写法

function App() {
  return <h1>Hello React</h1>
}

或（更常用）：

组件 = 普通 JS 函数
返回值 = UI 描述（React Element）


⸻

四、最小可运行 Demo（必须敲）

1️⃣ 创建项目（推荐 Vite）

npm create vite@latest react-demo
cd react-demo
npm install
npm run dev

2️⃣ 修改 App.jsx

const App = () => {
  const name = 'React'
  const age = 18

  return (
    <div>
      <h1>Hello {name}</h1>
      <p>Age: {age}</p>
    </div>
  )
}

export default App


⸻

五、你今天一定要理解的 3 个点（高频面试）

Q1：为什么 JSX 必须有一个根节点？

👉 因为组件只能返回 一个 React Element

⸻

Q2：组件为什么是函数？

👉 因为 React 需要 反复执行它 来得到新的 UI

⸻

Q3：React 怎么更新页面？

👉 不是操作 DOM，而是重新执行函数，diff 之后最小更新

