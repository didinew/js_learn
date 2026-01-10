🟢 Day 1：Vue3 响应式核心模型（Proxy）

⸻

一、Vue3 到底解决了什么问题？

Vue2 的根本问题（必须会讲）

Vue2 用的是：

Object.defineProperty(obj, key, {
  get() {},
  set() {}
})
❌ 致命缺陷：
	•	不能监听 新增 / 删除属性
	•	不能直接监听 数组索引 / length
	•	初始化成本高（递归遍历）

📌 所以 Vue2 才有：
	•	$set
	•	$delete
	•	数组 hack 方法

⸻

二、Vue3 为什么选择 Proxy？

Vue3 核心一句话：

用 Proxy 代理整个对象，而不是劫持某个属性

const state = new Proxy(target, {
  get(target, key) {},
  set(target, key, value) {}
})

✅ Proxy 带来的本质提升：

能力
Vue2
Vue3
新增属性
❌
✅
删除属性
❌
✅
数组索引
❌
✅
惰性代理
❌
✅
性能
一般
更好


⸻

三、Vue3 响应式的「三件套」

记住这三个名字，后面 30 天都在用

1️⃣ effect（副作用）

effect(() => {
  console.log(state.count)
})

📌 作用：
	•	告诉 Vue：这段函数依赖响应式数据


⸻

2️⃣ track（依赖收集）

get(target, key) {
  track(target, key)
}

📌 作用：
	•	记录：哪个 effect 用了哪个 key

⸻

3️⃣ trigger（触发更新）

set(target, key, value) {
  trigger(target, key)
}

📌 作用：
	•	数据变化 → 执行对应 effect

⸻

🔁 整体流程（必须会画）

effect(fn)
   ↓
fn 读取 state.xxx
   ↓
Proxy.get → track
   ↓
依赖表：target.key → effect
   ↓
state.xxx = newValue
   ↓
Proxy.set → trigger
   ↓
重新执行 effect


⸻

四、为什么 Vue3 响应式是“自动的”？

关键点一句话：

Vue 在 get 时“偷偷记账”，在 set 时“精准通知”

你不需要：
	•	手动订阅
	•	手动发布
	•	手动刷新视图

⸻

五、Vue3 的一个重要设计思想（高分点）

为什么是“惰性响应”？


const state = reactive({
  a: { b: { c: 1 } }
})
👉 只有当你访问 a.b.c 时，才会被 Proxy 包装

📌 好处：
	•	初始化更快
	•	内存占用更低

⸻

六、Day 1 面试标准答案（直接背）
Vue3 为什么用 Proxy？

✅ 满分回答：

Vue3 使用 Proxy 对整个对象进行代理，可以在 get/set 阶段统一拦截所有操作，天然支持新增、删除属性和数组变化；
同时采用惰性代理，只有访问到的对象才会被响应式化，性能和可维护性都优于 Vue2 的 Object.defineProperty。

⸻

let activeEffect = null

function effect(fn) {
  activeEffect = fn
  fn()
  activeEffect = null
}

const targetMap = new WeakMap()

function track(target, key) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect)
}

function trigger(target, key) {
  const depsMap = targetMap.get(target)
  const dep = depsMap?.get(key)
  dep?.forEach(fn => fn())
}

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      Reflect.set(target, key, value)
      trigger(target, key)
      return true
    }
  })
}

📌 不要求你默写，但要 读懂 + 能讲流程






