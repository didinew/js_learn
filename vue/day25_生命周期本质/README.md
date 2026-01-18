
⸻

Day 25：生命周期本质

1️⃣ 生命周期概念
	•	定义：组件从创建到销毁经历的各个阶段，对应不同的钩子函数。
	•	Vue 3 生命周期钩子：

	beforeCreate → created → beforeMount → mounted → 
beforeUpdate → updated → beforeUnmount → unmounted

	•	作用：
	1.	控制组件初始化逻辑
	2.	数据获取与渲染时机
	3.	清理资源（定时器、订阅等）

⸻

2️⃣ 生命周期与 effect 的关系
	•	Vue 3 本质上：
	•	生命周期钩子 = 特定场景下注册的 effect / watchEffect
	•	原理：
	1.	setup() → 执行响应式初始化
	2.	onMounted → effect 注册，DOM 渲染完成后执行
	3.	onUnmounted → 清理 effect / 副作用
	•	面试追问：
	•	Q: 生命周期钩子本质是什么？
A: effect 封装 + 特定执行时机（挂载、更新、卸载）
	•	Q: 父子组件生命周期顺序？
A: 父先子后（挂载），子先父后（卸载）

⸻

3️⃣ 生命周期阶段原理

阶段
原理
典型用途
beforeCreate
响应式系统未初始化
初始化 data / props 不可用
created
响应式系统已初始化
获取数据、调用方法
beforeMount
template 编译 → render 函数
还未挂载 DOM
mounted
DOM 挂载完成
操作真实 DOM / 第三方库初始化
beforeUpdate
响应式数据变化，DOM 未更新
可做状态记录
updated
DOM 已更新
做后续副作用操作
beforeUnmount
卸载前
清理事件监听、定时器
unmounted
组件已卸载
完全销毁资源



⸻

4️⃣ 面试追问扩展
	•	Q: Vue 生命周期和 React 的 useEffect 有什么区别？
A: Vue 生命周期明确区分挂载/更新/卸载阶段；React useEffect 可组合依赖数组控制执行时机。
	•	Q: 生命周期钩子顺序影响性能吗？
A: 父组件钩子先触发 → 子组件挂载顺序 → 复杂组件树中要注意批量更新与 nextTick

⸻

5️⃣ 渲染流程图（简化）

组件实例化
       │
   beforeCreate
       │
     created
       │
   beforeMount
       │
     render() → VNode
       │
     mounted
       │
   数据更新 → beforeUpdate
       │
     re-render → updated
       │
   卸载组件 → beforeUnmount
       │
     unmounted

	 