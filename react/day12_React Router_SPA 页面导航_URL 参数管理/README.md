🟢 Day 12：React Router + SPA 页面导航 + URL 参数管理

今天学完，你就能回答：
“React 项目是怎么做多页面的？”

⸻

🎯 今日目标
	•	理解 SPA / 路由的本质
	•	掌握 React Router v6 核心 API
	•	学会 页面跳转、参数传递、动态路由
	•	能搭建 真实项目路由结构

⸻

一、什么是 SPA？（面试必问）

传统多页面
	•	每次跳转 → 请求新 HTML
	•	页面刷新
	•	状态丢失

SPA（Single Page Application）
	•	只加载一次 HTML
	•	切换页面 = 切换组件
	•	路由变化 → React 重新渲染

📌 React Router 的本质：

根据 URL，决定渲染哪个组件

⸻

二、安装 React Router

npm install react-router-dom

默认讲 v6（面试 & 实战主流）

⸻

三、最基础路由结构

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

关键词理解

组件
作用
BrowserRouter
路由容器
Routes
路由匹配区
Route
URL → 组件



⸻

四、页面跳转（Link / useNavigate）

1️⃣ 声明式跳转（推荐）

import { Link } from 'react-router-dom'

<Link to="/about">去 About</Link>

✅ 不刷新页面
❌ 不适合逻辑跳转

⸻

2️⃣ 编程式跳转（常用）

import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()

<button onClick={() => navigate('/about')}>跳转</button>
📌 典型场景：
	•	登录成功跳转
	•	表单提交后跳转
	•	删除完成后返回列表

⸻

五、动态路由参数（🔥 高频）

1️⃣ 定义路由

<Route path="/user/:id" element={<UserDetail />} />

2️⃣ 读取参数

import { useParams } from 'react-router-dom'

const { id } = useParams()

3️⃣ 示例

const UserDetail = () => {
  const { id } = useParams()
  return <h2>用户 ID：{id}</h2>
}


⸻

六、Query 参数（?xxx=）

import { useSearchParams } from 'react-router-dom'

const [searchParams] = useSearchParams()
const keyword = searchParams.get('keyword')

