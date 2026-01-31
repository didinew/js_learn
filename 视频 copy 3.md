一、基础必考（先不翻车）

1️⃣ 浏览器是如何播放 mp4 的？

标准回答：

浏览器通过 <video> 标签加载 mp4 文件，底层由浏览器的多媒体解码器解析。
mp4 是一种封装格式（container），内部通常包含：

	•	视频流（H.264 / H.265）
	•	音频流（AAC）
	•	时间戳、索引信息（moov box）

浏览器会：
	1.	解析 mp4 的 moov 信息
	2.	按时间轴解码音视频帧
	3.	同步渲染到屏幕和音频设备

📌 加分点：

mp4 本身不等于编码格式，它只是容器。

⸻

2️⃣ <video> 常用属性有哪些？

<video
  src="demo.mp4"
  controls
  autoplay
  muted
  loop
  preload="metadata"
></video>

重点解释：
	•	controls：显示控制条
	•	autoplay：自动播放（⚠️ 大多浏览器要求 muted）
	•	preload
	•	none：不预加载
	•	metadata：只加载头信息（推荐）
	•	auto：尽量加载

📌 面试官追问点：
👉 为什么移动端 autoplay 需要 muted？
因为浏览器限制非用户手势播放声音，防止骚扰。

⸻

3️⃣ mp4 为什么有时候拖动进度条很慢？

核心原因：
	•	mp4 的 moov 信息在文件尾部
	•	浏览器必须先下载完整文件才能 seek

解决方案：
	•	服务器端执行 fast start
	•	把 moov box 提前

	ffmpeg -i input.mp4 -movflags faststart output.mp4


📌 这是音视频面试的“经典秒杀题”

⸻

二、进阶重点（中高级必问）

4️⃣ 视频为什么要分片？

原因：
	•	大文件首屏慢
	•	网络波动
	•	移动端流量 & 断点续播

解决方案：
	•	HLS（.m3u8 + ts）
	•	DASH（mpd）

📌 mp4 是完整文件，HLS 是流媒体协议

⸻

5️⃣ HLS 和 mp4 的区别？

比
mp4
HLS
文件
单文件
分片
拖动
依赖 moov
天然支持
直播
❌
✅
CDN
一般
非常友好
延迟
高
可低延迟


一句话总结（面试神器）：

mp4 适合点播，小文件；HLS 适合长视频、直播、弱网环境。

⸻

6️⃣ 视频卡顿你怎么排查？

前端角度：
	•	是否 preload 合理
	•	是否视频过大 / 编码不兼容
	•	是否频繁切换 src
	•	是否 multiple <video> 同时播放

网络角度：
	•	CDN 是否命中
	•	Range 请求是否生效
	•	带宽是否不足

📌 加分回答：

会用 Chrome DevTools → Media / Network 观察 buffer 和 range 请求

⸻

三、播放器相关（很爱问）

7️⃣ 原生 <video> 有什么缺点？
	•	UI 不可控
	•	兼容性差
	•	HLS 需额外支持（PC 不原生支持 m3u8）

👉 所以才有：
	•	video.js
	•	hls.js
	•	xgplayer
	•	阿里云 / 腾讯云播放器

⸻

8️⃣ 前端怎么播放 m3u8？

if (Hls.isSupported()) {
  const hls = new Hls()
  hls.loadSource('test.m3u8')
  hls.attachMedia(video)
}

📌 面试官追问：

为什么 Safari 不需要 hls.js？
因为 Safari 原生支持 HLS

⸻

四、性能 & 实战题（高分区）

9️⃣ 视频首帧慢怎么优化？
	•	preload="metadata"
	•	首屏用低码率
	•	封面 poster
	•	服务端 faststart
	•	CDN + Range

⸻

🔟 视频如何防盗链 / 防下载？

能说清楚就够了：
	•	Referer 校验
	•	Token 鉴权 URL
	•	m3u8 + ts 分片
	•	后端动态签名

📌 注意：
前端无法真正防下载，只能提高成本

⸻

五、终极一句话总结（面试收尾用）

前端主要关注视频加载方式、解码兼容性、首屏体验和网络优化，
真正的性能瓶颈通常在编码、CDN 和流媒体协议选择上。


