Day 26：SSR（Server-Side Rendering）与 Hydration

1️⃣ SSR 概念
	•	定义：在服务端生成完整 HTML，发送给客户端，而不是只发送 JS，然后客户端渲染。
	•	作用：
	1.	首屏渲染快 → 用户更快看到页面
	2.	SEO 友好 → 搜索引擎抓取完整内容
	3.	数据预取 → 服务端直接渲染带数据的页面
	•	面试追问：
	•	Q: SSR 和 CSR 的区别？
A:
	•	CSR（Client-Side Rendering）：浏览器解析 JS → 渲染 DOM → 首屏慢
	•	SSR（Server-Side Rendering）：服务器生成 HTML → 浏览器直接显示 → 首屏快

⸻

2️⃣ Hydration 概念
	•	定义：客户端接管 SSR 渲染的 HTML，使其变成可响应的 Vue 应用。
	•	原理：
	1.	服务端 HTML 已存在，VNode 与 DOM 对应
	2.	Vue 创建客户端 VNode 树
	3.	使用 patch 比对 DOM → 复用已有节点，绑定事件和响应式数据
	•	面试追问：
	•	Q: Hydration 为什么比重新渲染快？
A: 复用了已有 DOM，只绑定事件和响应式，不生成新的节点。
	•	Q: Hydration 会有问题吗？
A:
	•	不匹配 DOM → 报错或重新渲染
	•	动态内容和服务端生成内容差异可能导致 hydration 警告

⸻

3️⃣ SSR 渲染流程

服务端
   │
   ▼
模板 + 数据 → Render Function
   │
   ▼
生成 HTML 字符串
   │
   ▼
发送到客户端

4️⃣ Hydration 客户端流程

客户端
   │
   ▼
接收 SSR HTML
   │
   ▼
创建 VNode 树
   │
   ▼
patch(VNode, SSR DOM)
   │
   ├─ 绑定事件
   ├─ 绑定响应式
   └─ 重用已有 DOM

  