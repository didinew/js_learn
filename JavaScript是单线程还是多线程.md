第 1 题（热身即杀）

说清楚：JavaScript 是“单线程”还是“多线程”？
不要一句话带过。
要求你同时解释：
1️⃣ JS 执行栈
2️⃣ Web APIs
3️⃣ 宏任务 / 微任务
4️⃣ 为什么还能“并发”

JavaScript 本身是“单线程”的，但它可以通过事件循环机制实现并发效果。

我从 4 个层面解释：

⸻

① JS 是单线程，指的是什么？

指的是：JS 引擎在同一时间，只能执行一个任务。
	•	JS 只有 一个主线程
	•	同一时刻只会有 一个执行栈（Call Stack）
	•	同步代码必须一行一行执行，不能并行

👉 这是为了：
	•	避免多线程同时操作 DOM 造成数据竞争
	•	保证执行顺序的确定性

⸻

② 那异步是怎么做到的？—— Web APIs

JS 本身不处理异步。

👉 异步能力来自宿主环境（浏览器 / Node）提供的 Web APIs

比如：
	•	setTimeout
	•	fetch / xhr
	•	DOM 事件
	•	Promise（底层仍依赖宿主）

流程是：
	1.	同步代码进 执行栈
	2.	遇到异步任务
	3.	交给 Web APIs 处理
	4.	JS 线程继续执行后续同步代码

👉 JS 主线程 不会被阻塞

⸻

③ 宏任务 / 微任务是怎么参与的？

异步完成后，不是立刻执行回调，而是进入任务队列：

🟦 宏任务（Macro Task）
	•	setTimeout
	•	setInterval
	•	DOM 事件
	•	MessageChannel
	•	script（整体代码）

🟨 微任务（Micro Task）
	•	Promise.then / catch / finally
	•	MutationObserver
	•	queueMicrotask

⸻

④ 事件循环（Event Loop）核心规则

事件循环的执行顺序是：
执行一个宏任务（通常是主脚本）
→ 清空所有微任务
→ 渲染（浏览器）
→ 执行下一个宏任务
→ 再清空微任务
→ …
👉 微任务永远比宏任务优先级高

⸻

⑤ 那为什么说 JS 能“并发”？

因为：
	•	异步任务可以 同时在 Web APIs 中执行
	•	JS 主线程只负责：
	•	执行同步代码
	•	按顺序取回调执行

所以：

👉 JS 是单线程执行，多线程协作

这是：
	•	并发（Concurrent）
	•	❌ 不是并行（Parallel）

⸻

🧠 一句话总结（压轴）

JS 执行是单线程的，但通过事件循环 + 任务队列 + Web APIs，实现了非阻塞的并发模型。

⸻
🔥 面试官 100% 会追问的 3 个问题（提前送你）

追问 1️⃣

为什么要区分宏任务和微任务？

为了保证 Promise 等高优先级逻辑能在同一轮事件循环内尽快执行，避免 UI 状态不一致。

⸻

追问 2️⃣

Promise 是不是多线程？

不是。Promise 的 then 回调是微任务，仍然在主线程执行。

⸻

追问 3️⃣

Node.js 的事件循环和浏览器一样吗？

不一样。Node 有多个阶段（timers、poll、check…），但“微任务优先”原则一致。

第 2 题｜必挂级 · 执行顺序压力题
（Promise + async/await + setTimeout 全混）

⸻

⚠️ 题目（不要急着看答案）

console.log('start');

setTimeout(() => {
  console.log('timeout');
}, 0);

async function foo() {
  console.log('foo start');
  await bar();
  console.log('foo end');
}

async function bar() {
  console.log('bar');
}

foo();

new Promise((resolve) => {
  console.log('promise executor');
  resolve();
}).then(() => {
  console.log('promise then');
});

console.log('end');


三、现在给你「满分标准答案」（你直接背）

⸻

✅ 正确执行顺序（最终答案）
start
foo start
bar
promise executor
end
promise then
foo end
timeout


⸻

四、逐步事件循环拆解（面试官最想听的）

⸻

🟦 第一轮：执行主脚本（第一个宏任务）
console.log('start');          // start
setTimeout(...)               // 注册宏任务 timeout
foo();
进入 foo：
console.log('foo start');     // foo start
await bar();
👉 执行 bar()（同步）：
console.log('bar');           // bar

