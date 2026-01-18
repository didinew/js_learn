🟢 Day 4：State + useState

🎯 今日目标
	•	理解 State（组件状态）是什么
	•	学会使用 useState
	•	能写 计数器、切换开关、表单输入

⸻

一、State 是什么？

1️⃣ 核心概念

State = 组件内部可变的数据
当 State 变化 → React 自动重新渲染 UI


state = 数据
UI = state 的映射
state 改变 → UI 自动更新


⸻

2️⃣ State vs Props

特性
Props
State
谁改
父组件
组件自己
可变
否
是
更新后
通知子
组件自己渲染


⸻

二、useState 基础用法

1️⃣ 导入 useState

import { useState } from 'react'

2️⃣ 初始化 state

const [count, setCount] = useState(0)
	•	count → 当前值
	•	setCount → 修改值，触发渲染
	•	0 → 初始值

⸻

3️⃣ 更新 State

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>计数器：{count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  )
}


📌 重点：setCount 会异步触发更新，React 会批量处理渲染。

⸻

三、State 的更新注意点

1️⃣ 异步更新

setCount(count + 1)
setCount(count + 1)
// 结果只 +1，因为 React 批量更新

✅ 正确写法（函数式更新）

setCount(prev => prev + 1)
setCount(prev => prev + 1)
// 结果 +2



⸻

2️⃣ State 可以是任意类型

const [text, setText] = useState('')      // string
const [flag, setFlag] = useState(false)   // boolean
const [list, setList] = useState([])      // array
const [obj, setObj] = useState({})        // object

📌 面试点：修改对象或数组必须 生成新对象/数组，不要直接修改原始引用。

⸻

四、State + 表单输入（受控组件）
const App = () => {
  const [name, setName] = useState('')

  return (
    <div>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="请输入姓名"
      />
      <p>你好，{name}</p>
    </div>
  )
}

✅ 这就是 受控组件
	•	表单值受 React 控制
	•	一切 UI 都来源于 state

⸻

五、综合示例：Todo 添加 + 删除

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 React' },
  ])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (!input) return
    setTodos([...todos, { id: Date.now(), text: input }])
    setInput('')
  }

  const removeTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTodo}>添加</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text} <button onClick={() => removeTodo(todo.id)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

✅ 今天把 state + 列表渲染 + props + 删除回调 全部串起来了。

