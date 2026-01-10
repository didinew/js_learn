第 17~20 周：高阶函数 & 函数式编程学习路线

Day 57：高阶函数概念

目标：理解高阶函数是什么，以及它的应用场景。
学习内容：
- 高阶函数定义：接受函数作为参数，或返回函数。
- 常见高阶函数示例：


```js
    function higherOrder(fn) {
  return function (...args) {
    console.log('Before');
    const result = fn(...args);
    console.log('After');
    return result;
```
  }
}
- 回调函数 vs 高阶函数
- 常用 JS 高阶函数：setTimeout, addEventListener, Array.prototype.map/filter/reduce
练习：

	1.	写一个函数 withLogging(fn)，可以包装任何函数并打印执行前后日志。
	2.	用高阶函数封装节流 throttle 或防抖 debounce。
---
Day 58：map/filter/reduce 原理 & 实战

目标：深入理解数组高阶方法的底层原理。
学习内容：
- map、filter、reduce 的实现原理
- 手写实现：
    Array.prototype.myMap = function(fn) {
```js
  const res = [];
```
  for (let i = 0; i < this.length; i++) {
    res.push(fn(this[i], i, this));
  }
```js
  return res;
```
}
- 实战案例：
- 将数字数组平方
- 筛选大于 10 的值
- 计算数组总和
练习：

	1.	用 reduce 实现 map 和 filter 功能
	2.	使用 reduce 扁平化多维数组
	3.	分组数组对象（如按性别、类别分组）
---
Day 59：闭包 + 高阶函数组合应用

目标：掌握闭包和高阶函数结合的高级用法。
学习内容：
- 闭包本质：函数 + 对其作用域的引用
- 高阶函数 + 闭包实现计数器、缓存、权限控制
- 示例：
```js
    function makeCounter() {
  let count = 0;
  return function() {
```
    count++;
```js
    return count;
```
  }
}
```js
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2

```
练习：
	1.	实现带缓存的函数 memoize(fn)
	2.	编写一个权限控制函数 withPermission(fn, role)，根据角色执行不同逻辑
---
Day 60：函数柯里化 (Currying)

目标：理解函数柯里化及其应用。
学习内容：
- 定义：将多参数函数拆分成单参数函数序列
- 示例：

```js
    const add = a => b => c => a + b + c;
console.log(add(1)(2)(3)); // 6
```
- 柯里化 vs 部分应用函数（partial application）
练习：

	1.	实现通用 curry(fn)
	2.	使用柯里化实现 filterByProp('age', 18)(users)
---
Day 61：纯函数、不可变性

目标：理解函数式编程核心原则。
学习内容：
- 纯函数：相同输入 → 相同输出，无副作用
- 不可变性（Immutable）：
- 不修改原数组/对象
- 使用展开运算符/Object.assign/immer
- 示例：

```js
    const arr = [1,2,3];
const newArr = [...arr, 4]; // 不改变原数组

```
练习：
	1.	将数组对象深拷贝并修改某一字段
	2.	用纯函数重写一个有副作用的函数
---
Day 62：函数组合与管道

目标：掌握函数组合与数据流管理
学习内容：
- compose（从右到左组合）：

```js
    const compose = (f, g) => x => f(g(x));
```
- pipe（从左到右组合）
- 使用场景：表单处理、数据转换链
练习：

	1.	实现通用 compose(...fns) 与 pipe(...fns)
	2.	用 pipe 实现数据清洗 → 转换 → 求和流程
---
Day 63-70：小练习 — 函数式工具库实现

目标：巩固函数式编程能力，模拟 lodash/ramda 核心函数
练习内容：
- 手写函数库：
- map, filter, reduce, find, groupBy, memoize
- compose, pipe, curry
- 高阶函数应用场景：
- 组合函数实现复杂逻辑
- 数据不可变处理
- 日志、缓存、权限控制等通用函数
- 项目建议：
- 建立 utils.js 或 fp.js 文件
- 每个函数都写测试用例，确保纯函数性质
