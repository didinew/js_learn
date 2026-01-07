
⸻

🟦 第 4 周学习计划：DOM & 事件机制（真实开发）

🎯 周目标
	•	能熟练操作 DOM（增删改查、批量操作、样式修改）
	•	精通事件机制（捕获 / 冒泡 / 委托 / stopPropagation / preventDefault）
	•	优化频繁 DOM 操作（重排 / 重绘理解 + requestAnimationFrame）
	•	能结合 Vue / React 做高性能事件绑定和动画
	•	面试中能清楚解释浏览器事件流、异步更新和性能优化策略



⸻

📅 周安排（7 天）

天数
主题
内容 & 实战
Day 1
DOM 树遍历与操作
querySelector / getElementById / children / parentNode / 批量操作
Day 2
样式操作 & 类名管理
classList / style / computedStyle / 批量修改样式
Day 3
事件冒泡与捕获
addEventListener 第三个参数，事件顺序实验，阻止传播
Day 4
事件委托实战
大列表点击、动态元素处理、性能优化
Day 5
重排 / 重绘理解
频繁操作 DOM 测试、offsetHeight/offsetWidth、transform 优化动画
Day 6
requestAnimationFrame & 动画优化
连续动画、拖拽优化、虚拟 DOM 原理落地
Day 7
真实开发综合练习
组合任务：动态列表 + 事件委托 + 批量操作 + 动画优化


⸻

🔧 核心工具 & API
	•	DOM 操作
	•	querySelector / querySelectorAll
	•	innerHTML / textContent / appendChild / removeChild
	•	classList / style / dataset
	•	事件机制
	•	addEventListener(event, fn, capture)
	•	stopPropagation() / preventDefault()
	•	target vs currentTarget
	•	事件委托模式
	•	性能优化
	•	批量操作 → DocumentFragment / innerHTML
	•	避免频繁读取 DOM 属性 → 缓存尺寸
	•	transform / opacity 替代 top/left
	•	requestAnimationFrame 优化动画

⸻

📌 真实开发案例练习
	1.	动态任务列表
	•	添加 / 删除 / 编辑任务
	•	支持大数据量（1000+ li）
	•	事件委托处理点击事件
	•	批量 DOM 操作优化
	2.	图片轮播 / 动画
	•	左右滑动切换图片
	•	CSS transform + requestAnimationFrame
	•	支持暂停 / 自动播放
	3.	表单验证 & 阻止默认事件
	•	阻止提交刷新
	•	校验输入格式
	•	提示信息动态显示 / 消失

⸻

✅ 本周检查点
	•	能手写冒泡 & 捕获 & 委托例子
	•	能分析 DOM 操作的重排 / 重绘
	•	能使用 requestAnimationFrame 优化动画
	•	真实开发场景能做到性能优化
	•	面试能解释 DOM 更新 / 事件流 / 异步队列
	