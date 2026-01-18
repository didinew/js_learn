🟢 Day 6：列表渲染 + 条件渲染 + 父子回调

🎯 今日目标
	•	掌握 数组 map 渲染组件
	•	理解 key 的真正作用
	•	学会 子组件回调父组件
	•	能写 动态列表 + 删除/修改功能

⸻

一、数组渲染

1️⃣ 基本写法

const users = ['DiDi', 'Lily', 'Tom']

<ul>
  {users.map(user => (
    <li key={user}>{user}</li>
  ))}
</ul>

📌 注意
	•	每个元素必须 唯一 key
	•	key 帮 React 最小化 DOM 更新
	•	不建议用 index 做 key，除非数组不会增删

⸻

2️⃣ 渲染对象数组

const users = [
  { id: 1, name: 'DiDi' },
  { id: 2, name: 'Lily' }
]

<ul>
  {users.map(user => (
    <li key={user.id}>{user.name}</li>
  ))}
</ul>



⸻

二、条件渲染复习

{users.length === 0 ? (
  <p>暂无用户</p>
) : (
  <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
)}


用条件渲染处理 空列表 / 有内容 场景

⸻

三、父子组件回调

1️⃣ 父组件状态传递给子组件

const App = () => {
  const [count, setCount] = useState(0)
  return <Counter count={count} onChange={setCount} />
}

2️⃣ 子组件通过回调修改父组件状态

const Counter = ({ count, onChange }) => {
  return (
    <div>
      <button onClick={() => onChange(count - 1)}>-1</button>
      <span>{count}</span>
      <button onClick={() => onChange(count + 1)}>+1</button>
    </div>
  )
}

📌 核心原则
	•	单向数据流
	•	子组件不修改父组件 state
	•	通过 props 回调函数 通知父组件

⸻

四、综合示例：Todo List

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 React' },
    { id: 2, text: '练习列表渲染' },
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
          <TodoItem key={todo.id} todo={todo} onRemove={removeTodo} />
        ))}
      </ul>
    </div>
  )
}

const TodoItem = ({ todo, onRemove }) => (
  <li>
    {todo.text} <button onClick={() => onRemove(todo.id)}>删除</button>
  </li>
)

✅ 今天把 map + key + 条件渲染 + 父子回调 全部串起来了。

