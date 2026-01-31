问题 1️⃣：HTML & CSS

HTML 中的 data-* 属性有什么作用？如何在 JS 中访问它？

data-* 属性是 HTML5 提供的自定义属性，用于在元素上存储自定义数据，不会影响页面显示，也不会被浏览器默认使用。

作用：
	1.	可以给 HTML 元素存储额外信息（比如 id、状态、配置等），方便 JS 获取。
	2.	不需要在 DOM 上额外创建全局变量或隐藏 input。

HTML 示例：

<div id="user" data-id="123" data-role="admin">张三</div>

JS 访问方式：

const userDiv = document.getElementById('user');

// 方法 1：dataset 属性（推荐）
console.log(userDiv.dataset.id);    // "123"
console.log(userDiv.dataset.role);  // "admin"

// 方法 2：getAttribute
console.log(userDiv.getAttribute('data-id'));   // "123"
console.log(userDiv.getAttribute('data-role')); // "admin"

注意点：
	•	data-* 属性名在 JS 中会自动转换为驼峰写法，例如 data-user-id → dataset.userId
	•	只能存储字符串，如果存对象或数组需要 JSON.stringify() 和 JSON.parse()

⸻

问题 2️⃣：CSS

解释 position: relative、absolute、fixed、sticky 的区别，以及它们的定位参照物是什么？


⸻

答案：CSS 定位（position）区别

	1.	static（默认值）
	•	元素按正常文档流排列，不受 top/right/bottom/left 影响。
	•	参照物：无，直接在文档流中。

	2.	relative（相对定位）
	•	元素仍占据文档流原来的位置，但可以通过 top/right/bottom/left 相对于自身原位置偏移。
	•	参照物：自身原来的位置。
	•	应用：微调位置，或者作为绝对定位的父元素（定位上下文）。

	3.	absolute（绝对定位）
	•	元素脱离文档流，不占原来的空间。
	•	可以通过 top/right/bottom/left 精确定位。
	•	参照物：最近的 非 static 定位祖先元素（relative、absolute、fixed、sticky 都算）。
	•	应用：弹窗、工具提示、徽章等。

	4.	fixed（固定定位）
	•	元素脱离文档流，不占空间。
	•	相对于 浏览器可视窗口（viewport） 定位，不随滚动条滚动改变位置。
	•	应用：导航条、回到顶部按钮、固定工具栏。
	
	5.	sticky（粘性定位）
	•	元素在 跨越某个阈值前表现为 relative，超过阈值时表现为 fixed。
	•	参照物：最近的 滚动祖先（overflow 不为 hidden/auto/scroll）或自身容器。
	•	应用：表头随滚动固定、粘性侧边栏。

问题 3️⃣：JavaScript 基础

解释 == 和 === 的区别，并举例说明什么时候会出现结果不同。


标准答案：
	1.	==（宽松相等 / 抽象相等）
	•	会 进行类型转换 再比较值是否相等。
	•	例子：

	1 == '1'       // true，字符串 '1' 会被转换为数字 1
0 == false     // true，false 会被转换为数字 0
null == undefined // true

	2.	===（严格相等）
	•	不做类型转换，值和类型必须完全一致才返回 true。
	•	例子：

	1 === '1'      // false，类型不同
0 === false    // false，类型不同
null === undefined // false，类型不同

💡 面试加分点：
	•	总结经验：尽量使用 === 避免类型转换带来的隐式错误。
	•	可以提到 Object.is() 与 === 的微小区别（NaN、-0）。


问题 4️⃣：函数 & 作用域

解释 闭包（Closure） 是什么，并举一个实际应用场景。


⸻

答案：闭包
	1.	概念：
