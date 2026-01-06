二、两种主流权限方案（先给结论）

✅ 方案一：路由 Meta 权限控制（最常见）
{
  path: '/admin',
  component: Admin,
  meta: { roles: ['admin'] }
}

	•	优点：简单、直观
	•	缺点：路由表全量暴露（安全性依赖后端）

✅ 方案二：动态路由注入（中大型项目）🔥
	•	后端返回可访问路由
	•	前端 router.addRoute()
	•	真正做到 “你没权限，路由都不存在”

👉 生产推荐：方案二 + Meta 双保险

⸻

三、完整「动态路由权限」设计（标准答案）

1️⃣ 静态路由（任何人可访问）
// router/staticRoutes.ts
export const staticRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/',
    component: Layout,
    children: []
  }
]

⸻

2️⃣ 后端返回权限 & 路由结构
{
  "roles": ["admin"],
  "routes": [
    {
      "path": "/system",
      "component": "Layout",
      "children": [
        {
          "path": "user",
          "component": "system/user/index",
          "meta": { "title": "用户管理" }
        }
      ]
    }
  ]
}


⸻

3️⃣ 路由组件映射（关键点 🔥）
// router/asyncComponentMap.ts
export const componentMap = {
  Layout: () => import('@/layout/index.vue'),
  'system/user/index': () => import('@/views/system/user/index.vue')
}

⸻

4️⃣ 动态路由解析函数（面试高频）
function transformRoutes(routes) {
  return routes.map(route => {
    const r = {
      ...route,
      component: componentMap[route.component]
    }
    if (route.children) {
      r.children = transformRoutes(route.children)
    }
    return r
  })
}

⸻

5️⃣ 登录后动态注入路由
const asyncRoutes = transformRoutes(serverRoutes)

asyncRoutes.forEach(route => {
  router.addRoute(route)
})

⚠️ 注意：
addRoute 只能在 router 创建后调用


⸻

四、全局路由守卫（必背版）
router.beforeEach(async (to, from, next) => {
  const token = userStore.token

  if (!token && to.path !== '/login') {
    return next('/login')
  }

  // 已登录但没加载过权限
  if (token && !userStore.routesLoaded) {
    await userStore.fetchUserInfo()
    await userStore.generateRoutes()
    return next({ ...to, replace: true })
  }

  next()
})
⭐ 面试加分点
	•	replace: true 防止重复 history
	•	避免死循环跳转

⸻

五、刷新页面权限丢失怎么办？🔥

原因
刷新 → router 内存清空 → 动态路由丢失

标准解决方案

// main.ts
const routes = userStore.getSavedRoutes()
routes.forEach(r => router.addRoute(r))

	•	路由数据存 Pinia / localStorage
	•	刷新时重新 addRoute


⸻

六、按钮级权限（路由之外）

<button v-if="hasPermission('user:add')">新增用户</button>

function hasPermission(code: string) {
  return userStore.permissions.includes(code)
}
七、面试官常见追问 & 标准回答

❓ 为什么不用前端直接写死路由？

路由写死 → 无法支持权限变化 & 多角色系统

❓ addRoute 和 addRoutes 区别？
	•	addRoutes ❌（Vue2）
	•	addRoute ✅（Vue Router 4）

⸻

❓ 动态路由安全吗？

前端权限只做展示控制，真正安全必须靠后端接口鉴权

⸻

八、一句话「满分总结」（直接背）

Vue Router 权限控制本质是：
登录态校验 + 权限数据驱动路由生成 + 动态注入路由 + 刷新重建路由，
通常采用 后端返回路由配置 + 前端 addRoute 动态注册，配合 meta 做细粒度控制。

⸻


