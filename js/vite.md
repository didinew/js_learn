❶ Vite 是不是完全不打包？

❌ 错误答法（必挂）

是，Vite 不打包

✅ 满分答法

开发环境不打包，生产环境仍然打包（Rollup）
Vite 只是把打包这一步延后到 build 阶段

📌 面试官判断点： 是否理解 dev / build 本质差异

⸻

❷ Vite 为什么必须使用 ES Module？

❌

因为 ES Module 比 CommonJS 快

✅

因为 浏览器原生支持 ESM
Vite 利用浏览器解析 import 的能力，实现 按需编译

📌 挂点： 把“快”当本质

⸻

❸ Vite 的 HMR 和 Webpack 有什么本质区别？

❌

Vite 更快

✅

Webpack HMR 基于 bundle 更新
Vite HMR 基于 模块更新（ESM graph）

📌 关键词必须出现：
	•	模块级
	•	精确更新
	•	不重建入口

⸻

❹ 为什么 Vite 开发模式下一个 import 会发一个请求？

❌

因为没打包

✅

因为浏览器在解析 type="module" 时
会 主动对每个 import 发起 HTTP 请求

📌 挂点： 不理解浏览器行为

⸻

❺ Vite 为什么生产环境不能继续用 ESM 直出？

❌

因为不好

✅

因为模块请求过多会导致 网络性能下降
所以需要 Rollup 进行 合并、Tree Shaking、压缩

📌 关键词： 请求数、性能

⸻

❻ Vite 为什么不用 Loader？

❌

因为插件更好

✅

因为 Vite 基于 ESM + 插件钩子
Loader 是 Webpack 的打包时代产物

📌 必说： 架构不同，不是优劣问题

⸻

❼ Vite 插件和 Rollup 插件有什么关系？

❌

差不多

✅

Vite 插件是 Rollup 插件的超集
在 Rollup 生命周期基础上，增加 dev server 能力

📌 挂点： 说不清“超集”

⸻

❽ 为什么 Vite 要用 esbuild，而不是 Babel？

❌

esbuild 更流行

✅

esbuild 用 Go 编写 + 多线程
专注转译，不做类型检查，速度远快于 Babel

📌 必杀词：
	•	Go
	•	并行
	•	不做 type-check

⸻

❾ Vite 能不能支持 IE？

❌

可以加插件

✅

默认不支持
因为 IE 不支持 ESM
需要 legacy 插件 + 额外 polyfill

📌 挂点： 忽略浏览器能力限制

⸻

❿ Vite 比 Webpack 强在哪？

❌（必挂）

哪都强

✅（满分）

开发体验更强（启动、HMR）
但 Webpack 在 生态、老项目、复杂构建 上更成熟

📌 面试官最怕： 无脑站队

⸻

🔥 终极一句话（背这个）

Vite 不是“更快的 Webpack”，而是“不在开发阶段打包的构建工具”。

⸻
