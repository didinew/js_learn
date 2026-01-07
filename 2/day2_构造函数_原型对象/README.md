Day 2：构造函数 & 原型对象（prototype）

今日目标
	•	理解构造函数的本质
	•	搞清 prototype 是干什么的
	•	明白 实例、构造函数、原型对象 三者关系

⸻

1️⃣ 构造函数是什么？

构造函数本质

👉 本质就是一个普通函数，只是用 new 调用。
function Person(name, age) {
  this.name = name
  this.age = age
}
用 new 做了什么？（面试必考）
const p = new Person('DiDi', 18)

等价过程（伪代码）👇：

const obj = {}
obj.__proto__ = Person.prototype
Person.call(obj, 'DiDi', 18)
return obj
✅ new 四步走
	1.	创建一个空对象
	2.	对象的 __proto__ 指向构造函数的 prototype
	3.	构造函数内部 this 指向该对象
	4.	返回该对象（除非手动 return 引用类型）

⸻

2️⃣ prototype 是什么？

为什么需要 prototype？

如果方法写在构造函数里：

function Person(name) {
  this.name = name
  this.sayHi = function () {
    console.log('hi')
  }
}
❌ 每 new 一次，就创建一个新函数（浪费内存）

⸻

正确姿势：方法放在 prototype 上
Person.prototype.sayHi = function () {
  console.log('hi')
}

const p1 = new Person('A')
const p2 = new Person('B')

p1.sayHi === p2.sayHi // true ✅
📌 结论
	•	属性放实例
	•	方法放 prototype

⸻

3️⃣ 三者关系（核心图）
p.__proto__ === Person.prototype
Person.prototype.constructor === Person

console.log(p.__proto__ === Person.prototype) // true
console.log(Person.prototype.constructor === Person) // true
💡 记忆口诀：

实例找原型，原型指构造

4️⃣ 属性查找机制（非常重要）

function Person() {}
Person.prototype.type = 'human'

const p = new Person()
p.type // 'human'

查找顺序
	1.	自身属性
	2.	__proto__（构造函数 prototype）
	3.	原型的原型（下一步讲）
	4.	找不到 → undefined

