📘 Day 4｜对象 & 循环 · for…of / 对象遍历 / 拷贝

🎯 今日目标

- 掌握 for…of 与 for…in 的区别
- 熟练对象遍历：
- Object.keys()
- Object.values()
- Object.entries()
- 理解 浅拷贝 vs 深拷贝，能做简单拷贝操作

## ⏱ 建议用时：60~90 分钟

📚 今日学习内容

1️⃣ for…of vs for…in

| 循环方式 | 遍历对象 | 遍历数组/字符串 | 是否可用 break |
| --- | --- | --- | --- |
| for…of | ❌ 不行 | ✅ 可迭代对象 | ✅ |
| for…in | ✅ 遍历 key | ✅ 遍历索引 | ✅ |
```js
const arr = ["a", "b", "c"];

for (const val of arr) console.log(val) // a b c
for (const key in arr) console.log(key) // 0 1 2
```
记住：数组优先用 for…of，对象用 for…in 或 Object.keys()

2️⃣ 对象遍历

```js
const user = { name: "Tom", age: 18 };
```

// keys
Object.keys(user).forEach(key => console.log(key)) // name, age

// values
Object.values(user).forEach(val => console.log(val)) // Tom, 18

// entries
Object.entries(user).forEach(([key, val]) => console.log(key, val))

面试常问：entries 可以同时拿到 key + value

3️⃣ 浅拷贝 vs 深拷贝

浅拷贝（只复制第一层）

```js
const obj1 = { a: 1, b: { c: 2 } };
const copy = { ...obj1 };

copy.b.c = 99
console.log(obj1.b.c); // 99 ✅ 被修改
```

深拷贝（完全复制）

```js
const obj2 = JSON.parse(JSON.stringify(obj1));

obj2.b.c = 100

console.log(obj1.b.c); // 99 ✅ 原对象不受影响
```

注意：

- JSON 方法无法复制函数、undefined、循环引用
- 深拷贝可以用 lodash.cloneDeep() 或手写递归
