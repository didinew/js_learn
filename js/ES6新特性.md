
⸻

一、语法级核心（100% 必会）

1️⃣ let / const

解决问题： var 没有块级作用域、变量提升混乱

let a = 1
const b = 2

面试必问
	•	let / const 有块级作用域
	•	存在暂时性死区（TDZ）
	•	const 不能重新赋值，但对象内容可变

⸻

2️⃣ 箭头函数 =>

解决问题： this 指向混乱

const fn = () => {
  console.log(this)
}

特点
	•	没有自己的 this / arguments
	•	this 继承自外层作用域
	•	不能 new

👉 Vue / React Hooks 中大量使用

⸻

3️⃣ 模板字符串 `

const name = 'Tom'
console.log(`Hello ${name}`)

优势
	•	支持变量、表达式
	•	支持多行字符串
	•	比 + 拼接更可读（你前面刚问过这点）


⸻

二、数据结构 & 解构（高频实战）

4️⃣ 解构赋值（对象 / 数组）

const user = { name: 'Tom', age: 18 }
const { name, age } = user

函数参数解构（面试加分）
function init({ url, method = 'GET' }) {}

👉 常见于：接口参数、配置对象、props

5️⃣ 默认参数

function foo(a = 1) {}

	•	避免 a || 1 的坑
	•	默认参数只在 undefined 时生效

⸻

6️⃣ 扩展运算符 ...

const arr2 = [...arr1]
const obj2 = { ...obj1 }

用途
	•	浅拷贝
	•	合并对象 / 数组
	•	React / Vue 状态更新必用

⸻

三、数组 & 对象增强（你最近重点）

7️⃣ 新数组方法

arr.find()
arr.findIndex()
arr.includes()

👉 比 indexOf 语义清晰

⸻

8️⃣ 对象字面量增强

const name = 'Tom'
const obj = {
  name,
  say() {}
}


⸻

四、模块化（工程化核心）

9️⃣ import / export

export const a = 1
export default function () {}

import fn, { a } from './a.js'
面试必问
	•	静态分析
	•	编译时加载
	•	支持 Tree Shaking（Webpack / Vite）



⸻

五、类 & 面向对象

🔟 class

class Person {
  constructor(name) {
    this.name = name
  }
  say() {}
}

本质
	•	语法糖
	•	底层还是 prototype

⸻

六、异步 & 流程控制

1️⃣1️⃣ Promise

new Promise((resolve, reject) => {})
解决
	•	回调地狱
	•	链式调用

👉 async / await 是基于 Promise（ES2017）

⸻

七、集合类型（面试常考）

1️⃣2️⃣ Set / Map

const set = new Set([1, 2, 2])
const map = new Map()

类型
适合
Set
去重
Map
非字符串 key



⸻

八、Symbol（高级但常考）

1️⃣3️⃣ Symbol

const key = Symbol('id')

用途
	•	唯一值
	•	避免对象 key 冲突
	•	框架底层常用

⸻

九、ES6 一句话面试总结（必背）

ES6 引入了块级作用域、模块化、类、Promise、解构、箭头函数等特性，使 JS 从“脚本语言”进化为“工程级语言”。

⸻

