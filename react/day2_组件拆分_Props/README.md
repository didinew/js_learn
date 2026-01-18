🟢 Day 2：组件拆分 & Props

🎯 今日目标
	•	理解 为什么要拆组件
	•	掌握 props 传值
	•	能把一个页面拆成多个组件

今天是 React 思维成型的关键一天。

⸻

一、为什么要拆组件？（面试官最爱问）

❌ 不拆组件会怎样？

function App() {
  return (
    <div>
      <img />
      <h1>DiDi</h1>
      <p>前端工程师</p>
      <button>Follow</button>
    </div>
  )
}

问题：
	•	复用不了
	•	改一块容易影响全局
	•	代码会爆炸

⸻

✅ 拆组件的本质

组件 = UI 的最小职责单元

拆分标准（记住这 3 条）
	1.	是否可以 复用
	2.	是否有 独立含义
	3.	是否可能 单独变化

⸻

二、你的第一个组件拆分（实战）

🎯 目标 UI

个人信息卡片

	•	头像
	•	名字
	•	描述

⸻

1️⃣ 子组件：Avatar.jsx
const Avatar = () => {
  return <img src="https://via.placeholder.com/80" />
}

export default Avatar

⸻

2️⃣ 子组件：Profile.jsx
const Profile = () => {
  return (
    <div>
      <h2>DiDi</h2>
      <p>前端工程师</p>
    </div>
  )
}

export default Profile


⸻

3️⃣ 父组件：App.jsx

import Avatar from './Avatar'
import Profile from './Profile'

const App = () => {
  return (
    <div>
      <Avatar />
      <Profile />
    </div>
  )
}

export default App
👉 此时你已经在做“组件组合”了

⸻

三、Props：组件之间如何通信？

📌 核心一句话

props 是 父组件传给子组件的参数

⸻

1️⃣ 父 → 子 传值

<Profile name="DiDi" desc="前端工程师" />

⸻

2️⃣ 子组件接收 props

const Profile = ({ name, desc }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{desc}</p>
    </div>
  )
}
📌 props 是只读的

⸻

四、为什么 props 不能被修改？（必考）

❌ 错误示例：

props.name = 'Hack'
✅ 原因（面试标准答案）：

React 采用单向数据流，子组件不能修改父组件的数据，否则会导致数据流混乱、难以追踪状态变化。

⸻

五、真实业务拆分示例（面试加分）

❌ 错误拆法

UserPage
 ├─ UserHeader
 ├─ UserBody
 ├─ UserFooter


 ✅ 正确拆法

 UserPage
 ├─ Avatar
 ├─ UserName
 ├─ UserBio
 ├─ FollowButton

 👉 按“功能”拆，而不是按“结构”拆