闭包是 函数和其声明时的词法作用域组合。
换句话说，一个函数可以“记住”它创建时的外部变量，即使这个外部函数已经执行完毕。

	2.	示例代码：

	function makeCounter() {
  let count = 0;  // 外部变量

  return function() { // 闭包
    count++;
    return count;
  }
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

	•	这里返回的函数可以访问 makeCounter 的局部变量 count，即使 makeCounter 已经执行完。

	3.	实际应用场景：

	•	私有变量（数据封装）

	function createUser(name) {
  let age = 0; // 私有变量

  return {
    getName: () => name,
    getAge: () => age,
    birthday: () => { age++ }
  }
}

const user = createUser('张三');
user.birthday();
console.log(user.getAge()); // 1

	•	函数工厂（生成带参数的函数）
	•	缓存 / 柯里化 / 事件处理器

💡 面试加分点：
	•	闭包会增加内存消耗，容易造成 内存泄漏，需要注意生命周期。
	•	提到“函数 + 作用域 = 闭包”是面试常用表述。

	问题 5️⃣：异步 & Promise

请解释 Promise 的三种状态，以及 then、catch、finally 的作用，并举例。

我直接帮你整理标准答案：

⸻

答案：Promise 基础
	1.	三种状态：

	•	pending（进行中）：初始状态，既不是成功也不是失败。
	•	fulfilled（已成功 / resolved）：异步操作成功，产生一个值。
	•	rejected（已失败）：异步操作失败，产生一个错误原因。

状态只能从 pending → fulfilled 或 pending → rejected，且不可逆。

	2.	方法作用：

	•	then(onFulfilled, onRejected)
	•	注册成功回调和失败回调
	•	返回一个新的 Promise，可链式调用
	•	catch(onRejected)
	•	相当于 then(null, onRejected)，专门处理失败
	•	finally(onFinally)
	•	无论成功或失败都会执行
	•	不接收参数，常用于清理操作（如隐藏 loading）

	3.	示例代码：
	const p = new Promise((resolve, reject) => {
  const success = true;
  setTimeout(() => {
    if (success) resolve('操作成功');
    else reject('操作失败');
  }, 1000);
});

p.then(res => {
  console.log(res); // "操作成功"
})
.catch(err => {
  console.log(err); // 如果失败会走这里
})
.finally(() => {
  console.log('操作结束，无论成功或失败');
});



⸻

问题 6️⃣：DOM & 事件

请解释 事件委托 是什么，它有什么优势？并举一个实际例子。

我帮你整理标准答案：

⸻

答案：事件委托
	1.	概念：
事件委托是指 把父元素的事件处理函数绑定在父元素上，而不是每个子元素上，利用 事件冒泡 捕获子元素的事件。
	2.	优势：

	•	减少内存占用：不用给每个子元素绑定事件。
	•	动态元素支持：新增加的子元素自动具备事件处理能力。
	•	代码更简洁：统一管理事件逻辑。

	3.	示例代码：

	<ul id="list">
  <li>苹果</li>
  <li>香蕉</li>
  <li>橘子</li>
</ul>

const list = document.getElementById('list');

list.addEventListener('click', function(event) {
  const target = event.target; // 实际触发事件的元素
  if (target.tagName === 'LI') {
    console.log('你点击了：', target.textContent);
  }
});

问题 7️⃣：前端性能优化

请列出 前端常用的性能优化方法，并简单解释每一种场景。

我直接帮你整理标准答案：

⸻

答案：前端性能优化方法
	1.	减少 HTTP 请求
	•	合并 JS/CSS 文件，使用雪碧图、iconfont。
	•	场景：静态资源多，减少浏览器请求开销。
	2.	使用 CDN 加速
	•	将静态资源放在 CDN 上，提高加载速度。
	•	场景：全球访问，资源分发更快。
	3.	懒加载 & 按需加载
	•	图片、组件或模块在需要时才加载。
	•	场景：长列表、单页应用、首屏优化。
	4.	缓存策略
	•	浏览器缓存、Service Worker、HTTP 缓存。
	•	场景：不频繁变化的资源重复访问，提高加载速度。
	5.	压缩 & 打包
	•	JS/CSS/图片压缩，去掉空格、注释，使用 Webpack/Rollup 打包。
	•	场景：提高首屏加载性能。
	6.	前端渲染优化
	•	减少 DOM 操作：批量操作、使用 DocumentFragment。
	•	虚拟列表：长列表只渲染可视区域。
	•	避免不必要的重绘重排：CSS transform 替代 top/left 动画。
	•	防抖/节流：滚动、输入事件。
	7.	资源异步加载
	•	<script async> 或 <script defer>，模块按需加载。
	•	场景：保证首屏渲染速度。
	8.	图片优化
	•	使用 WebP/AVIF 格式、按需尺寸加载。
	•	场景：图片多的页面，如电商、社交媒体。
	9.	减少重渲染 & 计算量
	•	Vue/React：v-memo / useMemo / computed，避免无效渲染。
	•	原生 JS：缓存 DOM 查询、使用事件委托。


问题 8️⃣：浏览器原理 & 跨域

请解释 浏览器的同源策略 是什么，常见跨域解决方案有哪些？

我帮你整理标准答案：

⸻

答案：浏览器同源策略 & 跨域
	1.	同源策略（Same-Origin Policy）：

	•	定义：协议、域名、端口三者必须完全相同，才允许 JS 访问资源。
	•	目的是防止跨站脚本攻击（XSS）和数据泄露。

	例子：
页面 http://example.com:80/index.html
可以访问：
- http://example.com:80/data.json ✅
不能访问：
- https://example.com:80/data.json ❌（协议不同）
- http://api.example.com:80/data.json ❌（子域名不同）
- http://example.com:8080/data.json ❌（端口不同）

	2.	常见跨域解决方案：

	方案
原理
适用场景
CORS（跨域资源共享）
服务端设置 Access-Control-Allow-Origin
前后端分离，现代浏览器首选
JSONP
利用 <script> 标签不受同源限制
GET 请求，老接口兼容
代理转发
前端请求本域名接口，由服务端转发到目标域
解决所有类型请求（GET/POST）
window.postMessage
跨文档通信（iframe）
父子/跨窗口通信
document.domain
仅限二级域名相同的情况
老式页面间通信
WebSocket
不受同源限制
实时通信场景


问题 9️⃣：前端路由 & SPA

请解释 前端路由 是什么，hash 模式和 history 模式 有什么区别？

我帮你整理标准答案：

⸻

答案：前端路由
	1.	概念：

	•	前端路由是 在浏览器端管理 URL 地址和页面视图的映射，实现单页应用（SPA）的页面切换而无需刷新整个页面。
	•	核心原理：监听 URL 改变 → 根据 URL 渲染对应组件/视图。

	2.	hash 模式：

	•	URL 中使用 #（哈希）标记，如 http://example.com/#/home
	•	特点：
	•	变更哈希不会触发页面刷新
	•	支持所有浏览器
	•	不需要服务端支持
	•	缺点：URL 不够美观

	3.	history 模式：

	•	使用 HTML5 的 History API (pushState / replaceState)
	•	URL 没有 #，如 http://example.com/home
	•	特点：
	•	URL 美观，支持前进后退
	•	需要服务端配置重定向（否则刷新会 404）
	•	缺点：
	•	IE9 以下不支持
	•	服务端必须配置 fallback 到 index.html

	4.	示例：

	// Hash 模式
window.addEventListener('hashchange', () => {
  console.log('当前 hash:', location.hash);
});

// History 模式
window.addEventListener('popstate', () => {
  console.log('当前路径:', location.pathname);
});


问题 10️⃣：浏览器缓存 & HTTP

请解释 强缓存 和 协商缓存 的区别，并举例说明。

我帮你整理标准答案：

⸻

答案：浏览器缓存
	1.	强缓存（Strong Cache）：

	•	定义：浏览器直接使用本地缓存，不向服务器发送请求。
	•	通过响应头控制：
	•	Cache-Control: max-age=3600 → 指定缓存有效时间
	•	Expires: Wed, 21 Oct 2025 07:28:00 GMT → HTTP 1.0 用法，已被 Cache-Control 替代
	•	特点：
	•	命中直接使用缓存
	•	不会发请求到服务器
	•	例子：

	Cache-Control: max-age=3600

	页面在 3600 秒内直接使用缓存，不再请求服务器。

	2.	协商缓存（Negotiated Cache / Conditional Cache）：

	•	定义：浏览器向服务器发送请求，通过条件请求验证缓存是否可用。
	•	通过请求头 + 响应头控制：
	•	Last-Modified / If-Modified-Since → 文件最后修改时间
	•	ETag / If-None-Match → 文件唯一标识
	•	特点：
	•	先发送请求到服务器
	•	如果未修改，服务器返回 304 Not Modified，浏览器使用缓存
	•	例子：

	// 浏览器请求
If-Modified-Since: Tue, 17 Jan 2026 10:00:00 GMT
If-None-Match: "abc123"

// 服务器响应
304 Not Modified

	3.	区别总结：

	特性
强缓存
协商缓存
是否发送请求
不发送
发送条件请求
响应码
200（缓存直接命中）
304（未修改）
控制方式
Cache-Control / Expires
Last-Modified / ETag


	•	强缓存优先于协商缓存
	•	实际项目中常结合使用，Cache-Control 设置合理的过期时间 + ETag/Last-Modified 做二级校验
	•	可提到静态资源（JS/CSS/图片）用强缓存，接口数据用协商缓存

	
