🟢 Day 3：Props 深水区 + 列表渲染 + key

🎯 今日目标
	•	理解 props 的深入用法
	•	掌握 数组渲染
	•	明白 key 的真正作用
	•	能做 动态列表组件

⸻

一、Props 深水区

1️⃣ 父子组件传对象

const user = { name: 'DiDi', age: 18 }

<UserCard info={user} />

const UserCard = ({ info }) => {
  return (
    <div>
      <h2>{info.name}</h2>
      <p>{info.age}岁</p>
    </div>
  )
}

📌 面试点
	•	props 可以是 任意 JS 类型：string / number / object / function / array
	•	props 不可修改
	•	如果要修改对象内部值，要通过 父组件状态 或 回调函数

⸻

2️⃣ 父传子 + 子通知父

子组件不能直接修改父组件状态，但可以传函数

const App = () => {
  const [count, setCount] = useState(0)
  return <Counter count={count} onChange={setCount} />
}

const Counter = ({ count, onChange }) => {
  return <button onClick={() => onChange(count + 1)}>+1</button>
}

📌 精髓：单向数据流 + 回调函数 = 组件通信

⸻

二、列表渲染

1️⃣ map 渲染数组

const users = [
  { id: 1, name: 'DiDi' },
  { id: 2, name: 'Lily' },
]

<ul>
  {users.map(user => (
    <li key={user.id}>{user.name}</li>
  ))}
</ul>


⸻

2️⃣ key 的作用

面试必问

key = 唯一标识，帮助 React 最小化更新 DOM

没有 key → 每次渲染都销毁重建
有 key → 只更新变化部分

错误示例

users.map((user, index) => <li key={index}>{user.name}</li>)


	•	index 只有在 数组不会增删 时安全
	•	动态增删数组时容易 复用错误

⸻

三、组合 + 列表实战

目标：用户卡片列表

const users = [
  { id: 1, name: 'DiDi', desc: '前端工程师' },
  { id: 2, name: 'Lily', desc: '产品经理' },
]

const UserCard = ({ name, desc }) => (
  <div>
    <h2>{name}</h2>
    <p>{desc}</p>
  </div>
)

const App = () => (
  <div>
    {users.map(u => (
      <UserCard key={u.id} name={u.name} desc={u.desc} />
    ))}
  </div>
)


⸻

四、动态列表 + 子组件回调

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'DiDi', desc: '前端工程师' },
    { id: 2, name: 'Lily', desc: '产品经理' },
  ])

  const removeUser = id => {
    setUsers(users.filter(u => u.id !== id))
  }

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

const UserCard = ({ name, desc, onRemove }) => (
  <div>
    <h2>{name}</h2>
    <p>{desc}</p>
    <button onClick={onRemove}>删除</button>
  </div>
)
📌 这就是 父子通信 + 列表渲染 + key 的完整示例
