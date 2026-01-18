🟢 Day 10：表单高级 + 自定义 Hook + 状态复用

🎯 今日目标
	•	理解 表单状态管理高级技巧
	•	学会 自定义 Hook 提取可复用逻辑
	•	能写 通用表单组件 + 多输入状态管理
	•	掌握 状态复用与封装

⸻

一、高级表单状态管理

1️⃣ 多输入表单

const [form, setForm] = useState({
  username: '',
  email: '',
  password: ''
})

const handleChange = (key, value) => {
  setForm(prev => ({ ...prev, [key]: value }))
}

return (
  <div>
    <input
      placeholder="用户名"
      value={form.username}
      onChange={e => handleChange('username', e.target.value)}
    />
    <input
      placeholder="邮箱"
      value={form.email}
      onChange={e => handleChange('email', e.target.value)}
    />
    <input
      type="password"
      placeholder="密码"
      value={form.password}
      onChange={e => handleChange('password', e.target.value)}
    />
    <pre>{JSON.stringify(form, null, 2)}</pre>
  </div>
)

✅ 关键点
	•	状态对象化
	•	统一 handleChange 函数
	•	避免为每个输入单独写 state

⸻

二、自定义 Hook 提取逻辑

1️⃣ 为什么要用 Hook
	•	提取可复用逻辑
	•	避免重复代码
	•	Smart 组件只关注布局/渲染

2️⃣ 自定义 useForm Hook

import { useState } from 'react'

const useForm = (initialValues) => {
  const [form, setForm] = useState(initialValues)

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const resetForm = () => setForm(initialValues)

  return { form, handleChange, resetForm }
}

export default useForm


⸻

3️⃣ 使用自定义 Hook

import useForm from './useForm'

const RegisterForm = () => {
  const { form, handleChange, resetForm } = useForm({
    username: '',
    email: '',
    password: ''
  })

  const handleSubmit = () => {
    console.log('提交表单', form)
    resetForm()
  }

  return (
    <div>
      <input value={form.username} onChange={e => handleChange('username', e.target.value)} placeholder="用户名" />
      <input value={form.email} onChange={e => handleChange('email', e.target.value)} placeholder="邮箱" />
      <input value={form.password} onChange={e => handleChange('password', e.target.value)} placeholder="密码" type="password" />
      <button onClick={handleSubmit}>提交</button>
    </div>
  )
}
📌 优点
	•	多个表单可以共用 useForm Hook
	•	状态管理逻辑和 UI 分离
	•	易测试、易复用

⸻

三、父子组件 + 自定义 Hook 配合

// Smart 容器组件
const FormContainer = () => {
  const { form, handleChange, resetForm } = useForm({ name: '', email: '' })

  const handleAdd = () => {
    console.log('新增用户', form)
    resetForm()
  }

  return <FormUI form={form} handleChange={handleChange} onAdd={handleAdd} />
}

// Dumb 表单 UI 组件
const FormUI = ({ form, handleChange, onAdd }) => (
  <div>
    <input value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="姓名" />
    <input value={form.email} onChange={e => handleChange('email', e.target.value)} placeholder="邮箱" />
    <button onClick={onAdd}>添加</button>
  </div>
)
逻辑在 Hook + Smart 组件，UI 在 Dumb 组件 → 彻底分离职责

