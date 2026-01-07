Day 3：proto / prototype / constructor 终极图解 + 原型链

今日目标
	•	理解 __proto__、prototype、constructor 三者关系
	•	彻底搞懂原型链查找机制
	•	能用图解清晰描述原型链

⸻

1️⃣ 原型链查找机制（必考）
	•	实例通过 __proto__ 找到构造函数的 prototype
	•	再通过 prototype.__proto__ 找到 Object.prototype
	•	最终到 null 结束，这条链就叫原型链

⸻

2️⃣ proto、prototype、constructor 的区别

名称
所属对象
作用
面试口诀
prototype
构造函数
定义实例共享属性和方法
构造函数有 prototype
__proto__
实例对象
指向创建它的构造函数的 prototype
实例对象有 proto
constructor
prototype 对象
指向创建该 prototype 的构造函数
原型上有 constructor

实例示例

function Person(name) {
  this.name = name
}
Person.prototype.sayHi = function() { console.log('hi') }

const p = new Person('DiDi')

// 关系验证
console.log(p.__proto__ === Person.prototype) // true
console.log(Person.prototype.constructor === Person) // true
console.log(p.constructor === Person) // true

✅ 记住：

实例 → proto → 构造函数 prototype → prototype 的 prototype … → Object.prototype → null

⸻

3️⃣ 原型链查找机制

规则
	1.	先查实例自身属性
	2.	再查实例的 __proto__（即构造函数 prototype）
	3.	继续沿着 __proto__.__proto__ 向上查找，直到 null

示例
function A() {}
A.prototype.x = 1

const a = new A()
console.log(a.x) // 1 (从 A.prototype 查找)
console.log(a.hasOwnProperty('x')) // false

⸻

4️⃣ 原型链与继承

原型链继承

function Parent() {
  this.name = 'Parent'
}
Parent.prototype.sayHi = function() { console.log('Hi') }

function Child() {
  this.age = 10
}
Child.prototype = new Parent()  // 核心：继承父类原型
Child.prototype.constructor = Child

const c = new Child()
console.log(c.name) // 'Parent'
c.sayHi() // 'Hi'

✅ 解析：
	•	Child.prototype 指向 Parent 实例
	•	子实例可以访问父 prototype 上的方法
	•	面试必背：组合继承 / 寄生组合继承优化内存

⸻

5️⃣ 小实验：验证原型链

console.log(c.__proto__ === Child.prototype) // true
console.log(c.__proto__.__proto__ === Parent.prototype) // true
console.log(c.__proto__.__proto__.__proto__ === Object.prototype) // true
console.log(c.__proto__.__proto__.__proto__.__proto__ === null) // true

💡 可画图：

c → Child.prototype → Parent.prototype → Object.prototype → null

