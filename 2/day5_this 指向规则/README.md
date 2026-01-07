Day 5：this 指向规则（终极版）

今日目标
	•	掌握 this 的 4 条核心规则
	•	看代码就能判断 this 指向
	•	能应付 bind / call / apply / 箭头函数混合题

⸻

一句话总纲（先背）

this 不是在定义时确定，而是在调用时确定（箭头函数除外）



⸻

1️⃣ 规则一：默认绑定（普通函数）

示例
function foo() {
  console.log(this)
}
foo()
结果
	•	非严格模式：window
	•	严格模式：undefined

✅ 面试标准答案

普通函数独立调用时，this 指向全局对象（严格模式为 undefined）。

⸻

2️⃣ 规则二：隐式绑定（对象调用）

示例
const obj = {
  name: 'DiDi',
  foo() {
    console.log(this.name)
  }
}

obj.foo() // DiDi

⚠️ 隐式丢失（高频坑）
const f = obj.foo
f() // undefined（或 window.name）

✅ 面试结论

this 只与调用位置有关，与函数定义位置无关。


⸻

3️⃣ 规则三：显式绑定（call / apply / bind）

示例
function foo() {
  console.log(this.name)
}
const obj = { name: 'DiDi' }

foo.call(obj)
foo.apply(obj)
const bar = foo.bind(obj)
bar()
区别

方法
是否立即执行
参数形式
call
是
逐个传
apply
是
数组传
bind
否
逐个传（返回新函数）

❗ 优先级

显式绑定 > 隐式绑定 > 默认绑定

⸻

4️⃣ 规则四：new 绑定（构造函数）

示例
function Person(name) {
  this.name = name
}
const p = new Person('DiDi')

✅ 结论

new 调用时，this 指向新创建的实例对象。

❗ 优先级

new > 显式绑定

function Foo() {
  this.name = 'foo'
}
const obj = {}
const Bar = Foo.bind(obj)
new Bar()

👉 this 指向新对象，而不是 obj


⸻

5️⃣ 箭头函数 this（终极杀器）

核心规则

箭头函数没有自己的 this，它的 this 来自定义时所在的作用域

示例

const obj = {
  name: 'DiDi',
  foo() {
    const bar = () => {
      console.log(this.name)
    }
    bar()
  }
}
obj.foo() // DiDi


❌ 箭头函数不能被改变 this

bar.call(obj) // 无效

6️⃣ this 规则优先级总结（必背）
new > bind/call/apply > 对象调用 > 默认绑定

⚠️ 箭头函数例外：一旦定义，永远不变
