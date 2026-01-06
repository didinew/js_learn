📘 Day 3｜数组进阶 · reduce（汇总 & 转换万能工具）

🎯 今日目标

- 理解 reduce 的本质：把数组“缩减”成一个值
- 能用 reduce 做：
- 数组求和 / 平均值
- 分组 / 计数
- 扁平化数组
- 理解 reduce 的 初始值和累加器

## ⏱ 建议用时：60～120 分钟

📚 今日学习内容

1️⃣ reduce 基础语法

```js
const arr = [1, 2, 3, 4]
const sum = arr.reduce((accumulator, currentValue) => {
return accumulator + currentValue

}, 0)

console.log(sum); // 10
```

解释：

- accumulator：累加器（存储中间结果）
- currentValue：当前元素
- 0：初始值（必须理解，否则很多 bug）

2️⃣ reduce 的核心思想

把一个数组“归约”为一个值（可以是数字、对象、数组…）

- 求和 / 平均值 ✅
- 统计 / 分组 ✅
- 扁平化 ✅
- 构造对象 ✅

3️⃣ reduce vs map/filter

| 场景 | 用谁 |
| --- | --- |
| 逐项转换生成新数组 | map |
| 条件筛选 | filter |
| 聚合 / 分组 / 扁平化 | reduce |