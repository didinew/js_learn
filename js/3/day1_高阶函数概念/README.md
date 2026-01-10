Day 57：高阶函数概念

1️⃣ 高阶函数定义

高阶函数（Higher-Order Function, HOF）指的是满足以下至少一条的函数：
	1.	接受一个或多个函数作为参数
	2.	返回一个函数

核心思想：函数可以像数据一样传递和操作
---
2️⃣ 高阶函数示例

示例 1：函数作为参数

```js
function repeat(n, fn) {
```
  for (let i = 0; i < n; i++) {
    fn(i);
  }
}

repeat(3, console.log);
// 输出：0 1 2
- console.log 被作为参数传入，repeat 是高阶函数。

示例 2：函数返回函数

```js
function multiplier(factor) {
  return function(x) {
    return x * factor;
```
  };
}

```js
const double = multiplier(2);
console.log(double(5)); // 10
```
- multiplier 返回一个新函数，是典型高阶函数。
---
3️⃣ 常用 JS 高阶函数
- 数组操作：

  [1,2,3].map(x => x*2)       // map 返回新数组
[1,2,3].filter(x => x>1)    // filter 筛选
[1,2,3].reduce((acc,x)=>acc+x,0) // reduce 聚合
- 定时器 / 回调：
  setTimeout(() => console.log('Hi'), 1000);
- 事件监听：

    button.addEventListener('click', e => console.log(e));
    总结：所有接收函数或返回函数的，都属于高阶函数。
---
4️⃣ 高阶函数的优势
	1.	抽象化操作：把共性逻辑抽象成函数
	2.	代码复用性高：可将行为参数化
	3.	组合能力强：可以组合多个函数形成流水线
---
💡 核心记忆点：
	1.	高阶函数 = 函数式编程的“基础组件”
	2.	接受函数 → 参数化行为
	3.	返回函数 → 可组合/可复用