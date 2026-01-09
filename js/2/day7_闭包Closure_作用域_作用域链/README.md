Day 7：闭包（Closure）+ 作用域 + 作用域链【JS 灵魂】

⸻

今日目标
	•	真正理解什么是闭包（不是背定义）
	•	能画出作用域链
	•	知道闭包为什么会导致内存泄漏
	•	掌握闭包的真实应用场景（不是 for 循环）

⸻

一句话总纲（先背）

闭包 = 函数 + 它能访问的外层作用域

或者更狠一句：

闭包不是“函数”，而是“函数活着时带着的作用域”

⸻

1️⃣ JS 中的作用域是什么？

三种作用域

类型
说明
全局作用域
最外层
函数作用域
函数内部
块级作用域
let / const

let a = 1

function foo() {
  let b = 2
  if (true) {
    let c = 3
  }
}

📌 作用域在「定义阶段」就确定，不是执行阶段

⸻

2️⃣ 什么是作用域链？（画脑图级理解）

let a = 1

function foo() {
  let b = 2
  function bar() {
    console.log(a, b)
  }
  bar()
}
foo()

查找顺序

bar 内部
  ↓
foo 作用域
  ↓
全局作用域
📌 只向外找，不向内找

⸻

3️⃣ 闭包真正出现的条件（重点）

❌ 不是所有嵌套函数都有闭包

✅ 满足这 2 个条件才是闭包：
	1.	函数嵌套
	2.	内部函数引用了外部变量
	3.	内部函数被“拿到外面执行”

⸻

经典闭包示例

function outer() {
  let count = 0
  return function inner() {
    count++
    console.log(count)
  }
}

const fn = outer()
fn() // 1
fn() // 2

📌 为什么 count 没被销毁？

因为 inner 还在引用它


⸻

4️⃣ JS 内存视角看闭包（面试官最爱）

正常函数

执行完 → 作用域销毁

闭包函数

外部函数执行完
↓
作用域被 inner 引用
↓
GC 不回收

📌 结论

闭包 = 延长变量生命周期

⸻

5️⃣ for 循环闭包必杀题（90% 翻车）

❌ 错误示例

for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i)
  }, 0)
}
// 3 3 3

✅ 正确方式 1（let）

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}

✅ 正确方式 2（闭包）

for (var i = 0; i < 3; i++) {
  (function (i) {
    setTimeout(() => console.log(i), 0)
  })(i)
}

📌 面试官追问：

为什么 let 可以？

💯 标准回答：

因为 let 在每次循环中创建了新的块级作用域。

⸻

6️⃣ 闭包的真实应用场景（加分）

1. 函数柯里化

function add(a) {
  return function (b) {
    return a + b
  }
}

2. 私有变量（模块化思想）

function createCounter() {
  let count = 0
  return {
    inc() {
      count++
    },
    get() {
      return count
    }
  }
}

⸻

3. 防抖 / 节流（核心原理）

function debounce(fn, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

📌 timer 能记住，就是闭包

⸻

7️⃣ 闭包 & 内存泄漏（真实工程）

可能泄漏的情况
	•	DOM 引用 + 闭包
	•	全局缓存不释放
	•	定时器未清除

  function bind() {
  const el = document.getElementById('box')
  return () => {
    console.log(el)
  }
}

📌 el 无法被 GC

解决方式

el = null
clearTimeout(timer)
removeEventListener


⸻

8️⃣ 面试高频追问（直接背）

❓ 什么是闭包？

函数在定义时创建作用域，并在执行时仍能访问该作用域，即使外层函数已经执行完。

⸻

❓ 闭包的缺点？

增加内存占用，可能导致内存泄漏。

⸻

❓ 闭包和作用域链关系？

闭包依赖作用域链查找变量。


