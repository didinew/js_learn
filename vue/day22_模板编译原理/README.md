Day 22：模板编译原理

1️⃣ AST（抽象语法树）
	•	概念：
将模板字符串（HTML + 插值 + 指令）转换成树状结构，每个节点都是 AST Node。
	•	作用：
	1.	静态分析（比如静态节点、事件绑定、动态属性）
	2.	优化渲染（静态提升、Patch Flag）
	3.	生成渲染函数（render function）
	•	面试追问：
	•	Q: 为什么 Vue 先生成 AST？
A: 运行时不解析模板，提高性能；AST 可以做编译期优化。
	•	Q: AST 包含哪些节点信息？
A: type、tag、props、children、dynamicProps、loc 等。

⸻

2️⃣ 静态提升（Static Hoisting）
	•	概念：
把模板中不会变化的节点提升到渲染函数外部，只渲染一次。
	•	原理：
编译阶段标记静态节点 → render 函数直接引用 → Patch 阶段跳过比对
	•	举例：

  <div>
  <h1>Hello World</h1>
  <p>{{ dynamicText }}</p>
</div>

•	<h1> → 静态提升
	•	<p> → 动态节点

	•	面试追问：
	•	Q: 什么情况下节点不会被提升？
A: 包含动态绑定、事件、插值的节点。

⸻

3️⃣ Patch Flag
	•	概念：
编译阶段生成标记，告诉渲染器“哪些部分可能会更新”，避免整棵树 diff。
	•	常用类型：
	•	TEXT → 文本变化
	•	CLASS → class 动态
	•	STYLE → style 动态
	•	PROPS → 动态属性
	•	KEYED_FRAGMENT → key 数组
	•	原理：
	•	编译阶段标记 → runtime 渲染时只处理标记节点 → 提高性能
	•	面试追问：
	•	Q: PatchFlag + 静态提升有什么关系？
A: 静态节点不需要 PatchFlag；只有动态节点才标记 PatchFlag。

⸻

4️⃣ 渲染流程（简化图）

模板 (Template)
     │
     ▼
AST（抽象语法树）
     │
     ├─ 静态分析 → 静态提升（Hoisting）
     │
     ├─ Patch Flag 标记动态节点
     │
     ▼
Render Function（渲染函数）
     │
     ▼
VNode（虚拟 DOM）
     │
     ▼
Patch（比对更新）



