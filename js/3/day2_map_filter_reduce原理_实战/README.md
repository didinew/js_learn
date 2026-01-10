Day 58：map / filter / reduce 原理 & 实战

# 先给结论（面试一句话版）

map / filter / reduce 本质都是 高阶函数
- 内部做 遍历
- 把 控制权交给回调函数
- 返回 新值（不修改原数组）
---
## map / filter / reduce 对比速记表

| 方法 | 做什么 | 返回什么 | 是否改变原数组 |
| --- | --- | --- | --- |
| map | 映射 | 新数组（等长） | ❌ |
| filter | 过滤 | 新数组（可能变短） | ❌ |
| reduce | 归并 | 任意值 | ❌ |
---
## map 原理（手写）

1️⃣ 官方用法

```js
const arr = [1, 2, 3];
const res = arr.map(x => x * 2);
```
// [2, 4, 6]
