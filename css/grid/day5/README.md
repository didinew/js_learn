📅 CSS Grid · Day 05 学习计划（60–90 分钟）

🎯 Day 05 目标
	•	理解 隐式网格
	•	掌握 grid-auto-flow
	•	明白 dense 到底在“补什么洞”

⸻

⏱️ 0–10 分钟：什么是隐式网格？

一句话：

你没写出来，但 Grid 帮你生成的行 / 列

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

你只定义了列，行是隐式生成的 👀

⸻

⏱️ 10–25 分钟：控制隐式网格尺寸

1️⃣ 隐式行

grid-auto-rows: 80px;

2️⃣ 隐式列

grid-auto-columns: 1fr;

📌 面试加分：

grid-template-* 控制显式网格
grid-auto-* 控制隐式网格

⸻

⏱️ 25–45 分钟：grid-auto-flow（今天主角）

1️⃣ 默认行为

grid-auto-flow: row;


👉 一行一行往下排

⸻

2️⃣ 改成列优先

grid-auto-flow: column;

👉 一列一列往右排

⸻

3️⃣ dense（重点 🔥）

grid-auto-flow: row dense;

作用：

回头填空位

⚠️ 注意：
	•	可能打乱 DOM 顺序
	•	不适合强语义布局

⸻

⏱️ 45–60 分钟：dense 实战理解（脑补就行）

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: row dense;
}

某些 item 跨列后留下空洞
👉 dense 会把后面的 item 塞进去

📌 常见用途：
	•	图片墙
	•	瀑布流简化版

⸻

⏱️ 60–75 分钟：Grid 为什么“看起来很聪明”

你现在知道了👇
	•	显式 vs 隐式
	•	自动生成轨道
	•	自动填补空隙

👉 Grid 是 布局引擎，不只是语法

⸻

⏱️ 75–85 分钟：面试必考点

Q1：什么时候会产生隐式网格？

item 超出已定义的行 / 列时

Q2：dense 有什么副作用？

打乱视觉顺序，可能影响可访问性

Q3：grid-auto-flow 默认值？

row

