🚦阶段一：核心概念（1 天就够）

目标：看到 Grid 代码就不慌

1️⃣ Grid 是什么
	•	二维布局（行 + 列）
	•	父容器：display: grid
	•	子元素：自动成为 grid item

2️⃣ 三个最核心的概念
	•	grid container
	•	grid item
	•	grid line / track / cell / area

面试常问：
👉 Grid vs Flex

	•	Flex：一维（行 或 列）
	•	Grid：二维（行 + 列）

⸻

🧱阶段二：基础 API 必会（1～2 天）

1️⃣ 定义行和列（必背）

.grid {
  display: grid;
  grid-template-columns: 100px 1fr 2fr;
  grid-template-rows: 50px auto;
}

重点记住：
	•	fr：剩余空间比例
	•	auto
	•	固定值（px / %）

⸻

2️⃣ 间距（比 flex 好用）

grid-gap: 10px;
/* 或 */
row-gap: 10px;
column-gap: 20px;


⸻

3️⃣ repeat + minmax（面试高频）
grid-template-columns: repeat(3, 1fr);

grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
👉 自适应布局神器

⸻

🎯阶段三：元素定位（2 天）

目标：随便摆，不靠 margin

1️⃣ 基于线定位

.item {
  grid-column: 1 / 3;
  grid-row: 2 / 4;
}

简写：

grid-column: 1 / span 2;


⸻

2️⃣ grid-area（强烈推荐）

.item {
  grid-area: 1 / 1 / 3 / 3;
}


顺序：

row-start / col-start / row-end / col-end

⸻

🧠阶段四：命名区域（写起来像布局图）

.container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }

📌 后台 / 管理系统必用
📌 面试官很爱

⸻

📐阶段五：对齐系统（别和 Flex 搞混）

容器级

justify-items: stretch | start | center;
align-items: stretch | start | center;

整个 Grid

justify-content
align-content

单个元素

justify-self
align-self


⸻

🚀阶段六：高级 & 实战（进阶）

1️⃣ 自动流向

grid-auto-flow: row | column | dense;

2️⃣ 隐式网格

grid-auto-rows: 100px;
grid-auto-columns: 1fr;


⸻

🧩阶段七：实战项目（必须做）

建议你直接做这 4 个：

1️⃣ 九宫格商品列表（自适应）
2️⃣ 后台 Layout（header / sidebar / main / footer）
3️⃣ 瀑布流简化版（Grid + auto-fill）
4️⃣ 卡片布局（不定高）

⸻

🎯面试速杀版（10 秒回答）

什么时候用 Grid？

👉 页面级布局、二维结构、整体骨架

什么时候用 Flex？

👉 组件内部、一维排列


