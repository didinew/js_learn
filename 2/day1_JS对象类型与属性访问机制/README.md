Day 1：JS 对象类型与属性访问机制

目标

- 理解 JS 基本数据类型和对象类型
- 掌握对象属性的访问方式
- 为后续原型链与继承打基础

---

1️⃣ 理论部分

数据类型
JavaScript 的数据类型分两类：1. 原始类型（Primitive）

- String, Number, Boolean, undefined, null, Symbol, BigInt
- 特点：
- 不可变
- 按值传递 2. 引用类型（Reference）
- Object, Array, Function, Date, RegExp 等
- 特点：
- 可变
- 按引用传递

---

对象属性访问

```js
const obj = { name: "DiDi", age: 18 };
```

| // 点操作符                     | console.log(obj.name); // "DiDi" |
| ------------------------------- | -------------------------------- |
| // 方括号操作符（适合动态属性） | console.log(obj['age']); // 18   |
| const key = 'name';             | console.log(obj[key]); // "DiDi" |

✅ 注意点

- obj.key 访问的是固定的属性名 "key"
- obj[key] 可以动态访问变量名对应的属性
- 当访问不存在的属性时，返回 undefined

---

属性读写 & 添加
obj.gender = 'male'; // 添加新属性
obj.age = 19; // 修改属性
delete obj.name; // 删除属性

```js
console.log(obj); // { age: 19, gender: 'male' }
```

---

对象的内置方法

- Object.keys(obj) → 返回所有可枚举属性名数组
- Object.values(obj) → 返回所有属性值数组
- Object.entries(obj) → 返回 [key, value] 二维数组

```js
console.log(Object.keys(obj)); // ['age', 'gender']
console.log(Object.values(obj)); // [19, 'male']
console.log(Object.entries(obj)); // [['age', 19], ['gender', 'male']]
```
