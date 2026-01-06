2️⃣ 熟练阶段（1~3个月）

目标：能写中等复杂的交互逻辑、理解浏览器运行机制。

学习内容：

- 数组与对象高级操作：map, filter, reduce, for...of
- ES6+ 新特性：解构赋值、模板字符串、默认参数、扩展运算符
- 异步编程：setTimeout, Promise, async/await
- 事件委托、事件冒泡与捕获
- DOM 操作优化与常用 API（classList、dataset、localStorage）
- 模块化（ES Module import/export）
- 基本调试技巧和错误排查

难度：中 → 高
建议：做一些小项目，如 TODO 列表、计时器、图片轮播。

2️⃣ 熟练阶段（1~3 个月）【进阶实战版】

🎯 阶段目标（判断是否达标）

完成这一阶段后，你应该能：

- 独立写 中等复杂交互逻辑
- 不再惧怕 Promise / async / await
- 理解 事件流 + 浏览器执行顺序
- 能读懂大部分业务 JS 代码
- 用 JS 写出 可维护的功能模块

---

① 数组 & 对象高级操作（高频必会）

必会 API（不是“知道”，是“会用”）

map // 转换数据
filter // 过滤数据
reduce // 汇总 / 聚合 / 扁平化
for...of // 遍历 iterable（数组 / Map / Set）

核心理解

- map / filter 不改变原数组
- reduce 是很多高级操作的底层
- for...of ≠ for...in

面试常考点

❓ map 和 forEach 区别？

- map 有返回值，forEach 没有，map 更适合数据转换

---

② ES6+ 新特性（每天都在用）

必熟语法

// 解构


```js
const { name, age } = user;
```

// 默认参数


```js
function fn(a = 1) {}
```


// 模板字符串
`hello ${name}`

// 扩展运算符
{ ...obj }
[...arr]

你要能解释清楚的

- 解构的 本质是按 key 取值
- 扩展运算符是 浅拷贝
- 模板字符串 ≠ 字符串拼接（可读性）

---

③ 异步编程（分水岭知识点）

学习顺序（别反）1. setTimeout（宏任务）2. Promise.then 3. async / await 4. 事件循环（Event Loop）

| 必懂模型（能画出来最好） | 同步代码 |
| --- | --- |
| ↓ | 微任务（Promise.then） |
| ↓ | 宏任务（setTimeout） |
面试送命题

❓ async/await 本质是什么？

- Promise + Generator 的语法糖

---

④ 事件机制（DOM 必考）

三个阶段 1. 捕获（capture）2. 目标（target）3. 冒泡（bubble）

事件委托（重点）
```js
ul.addEventListener('click', e => {
if (e.target.tagName === "LI") {

}
})
```
为什么用事件委托？

- 减少事件绑定数量
- 支持 动态 DOM

---

⑤ DOM 操作 & 性能意识

高频 API

el.classList.add/remove/toggle
el.dataset.id
localStorage.setItem()

性能优化意识（不是让你写算法）

- 避免频繁 DOM 操作
- 使用 DocumentFragment
- 合理缓存查询结果

---

⑥ 模块化（现代前端必需）

ES Module

export function fn() {}

```js
import { fn } from "./utils.js";
```

你要知道

- 一个文件就是一个模块
- 默认是 严格模式
- 现代框架全基于模块系统

---

⑦ 调试 & 排错能力（拉开差距）

必会技能

- console.log（结构化打印）
- Chrome DevTools
- Sources（断点）
- Network（请求）
- Application（localStorage）

## 排错思路（面试官最爱）1. 是否报错 2. 是否进入函数 3. 数据是否符合预期 4. 异步是否完成

🧩 推荐项目（不是随便写）

✅ TODO List（必做）

考察点：

- CRUD
- 事件委托
- localStorage
- 数据驱动 DOM

✅ 计时器 / 倒计时

考察点：

- setInterval / setTimeout
- 状态控制
- 清除定时器

✅ 图片轮播（进阶）

考察点：

- DOM 操作
- 事件绑定
- 边界处理
- 动画 / 状态管理

---

🧪 阶段自测（过了才算熟练）

你能不能不看资料回答这些：1. reduce 能做什么？2. 为什么事件委托性能好？3. Promise 为什么要有 then？4. async/await 如何捕获错误？5. DOM 操作为什么慢？
