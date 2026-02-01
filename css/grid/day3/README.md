📅 CSS Grid · Day 03 学习计划（60–90 分钟）

🎯 Day 03 目标
	•	掌握 grid-template-areas
	•	写出 可读性极强的布局代码
	•	能在面试中说出 为什么它比 grid-column 更好

⸻

⏱️ 0–10 分钟：一句话理解 Areas

grid-template-areas = 给布局“起名字”

你不是在写 CSS
👉 是在画布局示意图



⸻

⏱️ 10–30 分钟：核心语法（必须会）

1️⃣ 容器：定义区域

.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr 50px;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
}

规则（面试会考）👇
	•	每一行必须 列数一致
	•	区域名是字符串
	•	. 表示空白



⸻

2️⃣ 子元素：绑定区域

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }

📌 子元素的 grid-area
👉 不是坐标，是名字

⸻

⏱️ 30–50 分钟：完整 Demo（建议你敲）

HTML

<div class="layout">
  <header class="header">Header</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="main">Main</main>
  <footer class="footer">Footer</footer>
</div>

CSS

.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr 50px;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  gap: 12px;
}

.header  { grid-area: header; background: #6366f1; }
.sidebar { grid-area: sidebar; background: #22c55e; }
.main    { grid-area: main; background: #0ea5e9; }
.footer  { grid-area: footer; background: #64748b; }

👉 现在你写的是结构语义，而不是位置计算

⸻

⏱️ 50–65 分钟：. 空白区域（细节加分）

grid-template-areas:
  "header header"
  ".      main"
  "footer footer";

  作用：
	•	占位
	•	保持结构不变
	•	某些后台页特别好用

⸻

⏱️ 65–80 分钟：面试官最爱的对比题

❓为什么后台布局更适合用 grid-template-areas？

标准回答👇

因为它的代码和视觉结构高度一致，
可读性强、维护成本低，
改布局只需要改模板，不用动子元素。

🔥 这是加分答案，不是及格答案

⸻

⏱️ 80–90 分钟：Day 03 面试记忆点

Q1：. 在 areas 里是什么意思？

空白区域

Q2：子元素 grid-area 写的是什么？

区域名称，不是坐标

Q3：areas 的限制？

每行列数必须一致

⸻

📝 Day 03 作业（10 分钟）

自己写一个布局：

| header header header |
| nav    main   ads    |
| footer footer footer |

要求：
	•	用 grid-template-areas
	•	不允许用 grid-column

