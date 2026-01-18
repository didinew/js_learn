第 1 题：渲染机制对比

问题：React 的虚拟 DOM diff 和 Vue 的响应式 + 模板编译机制有本质区别，你说说区别在哪？什么时候 Vue 渲染比 React 更快，什么时候 React 更快？

✅ 回答
	1.	渲染机制区别

	•	Vue3：
	•	使用 Proxy + 响应式依赖追踪，收集哪些组件依赖了哪个 state。
	•	状态变化时只触发相关依赖的组件更新。
	•	模板在编译阶段生成 优化渲染函数 + patch flags，静态节点不再重新渲染。
	•	React：
	•	使用 虚拟 DOM diff（Fiber），每次 state/props 变化都会生成新的虚拟 DOM，比较新旧树差异，再 patch 真 DOM。
	•	更新粒度取决于组件拆分 + key。

	2.	性能对比

	•	Vue 更快的场景：
	•	状态变化局部化，只有少数组件依赖变化。
	•	大量静态节点 + 小范围响应式更新（静态提升、patchFlag 优化）。
	•	React 更快的场景：
	•	大型列表或频繁更新的场景，通过 PureComponent / memo / useMemo 精准控制渲染。
	•	Fiber 架构支持渲染中断、分片更新，适合异步任务调度。

	3.	总结

Vue 强在 精确依赖追踪 + 编译优化，React 强在 可控渲染 + 大型异步调度。

⸻

第 2 题：状态管理对比

问题：React 推荐 useState / useReducer / Context，而 Vue 推荐 reactive / ref / Pinia，本质区别在哪？状态提升 / 跨组件共享场景，哪种更合适？

✅ 回答
	1.	本质区别

	•	React：
	•	单向数据流，状态更新通过 setState / dispatch，组件重新渲染。
	•	没有自动依赖追踪，衍生状态需要 useMemo。
	•	Vue：
	•	响应式系统，proxy 追踪依赖，状态变化自动触发依赖渲染。
	•	computed 可自动派生状态，无需手动 memo。

	2.	状态提升 / 跨组件共享

	•	局部状态：React 用 useState 或 useReducer 就够，Vue 用 reactive / ref。
	•	跨组件状态：
	•	React：useReducer + Context 或 Redux
	•	Vue：Pinia / provide/inject
	•	原则：状态提升到最小公共父组件，只有真正需要共享才提升。

	3.	总结

Vue 响应式更便捷、可自动追踪依赖；React 更明确，逻辑集中在 dispatch 上，更易于可控调试。

⸻

第 3 题：组件更新优化对比

问题：React 里用 memo / useMemo / useCallback，Vue 里用 computed / watch / v-memo，性能优化手段对比？

✅ 回答
	1.	优化手段原理

	•	React：
	•	memo：阻止无关 props 改变触发子组件渲染。
	•	useMemo / useCallback：缓存计算值或函数引用，避免无意义重新渲染或回调创建。
	•	Vue：
	•	computed：依赖追踪 + 缓存，只有依赖改变才重新计算。
	•	watch：副作用控制。
	•	v-memo：列表/子组件按 key 跳过重新渲染。

	2.	适用场景

	•	React：
	•	大型组件树、频繁渲染、回调函数传递多层。
	•	Vue：
	•	计算属性依赖复杂数据，列表渲染优化。

	3.	注意事项

	•	滥用 memo / useMemo / v-memo 会增加额外开销。
	•	核心原则：优化成本 < 性能收益。

⸻

第 4 题：生命周期 & 副作用对比

问题：React 的 useEffect / useLayoutEffect 与 Vue 的 watch / onMounted / onUpdated 在时机和副作用处理上有什么差异？

✅ 回答
	1.	执行时机
|               | React                                | Vue                                  |
|—————|———————————––|———————————––|
| Mount         | useEffect 微任务后执行               | onMounted 宏任务 / 组件挂载完成      |
| Update        | useEffect 每次依赖变化后执行         | watch / onUpdated，依赖变化触发      |
| Layout effect | useLayoutEffect 同步 DOM 更新前执行 | Vue 没有直接对应，需要 nextTick      |
	2.	清理函数

	•	React：useEffect 可返回 cleanup 函数
	•	Vue：watch 可返回 stop 或 flush cleanup，onUnmounted 清理副作用

	3.	选择原则

	•	DOM 读写前需要同步 → React useLayoutEffect / Vue nextTick
	•	异步副作用或数据请求 → React useEffect / Vue watch
	•	状态依赖变化触发逻辑 → React 依赖数组 / Vue watch 深度监听
