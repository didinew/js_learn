
⸻

🟢 Day 9：useEffect 高级 + API 请求 + 状态拆分 + 错误处理

🎯 今日目标
	•	理解 useEffect 的依赖管理
	•	完整处理 API 请求 + loading + error
	•	学会 Smart / Dumb 状态拆分
	•	能写 动态列表 + 删除 + 异步请求

⸻

一、useEffect 高级

1️⃣ 基本写法

useEffect(() => {
  console.log('组件挂载或依赖更新')
}, [dep1, dep2])

	•	空数组 [] → 只执行一次（挂载）
	•	有依赖 [dep] → 依赖变化才执行
	•	无数组 → 每次渲染都会执行

⸻

2️⃣ 清理副作用

useEffect(() => {
  const timer = setInterval(() => console.log('tick'), 1000)
  return () => clearInterval(timer) // 卸载或依赖更新时清理
}, [])

面试点：清理函数 避免内存泄漏 / 多次副作用叠加

⸻

二、API 请求 + 状态拆分

1️⃣ Smart 组件管理状态

import { useState, useEffect } from 'react'
import UserItem from './UserItem'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(err => {
        setError('请求失败')
        setLoading(false)
      })
  }, [])


  2️⃣ 条件渲染

    if (loading) return <p>加载中...</p>
  if (error) return <p>{error}</p>

  3️⃣ 列表渲染 + 子组件回调

    return (
    <ul>
      {users.map(user => (
        <UserItem key={user.id} user={user} onRemove={id => setUsers(users.filter(u => u.id !== id))} />
      ))}
    </ul>
  )
}


⸻

三、Dumb 子组件
const UserItem = ({ user, onRemove }) => (
  <li>
    {user.name} <button onClick={() => onRemove(user.id)}>删除</button>
  </li>
)
export default UserItem

📌 优点
	•	UI 和逻辑分离
	•	父组件管理 state、子组件只负责展示
	•	易复用、易维护

⸻

四、优化 API 请求状态


useEffect(() => {
  let isMounted = true // 避免卸载后 setState
  setLoading(true)
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => { if (isMounted) { setUsers(data); setLoading(false) } })
    .catch(err => { if (isMounted) { setError('请求失败'); setLoading(false) } })
  return () => { isMounted = false }
}, [])

面试点：避免组件卸载后 setState 导致报错


