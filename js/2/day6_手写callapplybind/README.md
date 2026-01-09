Day 6：手写 call / apply / bind（底层原理通关）

今日目标
	•	明白 call / apply / bind 的底层实现思路
	•	能 手写实现（面试必考）
	•	理解为什么它们能改变 this

⸻

一句话核心原理（先背）

this 的本质：谁调用函数，this 就指向谁
call / apply / bind 的本质：把函数“临时挂到对象上执行”

⸻

1️⃣ 为什么 call / apply 能改变 this？

foo.call(obj)

等价思想 👇
obj.fn = foo
obj.fn()
delete obj.fn
📌 结论

this 的改变不是“魔法”，而是调用方式改变了

⸻

2️⃣ 手写 call（必会）

原生用法
fn.call(ctx, a, b)


⸻

手写实现

Function.prototype.myCall = function (context, ...args) {
  // 1️⃣ 处理 null / undefined
  context = context ?? window

  // 2️⃣ this 就是调用 myCall 的函数
  const fn = this

  // 3️⃣ 防止属性名冲突
  const key = Symbol('fn')

  // 4️⃣ 临时挂载
  context[key] = fn

  // 5️⃣ 执行
  const result = context[key](...args)

  // 6️⃣ 删除
  delete context[key]

  return result
}

验证
function foo(a, b) {
  console.log(this.name, a, b)
}

foo.myCall({ name: 'DiDi' }, 1, 2)
// DiDi 1 2


⸻

3️⃣ 手写 apply

区别
	•	参数是数组

  Function.prototype.myApply = function (context, args = []) {
  context = context ?? window
  const fn = this
  const key = Symbol('fn')

  context[key] = fn
  const result = context[key](...args)
  delete context[key]

  return result
}

⸻

4️⃣ 手写 bind（地狱级，重点）

原生特性
	•	不立即执行
	•	返回新函数
	•	this 永久绑定
	•	可配合 new 使用（最高优先级）

⸻

手写 bind（完整版）

Function.prototype.myBind = function (context, ...args1) {
  const fn = this

  function boundFn(...args2) {
    // 判断是否通过 new 调用
    const isNew = this instanceof boundFn
    const finalThis = isNew ? this : context
    return fn.apply(finalThis, args1.concat(args2))
  }

  // 维护原型链
  boundFn.prototype = Object.create(fn.prototype)

  return boundFn
}


⸻

验证 bind + new

function Person(name) {
  this.name = name
}

const Obj = { name: 'obj' }
const Bound = Person.myBind(Obj)

const p = new Bound('DiDi')
console.log(p.name) // DiDi

📌 面试官最爱问

为什么 bind 要处理 new？

💯 标准答案：

因为 new 的 this 绑定优先级高于 bind，必须保证构造函数行为不被破坏。

⸻

5️⃣ 面试高频追问（直接背）

❓ call / apply / bind 区别？

方法
是否立即执行
参数
是否可 new
call
✅
逐个
❌
apply
✅
数组
❌
bind
❌
逐个
✅


⸻

❓ bind 为什么返回函数？

因为 bind 的设计目标是延迟执行 + this 预绑定

⸻

❓ 箭头函数能 bind 吗？

可以调用 bind，但 this 不会改变，因为箭头函数没有自己的 this。

