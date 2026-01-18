🟢 Day 5：事件处理 + 条件渲染 + 表单交互

🎯 今日目标
	•	理解 React 事件绑定 与原生 JS 的区别
	•	掌握 条件渲染 方法
	•	完成 受控表单交互
	•	能写 动态显示/隐藏组件 + 输入反馈

⸻

一、React 事件处理

1️⃣ 基础用法

const App = () => {
  const handleClick = () => {
    alert('按钮被点击了！')
  }

  return <button onClick={handleClick}>点击我</button>
}

📌 注意点
	•	React 事件 驼峰命名：onClick, onChange
	•	不需要 addEventListener
	•	this 在函数组件中不用考虑（类组件需要注意绑定）

⸻

2️⃣ 事件对象

const handleInput = e => {
  console.log(e.target.value)
}
<input onChange={handleInput} />

	•	React 会包装原生事件，称为 SyntheticEvent
	•	可以跨浏览器使用

⸻

3️⃣ 阻止默认事件

const handleSubmit = e => {
  e.preventDefault()
  alert('表单提交被阻止')
}
<form onSubmit={handleSubmit}>
  <button type="submit">提交</button>
</form>


⸻

二、条件渲染

1️⃣ && 渲染

const App = () => {
  const [isShow, setIsShow] = useState(true)

  return (
    <div>
      {isShow && <p>显示这段文字</p>}
      <button onClick={() => setIsShow(!isShow)}>切换显示</button>
    </div>
  )
}

2️⃣ 三元表达式

{isShow ? <p>显示</p> : <p>隐藏</p>}

3️⃣ 面试点
	•	React 没有 v-if / v-show
	•	条件渲染 返回 null = 不渲染

  {!isShow && null}


⸻

三、表单交互（受控组件）

1️⃣ 文本输入

const App = () => {
  const [text, setText] = useState('')

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <p>你输入了：{text}</p>
    </div>
  )
}

2️⃣ 多个输入

const [form, setForm] = useState({ name: '', email: '' })

<input
  value={form.name}
  onChange={e => setForm({ ...form, name: e.target.value })}
/>
<input
  value={form.email}
  onChange={e => setForm({ ...form, email: e.target.value })}
/>

📌 面试点
	•	表单值存储在 state
	•	React 控制 input → 受控组件
	•	更新对象要 生成新对象（不要直接修改原 state）

⸻

四、综合示例：登录表单 + 条件显示

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(false)

  const handleLogin = () => {
    if (username === 'DiDi' && password === '123') {
      setIsLogin(true)
    } else {
      alert('账号或密码错误')
    }
  }

  return (
    <div>
      {isLogin ? (
        <h2>欢迎 {username}</h2>
      ) : (
        <div>
          <input
            placeholder="用户名"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>登录</button>
        </div>
      )}
    </div>
  )
}

✅ 今天把 事件 + 条件渲染 + 表单 完整串起来了。


