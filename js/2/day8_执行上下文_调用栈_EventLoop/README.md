一、执行上下文（Execution Context）

什么是执行上下文？

JS 执行任何代码都需要一个“环境”，叫执行上下文
分为三种：

	1.	全局上下文（Global EC）
	•	页面的最外层代码
	•	this 指向全局对象（浏览器：window）
	2.	函数上下文（Function EC）
	•	每次函数调用都会创建
	•	this 绑定、形参、局部变量、作用域链
	3.	eval / 模块上下文（可忽略）

⸻

执行上下文组成（必背）
	1.	变量环境（Variable Environment）
	•	存放 var / let / const / function 的绑定
	•	TDZ 存放在 let/const
	2.	作用域链（Scope Chain）
	•	决定变量查找顺序
	•	当前上下文 → 外层上下文 → 全局
	3.	this 绑定
	•	函数执行时确定

⸻

执行上下文生命周期
	1.	创建阶段
	•	解析函数、变量，建立作用域链
	•	var 默认 undefined，let/const 在 TDZ
	2.	执行阶段
	•	代码按顺序执行，this 绑定完成

⸻

二、调用栈（Call Stack）

概念

栈 = 先进后出
执行上下文进入栈顶 → 执行 → 出栈

⸻

示例
function a() { console.log('a'); b() }
function b() { console.log('b'); c() }
function c() { console.log('c') }

a()

调用栈变化

栈底 → 栈顶
1. 全局上下文
2. a() 上下文入栈
3. b() 上下文入栈
4. c() 上下文入栈
执行 c 出栈
执行 b 出栈
执行 a 出栈
✅ 输出

a
b
c

⸻

三、Event Loop（事件循环）

JS 是单线程
	•	所有 JS 代码在同一个线程执行
	•	异步通过 任务队列 + 事件循环完成

⸻

任务分类

类型
队列
执行时机
宏任务 (MacroTask)
setTimeout / setInterval / I/O / script
每轮循环的主任务
微任务 (MicroTask)
Promise.then / queueMicrotask
当前宏任务执行结束立即执行


⸻

执行顺序口诀

执行栈空 → 执行微任务队列 → 执行下一个宏任务


⸻

示例 1：宏任务 vs 微任务

console.log('start')

setTimeout(() => console.log('timeout'), 0)
Promise.resolve().then(() => console.log('promise'))

console.log('end')
输出顺序

start
end
promise
timeout
原因
	1.	script 是宏任务 → 执行 start / end
	2.	微任务队列 → promise
	3.	宏任务队列 → timeout

⸻

示例 2：多层微任务
Promise.resolve().then(() => {
  console.log(1)
  Promise.resolve().then(() => console.log(2))
})
console.log(3)

输出
3
1
2
原因
	•	微任务会把内部微任务加入队列 → 轮询执行完毕

⸻

四、JS 执行顺序总图解

全局执行上下文入栈
↓
同步代码执行（栈内）
↓
执行完毕栈空 → 检查微任务队列
↓
微任务队列清空 → 再执行下一个宏任务
↓
重复循环

五、面试高频追杀题

❓ 为什么 setTimeout 0 会在 Promise 之后？

因为 Promise.then 属于微任务，微任务比宏任务优先执行

❓ async/await 和 Promise.then 的微任务关系？
async function foo() { console.log('a'); await 1; console.log('b') }
console.log('start')
foo()
console.log('end')

✅ 输出：

start
a
end
b
	•	await 后面相当于微任务

❓ JS 真正的单线程？

是 JS 执行线程单线程，浏览器有多线程处理 I/O / UI

⸻

六、封神口诀（必背）

执行上下文 → 调用栈 → 同步代码 → 栈空 → 微任务 → 宏任务 → 循环

💥 理解这个顺序 = 异步题、闭包题、this 题一网打尽
