
⸻

🟢 Day 8：Dumb / Smart Components + 状态拆分

🎯 今日目标
	•	理解 Dumb（展示组件）和 Smart（容器组件）
	•	学会 把状态拆分到父组件
	•	能写 可复用、可维护的组件结构

⸻

一、Dumb Component vs Smart Component

1️⃣ 定义

类型
作用
特点
Dumb (Presentational)
只负责 UI 展示
不维护 state，只通过 props 接收数据
Smart (Container)
管理状态、逻辑
维护 state，处理事件，给 Dumb 组件传 props


⸻

2️⃣ 例子：用户卡片

Dumb 组件（只展示）

const UserCard = ({ name, desc, onRemove }) => (
  <div>
    <h2>{name}</h2>
    <p>{desc}</p>
    <button onClick={onRemove}>删除</button>
  </div>
)

Smart 组件（管理状态）


const UserList = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'DiDi', desc: '前端工程师' },
    { id: 2, name: 'Lily', desc: '产品经理' },
  ])

  const removeUser = id => setUsers(users.filter(u => u.id !== id))

  return (
    <div>
      {users.map(u => (
        <UserCard
          key={u.id}
          name={u.name}
          desc={u.desc}
          onRemove={() => removeUser(u.id)}
        />
      ))}
    </div>
  )
}

📌 精髓
	•	Dumb 组件无状态 → 易复用
	•	Smart 组件管理逻辑 → 保持单一职责
	•	分层设计 = 可维护 + 可测试 + 易扩展

⸻

二、状态拆分原则
	1.	每个 state 放到“最小作用域”的父组件
	•	影响多个子组件 → 放父组件
	•	只影响单个组件 → 放子组件
	2.	不要重复存储同样的数据
	•	state 只能有一个来源
	•	数据变化统一从父组件更新
	3.	Smart 组件只处理逻辑
	•	Dumb 组件通过 props 渲染
	•	Smart 组件通过回调处理事件

⸻

三、综合示例：Todo List 完整拆分

1️⃣ Dumb 组件：TodoItem.jsx

const TodoItem = ({ todo, onRemove }) => (
  <li>
    {todo.text} <button onClick={() => onRemove(todo.id)}>删除</button>
  </li>
)
export default TodoItem

2️⃣ Dumb 组件：TodoInput.jsx

const TodoInput = ({ value, onChange, onAdd }) => (
  <div>
    <input value={value} onChange={e => onChange(e.target.value)} />
    <button onClick={onAdd}>添加</button>
  </div>
)
export default TodoInput

3️⃣ Smart 组件：TodoList.jsx

import { useState } from 'react'
import TodoItem from './TodoItem'
import TodoInput from './TodoInput'

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (!input) return
    setTodos([...todos, { id: Date.now(), text: input }])
    setInput('')
  }

  const removeTodo = id => setTodos(todos.filter(todo => todo.id !== id))

  return (
    <div>
      <TodoInput value={input} onChange={setInput} onAdd={addTodo} />
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onRemove={removeTodo} />
        ))}
      </ul>
    </div>
  )
}
export default TodoList

📌 优势
	•	逻辑和展示分离
	•	每个组件职责单一
	•	易扩展、易维护