👉 遇到 await：
	•	await 后面的代码 被拆成微任务
	•	等价于：

Promise.resolve().then(() => {
  console.log('foo end');
})


⸻

继续主线程：
new Promise((resolve) => {
  console.log('promise executor'); // promise executor（同步）
  resolve();
})
.then(() => {
  console.log('promise then');     // 微任务
});
console.log('end');           // end

⸻

🟨 主脚本执行完毕 → 清空微任务队列

微任务队列顺序：
	1.	promise then
	2.	foo end

执行：

promise then
foo end

⸻

🟥 执行下一个宏任务
timeout

⸻

五、await 一句话必杀总结（你刚才缺的）

await 会立即执行后面的函数，但会把后续代码拆成一个微任务。

❌ await 不是等
✅ await 是 让出线程 + 微任务续执行

如果把 await bar() 改成 await Promise.resolve()，输出顺序会变吗？为什么？

✅ 标准满分回答

输出顺序不会变。

原因是：

await Promise.resolve() 和 await bar() 在事件循环层面的行为是一样的。

⸻

🧠 核心解释（分 3 层）

① await 的本质

await 本质等价于：
Promise.resolve(x).then(() => {
  // await 后面的代码
})
所以：
	•	不管 await 后面是
	•	普通值
	•	已 resolve 的 Promise
	•	同步函数返回值
	•	await 后面的代码都会进入微任务队列

⸻

② 对比两种写法

情况一：await bar()
await bar();
console.log('foo end');
	•	bar() 同步执行
	•	console.log('bar') 立刻打印
	•	foo end → 微任务

⸻

情况二：await Promise.resolve()
await Promise.resolve();
console.log('foo end');
	•	Promise.resolve() 同步返回一个已完成的 Promise
	•	JS 仍然会让出当前执行栈
	•	foo end → 微任务

⸻

③ 为什么顺序不变？

因为：
	•	await 一定会切微任务
	•	微任务执行顺序只与 注册先后顺序 有关
	•	两种写法中：
	•	foo end 的微任务注册时机相同
	•	所以整体输出顺序不变

⸻

📌 一句话压轴总结（必背）

不管 await 后面跟什么，await 都会强制把后续代码放进微任务队列。

🔥 面试官常见反杀追问（送你）

如果面试官继续追：

那 await 后面如果是一个真正异步的 Promise 呢？比如 setTimeout 包一层？

你可以秒答：

那就不是“切一次微任务”了，而是等 Promise 进入 resolve 后，再把后续逻辑放进微任务队列。

⸻


⸻

第 3 题｜闭包 & 垃圾回收（压力版）

⚠️ 题目

function createCounter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

const counter = createCounter();

counter();
counter();
✅ 满分回答（四点一次说清）

⸻

1️⃣ 有没有形成闭包？

有。
function createCounter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}
返回的函数 引用了外层函数作用域中的变量 count
因此形成闭包。

⸻

2️⃣ count 存在哪里？栈还是堆？

不在栈，在堆上。

更准确地说：

count 存在于 createCounter 对应的 词法环境（Lexical Environment） 中，
该环境被堆内存中的闭包对象所引用。

⸻

3️⃣ createCounter 执行完，为什么 count 没被销毁？

因为：
	•	createCounter 的执行上下文确实已经从调用栈弹出
	•	但它的词法作用域仍然被返回的函数引用
	•	在 GC 的可达性分析中：

    全局变量 counter
   ↓
函数对象（闭包）
   ↓
createCounter 的词法环境
   ↓
count
👉 count 是“可达的”，所以不会被回收

⸻

4️⃣ count 什么时候才会被 GC 回收？

当闭包不再可达时。

例如：
counter = null;

	•	全局不再引用该函数
	•	闭包函数不可达
	•	对应的词法环境也不可达
	•	count 才会被 GC 回收

⸻

三、你必须背的一句「GC 必杀总结」

垃圾回收不是看作用域结束，而是看对象是否还“可达”。

⸻

四、面试官一定会继续补刀的问题（下一题）

我现在继续追你一句（这句非常狠）：
function foo() {
  let a = 1;
  return function () {
    console.log(a);
  };
}

foo();
这里有没有内存泄漏？为什么？


