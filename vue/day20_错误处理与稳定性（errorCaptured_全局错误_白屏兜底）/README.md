🟠 Day 20：错误处理与稳定性（errorCaptured / 全局错误 / 白屏兜底）

目标：
	•	能捕获组件、异步、全局错误
	•	做好白屏兜底和友好提示
	•	保证产品在异常情况下仍可用

⸻

一、Vue 错误处理全景图

Vue 错误主要分 3 类：

错误类型
捕获方式
场景
组件渲染错误
errorCaptured
template / render 出错
异步错误
try/catch / promise.catch
API 请求、异步操作
全局错误
app.config.errorHandler
未捕获异常、第三方库报错


核心思路：越早捕获，越局部化

⸻

二、组件级错误捕获：errorCaptured
export default {
  errorCaptured(err, vm, info) {
    console.log('组件错误', err, info)
    // 返回 false 阻止冒泡
    return false
  }
}

	•	捕获本组件及子组件错误
	•	可选择是否向上冒泡
	•	常用于局部兜底 UI

📌 场景示例：
	•	子组件渲染报错 → 父组件 fallback
	•	某个功能挂掉不影响全局页面

⸻

三、全局错误处理：app.config.errorHandler

app.config.errorHandler = (err, vm, info) => {
  console.error('全局错误', err, info)
  reportError(err) // 上报到监控系统
}

	•	捕获所有未处理的 Vue 错误
	•	配合监控系统 → 稳定性保障

⸻

四、异步错误处理（Day 20 核心）

1️⃣ Promise / async 错误

try {
  await fetchData()
} catch (err) {
  console.error('请求失败', err)
}

2️⃣ 全局 Promise 拦截（兜底）

window.addEventListener('unhandledrejection', event => {
  console.error('未捕获 Promise', event.reason)
})


⸻

五、白屏兜底策略

1️⃣ 页面级 fallback

<template>
  <div v-if="error">
    出错了，请刷新或重试
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script>
export default {
  data() { return { error: false } },
  errorCaptured(err) {
    this.error = true
    return false
  }
}
</script>

2️⃣ 全局兜底
	•	捕获 errorCaptured + errorHandler + window.onerror
	•	显示统一错误页 / toast

3️⃣ 异步兜底
	•	API 请求失败 → fallback 数据
	•	保证页面能渲染核心内容



⸻

七、面试追杀题（必背）

Q：Vue 组件渲染报错如何处理？

用 errorCaptured 捕获，可以局部兜底，防止影响父组件或全局。

Q：Vue 全局错误捕获怎么做？

app.config.errorHandler 捕获所有未处理异常，配合监控系统上报。

Q：异步请求失败如何兜底？

用 try/catch 或 unhandledrejection 捕获，提供 fallback UI 或默认数据，保证页面核心功能可用。

⸻
