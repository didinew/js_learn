🟢 Day 7：useEffect + 数据请求 + 列表渲染实战

🎯 今日目标
	•	掌握 useEffect 副作用处理
	•	学会 数据请求 + 渲染
	•	能写 动态列表 + 条件渲染 + 删除
	•	理解 依赖数组的重要性

⸻

一、useEffect 基础

1️⃣ 导入

import { useEffect, useState } from 'react'

2️⃣ 基本用法

useEffect(() => {
  console.log('组件挂载或更新了')
})

3️⃣ 依赖数组

useEffect(() => {
  console.log('只在组件挂载时执行一次')
}, []) // 空数组 = 只在挂载时执行

useEffect(() => {
  console.log('count 改变时执行')
}, [count]) // 依赖某个 state

4️⃣ 清理函数

useEffect(() => {
  const timer = setInterval(() => console.log('tick'), 1000)
  return () => clearInterval(timer) // 卸载时清理
}, [])

重点：副作用执行 + 清理函数 + 依赖数组 是 React 面试高频点。

⸻

二、请求 API + 渲染列表

1️⃣ 示例：获取用户列表

const App = () => {
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
  }, []) // 空依赖数组 = 只在挂载时执行

2️⃣ 条件渲染

  if (loading) return <p>加载中...</p>
  if (error) return <p>{error}</p>

3️⃣ 渲染列表

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}


⸻

三、父子组件回调 + 删除

const App = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
  }, [])

  const removeUser = id => setUsers(users.filter(u => u.id !== id))

  if (loading) return <p>加载中...</p>

  return (
    <ul>
      {users.map(user => (
        <UserItem key={user.id} user={user} onRemove={removeUser} />
      ))}
    </ul>
  )
}

const UserItem = ({ user, onRemove }) => (
  <li>
    {user.name} <button onClick={() => onRemove(user.id)}>删除</button>
  </li>
)

✅ 今天把 useEffect + 状态 + 列表渲染 + 条件渲染 + 父子回调 全部串起来了
你已经能写一个 完整的动态请求列表组件。

