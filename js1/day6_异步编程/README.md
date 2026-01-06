---
📘 Day 6｜异步编程基础

setTimeout · Promise · async/await · Event Loop

🎯 今日目标
- 知道 JS 为什么需要异步
- 搞清：
- 同步 vs 异步
- 宏任务 vs 微任务
- 能写 Promise & async/await
- 不再被“执行顺序题”吓到

⏱ 建议用时：90～120 分钟（今天略重，但值）
---

① 为什么 JS 需要异步（先立认知）

JS 是 单线程 的

- 如果没有异步，页面会直接“卡死”

// 同步阻塞（假想）
sleep(5000)

```js
console.log("页面卡住");
```

所以：

- 耗时操作 → 异步
- JS 通过 事件循环（Event Loop） 协调执行

---

② setTimeout（宏任务）

```js
console.log(1);
```

setTimeout(() => {

```js
console.log(2);
```

}, 0)

```js
console.log(3);
```

输出顺序：
1
3
2

❗重点：

- setTimeout(fn, 0) 不是立即执行
- 它进入 宏任务队列

---

③ Promise（微任务）

```js
console.log(1);
```

Promise.resolve().then(() => {

```js
console.log(2);
```

})

```js
console.log(3);
```

输出：
1
3
2

## 但注意👇👇👇

④ 微任务 vs 宏任务（必考）

```js
console.log(1);

setTimeout(() => {


console.log(2);

}, 0)

Promise.resolve().then(() => {

console.log(3);

})


console.log(4);
```

输出顺序是：

1
4
3
2

规则（背下来）：

## 同步 → 微任务（Promise.then） → 宏任务（setTimeout）

⑤ async / await（语法糖本质）

async function test() {

```js
console.log(1);
await Promise.resolve();
console.log(2);
```

}

test()

```js
console.log(3);
```

输出：
1
3
2

解释：

- await 后面的代码相当于 Promise.then
- 本质：Promise + 微任务
