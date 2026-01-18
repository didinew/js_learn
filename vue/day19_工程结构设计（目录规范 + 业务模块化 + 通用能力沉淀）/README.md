🟠 Day 19：工程结构设计（目录规范 + 业务模块化 + 通用能力沉淀）

目标：
	•	建立清晰、可维护的项目目录结构
	•	按业务模块拆分，避免耦合
	•	提炼可复用通用能力，形成团队沉淀

⸻

一、项目目录规范（面试必背）

1️⃣ 前端目录分层参考


src/
 ├─ assets/        # 静态资源
 ├─ components/    # 通用组件（UI 库）
 ├─ views/         # 页面组件
 ├─ layout/        # 布局组件
 ├─ router/        # 路由配置
 ├─ store/         # Pinia / Vuex
 ├─ api/           # 接口请求封装
 ├─ utils/         # 工具函数
 ├─ directives/    # 自定义指令
 └─ hooks/         # 组合式函数

2️⃣ 命名规范（必背）
	•	文件名：小驼峰 + .ts / .vue
例：useFetchData.ts / LoginForm.vue
	•	组件名：大驼峰
	•	Store：useUserStore.ts

⸻

二、业务模块化（Day 19 核心）

1️⃣ 单模块结构
modules/
 ├─ user/
 │   ├─ components/
 │   ├─ store/
 │   ├─ api/
 │   └─ views/
 ├─ cart/
 └─ product/

 特点：
	•	模块自包含：组件、状态、接口同一个目录
	•	低耦合：模块间通过 store / props / emit 通信
	•	高复用：通用组件留在 components/

⸻

2️⃣ 目录拆分原则
	•	每个业务域独立
	•	UI / 业务逻辑分离
	•	通用工具抽离到 hooks/ 或 utils/

⸻

三、通用能力沉淀（Day 19 高阶能力）

1️⃣ 通用组件
	•	Input / Button / Modal / Table / Tabs
	•	支持受控/非受控、双模式、懒加载
	•	工程级设计 → 不耦合业务

2️⃣ 通用 Hook
	•	useFetch / usePagination / useForm / useWebSocket
	•	封装副作用、状态管理、异步处理

3️⃣ 通用工具
	•	防抖/节流
	•	日期格式化
	•	数据深拷贝 / merge

📌 原则：业务模块不引用业务之外的模块，只依赖通用能力

⸻

⸻

五、面试追杀题（必背）

Q：为什么要模块化？

降低耦合、增强可维护性、方便团队协作、易复用。

Q：业务模块和通用组件的区别？

业务模块依赖具体业务逻辑，通用组件与业务无关，可跨项目复用。

Q：如何设计可复用 Hook？

把副作用、状态、异步逻辑封装，接口统一，不依赖具体业务，支持可配置参数。

⸻


