🟢 Day 10：Router + KeepAlive + 异步组件高阶

🎯 目标
掌握 Vue Router 高阶用法、KeepAlive 缓存策略、异步组件加载机制，以及相关性能优化与面试必考点。

⸻

一、为什么要关注路由与缓存？
	•	大型 SPA 页面频繁切换 → 性能损耗 + 状态丢失问题
	•	KeepAlive + 异步组件能：
	1.	保持组件状态（表单、滚动条）
	2.	减少重复渲染
	3.	优化首次渲染性能
	4.	提升用户体验
	•	面试必考：路由缓存策略 + 异步组件加载原理

⸻

二、核心内容

1️⃣ 动态路由 & 嵌套路由

const routes = [
  {
    path: '/users',
    component: Users,
    children: [
      { path: ':id', component: UserDetail }
    ]
  }
]

	•	父子路由组合 → URL 显式映射组件
	•	面试问：嵌套路由的 props 如何传递？

	{ path: ':id', component: UserDetail, props: true }


⸻

2️⃣ KeepAlive 高阶用法

<KeepAlive include="UserDetail">
  <router-view />
</KeepAlive>

	•	include / exclude 控制缓存组件
	•	支持 max 限制缓存数量
	•	⚡ 面试点：
	•	生命周期钩子区别：mounted/unmounted vs activated/deactivated
	•	缓存组件状态保持方式

⸻

3️⃣ 异步组件 + Suspense


<script setup>
const AsyncComp = defineAsyncComponent({
  loader: () => import('./MyComponent.vue'),
  loadingComponent: Loading,
  errorComponent: ErrorComp,
  delay: 200,
  timeout: 3000
})
</script>

<template>
  <Suspense>
    <AsyncComp />
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>

	•	延迟加载 → 首屏性能优化
	•	fallback → 提示用户 loading
	•	errorComponent → 错误兜底

⸻

4️⃣ 路由守卫 & 权限控制

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) next('/login')
  else next()
})

	•	全局守卫 / per-route 守卫 / 组件内守卫
	•	高阶面试问：
	•	keep-alive 页面缓存与路由守卫结合问题
	•	异步组件加载过程中如何处理守卫

⸻

5️⃣ 性能优化技巧
	1.	KeepAlive 缓存关键页面 → 避免重复渲染
	2.	异步组件 + Suspense → 首屏快速渲染
	3.	路由懒加载 → chunk 分包，提升加载速度
	4.	避免 v-if 切换路由组件导致重复创建

⸻

三、面试高分模板
	1.	KeepAlive include / exclude 原理？

Vue 会缓存组件实例，切换时触发 activated/deactivated 生命周期，控制哪些组件缓存可通过 include/exclude 和 max 限制。

	2.	异步组件 + Suspense 机制？

defineAsyncComponent 延迟加载组件，Suspense 提供 fallback，占位 UI，loader 异步完成后渲染真实组件。

	3.	路由嵌套 + props 传递？

可以通过 props: true 或者函数式 props 将 route.params 或 query 注入子组件。

	4.	路由守卫的生命周期顺序？

全局 beforeEach → per-route beforeEnter → 组件内 beforeRouteEnter → afterEach

	5.	性能优化点？

KeepAlive 缓存、异步组件延迟加载、路由懒加载、避免重复 v-if 切换组件

⸻

四、实践示例

1️⃣ KeepAlive 缓存 tab 页面

<KeepAlive include="UserDetail,Dashboard">
  <router-view />
</KeepAlive>
	•	保留表单输入、滚动条状态
	•	切换 tab 不重新渲染

2️⃣ 异步组件 + Loading

<Suspense>
  <AsyncComp />
  <template #fallback>
    <div>Loading...</div>
  </template>
</Suspense>

	•	加载组件过程中显示 loading
	•	超时显示 errorComponent

3️⃣ 动态路由 + props

{ path: '/user/:id', component: UserDetail, props: route => ({ userId: route.params.id }) }

	•	子组件直接通过 props 获取路由参数
	•	避免在组件内使用 $route.params


⸻

✅ Day 10 核心总结

路由管理、缓存组件、异步组件加载是 SPA 高级玩法。理解这些，不仅能写高性能应用，还能在面试中回答 “缓存策略 + 异步加载 + 路由守卫” 的全套问题。
