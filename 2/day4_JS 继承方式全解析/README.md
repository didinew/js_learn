Day 4：JS 继承方式全解析（原型链 / 构造函数 / 组合 / ES6 class）

今日目标
- 掌握 4 种经典继承方式
- 能分析优缺点
- 能手写实现，并理解底层原理
---
1️⃣ 原型链继承

| function Parent() { | this.name = 'Parent' | } |
| --- | --- | --- |
| Parent.prototype.sayHi = function() { | console.log('Hi, ' + this.name) | } |
| function Child() {} | Child.prototype = new Parent() | Child.prototype.constructor = Child |
```js
const c = new Child()
```
c.sayHi() // Hi, Parent

特点
- 优点：
- 方法可以被所有实例共享
- 缺点：
- 实例属性会被所有实例共享（引用类型问题）
- 无法向父构造函数传参
---
2️⃣ 构造函数继承（借用构造函数）

| 示例 | function Parent(name) { | this.name = name |
| --- | --- | --- |
| } | function Child(name) { | Parent.call(this, name) |
| } | const c1 = new Child('DiDi') | console.log(c1.name) // DiDi |


特点
- 优点：
- 可以传参
- 避免引用类型共享问题
- 缺点：
- 方法不能复用（每次实例化都创建新方法）
---
3️⃣ 组合继承（原型链 + 构造函数）

| 示例 | function Parent(name) { | this.name = name | this.colors = ['red', 'blue'] |
| --- | --- | --- | --- |
| } | Parent.prototype.sayHi = function() { | console.log('Hi, ' + this.name) | } |
| function Child(name, age) { | Parent.call(this, name) // 构造函数继承属性 | this.age = age | } |
Child.prototype = new Parent()  // 原型链继承方法
Child.prototype.constructor = Child

```js
const c1 = new Child('DiDi', 18)
```
c1.colors.push('green')

```js
const c2 = new Child('LiLi', 20)
console.log(c2.colors) // ['red', 'blue']
```
特点
- 优点：
- 既可以继承父类实例属性，也可以继承父类方法
- 缺点：
- 父类构造函数调用了两次（一次在 Child.call，一次在 Child.prototype = new Parent()），轻微性能浪费
---
4️⃣ ES6 class 继承（语法糖）

示例

| class Parent { | constructor(name) { | this.name = name | } |
| --- | --- | --- | --- |
| sayHi() { | console.log('Hi, ' + this.name) | } | } |
| class Child extends Parent { | constructor(name, age) { | super(name) // 调用父类构造函数 | this.age = age |
  }
}

```js
const c = new Child('DiDi', 18)
```
c.sayHi() // Hi, DiDi
特点
- 基于原型链 + 构造函数组合继承实现
- super() 是必须调用的
- 语法简洁、清晰，可读性高
- 是现代 JS 推荐写法
---
| 5️⃣ 面试必考点总结 | 继承方式 | 优点 | 缺点 |
| --- | --- | --- | --- |
| 原型链继承 | 方法可复用 | 实例属性共享，不能传参 | 构造函数继承 |
| 可以传参，避免引用共享 | 方法不能复用 | 组合继承 | 方法可复用 + 可以传参 |
| 构造函数调用两次 | ES6 class | 语法简洁，现代方式 | 无明显缺点，背后仍是组合继承 |