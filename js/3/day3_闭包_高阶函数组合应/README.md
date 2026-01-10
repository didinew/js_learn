
Day 59：闭包 + 高阶函数组合应用（核心进阶）

# 先给一句“面试王炸总结”

闭包 = 函数 + 它创建时的作用域
高阶函数 = 行为的抽象与复用
- 两者结合 = 状态封装 / 权限控制 / 缓存 / once / 防抖节流
---
## 闭包的本质（3 句话记死）
	1.	函数在定义时就确定了作用域（词法作用域）
	2.	内部函数引用外部变量 → 外部变量不会被回收
	3.	即使外部函数执行完，变量仍被“保活”

```js
function outer() {
  let count = 0;

  return function inner() {
```
    count++;
```js
    return count;
```
  };
}

```js
const counter = outer();
```
counter(); // 1
counter(); // 2

⚠️ 面试常追问

为什么 count 不会被 GC？

✅ 因为 inner 仍然持有对它的引用（闭包）
---
## 闭包 + 高阶函数的经典模型
外层函数：创建私有变量（状态）
↓
返回函数：操作该状态
↓
多次调用：状态持续存在
---
## 实战 1：once（只执行一次）🔥

使用场景
- 初始化
- 登录校验
- 埋点上报

```js
function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
```
      called = true;
      result = fn.apply(this, args);
    }
```js
    return result;
```
  };
}

考点
- 闭包保存 called
- 高阶函数返回新函数
---
## 实战 2：memoize（函数缓存）🔥🔥

使用场景
- 复杂计算
- 递归（斐波那契）
- 性能优化

```js
function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];

    const result = fn.apply(this, args);
```
    cache[key] = result;
```js
    return result;
```
  };
}

```js
const fib = memoize(function (n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
```
});

面试加分点

这是典型的 空间换时间
---
## 实战 3：权限控制（withAuth）

```js
function withAuth(fn, role) {
  return function (...args) {
    if (role !== 'admin') {
```
      throw new Error('无权限');
    }
```js
    return fn.apply(this, args);
```
  };
}

```js
const deleteUser = withAuth(
```
  id => console.log('删除用户', id),
  'admin'
);
---
七、实战 4：计数器 / 私有状态

```js
function createCounter(step = 1) {
  let count = 0;

  return {
```
    inc() {
      count += step;
```js
      return count;
```
    },
    dec() {
      count -= step;
```js
      return count;
```
    }
  };
}

```js
const counter = createCounter(2);
```
counter.inc(); // 2
counter.inc(); // 4
- 模块化思想的原型
---
八、实战 5：高阶函数组合（包装链）

```js
const withLog = fn => (...args) => {
  console.log('start');
  const res = fn(...args);
  console.log('end');
  return res;
```
};

```js
const withTime = fn => (...args) => {
  const start = performance.now();
  const res = fn(...args);
  console.log(performance.now() - start);
  return res;
```
};

```js
const enhanced = withTime(withLog(sum));

```
这就是 React / Vue 中间件思想的源头
---
九、闭包的坑（必会）

1️⃣ 循环闭包

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 3 3 3

修复

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
---
十、Day 59 面试终极回答模板

闭包用于保存状态
高阶函数用于抽象行为
二者结合可以实现 once、memoize、权限控制、节流防抖等通用能力
框架中的 hooks、中间件、本质都是这种模式

