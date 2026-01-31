1. 页面结构优化（HTML & 前端）
	1.	语义化 HTML
	•	使用 <title>、<meta description>、<h1>~<h3> 标签清晰表达视频内容。
	•	<video> 标签合理使用 poster 属性和 controls 属性，方便抓取。
	2.	视频 Schema 标记
	•	使用 Schema.org VideoObject￼ 结构化数据：

	<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "视频标题",
  "description": "视频描述",
  "thumbnailUrl": "视频缩略图URL",
  "uploadDate": "2026-01-29",
  "duration": "PT2M30S",
  "contentUrl": "视频播放URL",
  "embedUrl": "视频嵌入URL"
}
</script>

•	搜索引擎可直接抓取视频信息，增加索引几率。

	3.	面包屑导航
	•	提升网站结构化清晰度，增加搜索引擎抓取效率。
	4.	SSR / 静态渲染
	•	视频站很多是单页应用（SPA），搜索引擎抓取 SPA 需要 SSR（Nuxt、Next.js）或者 prerender。
	•	否则 Google 可能抓不到视频内容，影响收录。

⸻

2. URL & 路径优化
	1.	静态 URL
	•	使用 /category/video-title 的形式，避免带参数的 URL 过长。
	2.	关键词优化
	•	视频标题、分类名可加入关键词。
	•	URL、title、h1 三者保持一致性。
	3.	分页优化
	•	对长视频列表，使用分页 URL /page/2，并加 rel="next"/"prev"。

⸻

3. 视频内容优化
	1.	视频标题
	•	以搜索关键词开头，简明清楚。
	•	避免堆砌关键词。
	2.	视频描述
	•	100~300 字，包含关键词、视频主题。
	•	可加时间轴（Timestamps）方便用户和搜索引擎理解视频内容。
	3.	缩略图
	•	高质量图片，吸引点击。
	•	用 <meta property="og:image"> 提供社交分享缩略图。

⸻

4. 页面加载性能
	1.	懒加载
	•	视频封面和视频列表采用懒加载。
	•	避免首屏卡顿，提高 Core Web Vitals 分数。
	2.	CDN 视频托管
	•	提升加载速度和稳定性。
	3.	压缩和优化图片
	•	尽量用 WebP / AVIF 格式。

⸻

5. 内部链接和推荐机制
	1.	相关推荐
	•	视频详情页底部推荐相关视频。
	•	提升页面停留时间，降低跳出率。
	2.	标签和分类
	•	为视频加标签，提高站内搜索和长尾关键词覆盖。

⸻

6. SEO Meta 标签
	1.	Title
	•	主关键词 + 副标题。
	2.	Meta Description
	•	描述视频内容，吸引点击。
	3.	Open Graph & Twitter Card
	•	用于社交媒体分享，提高曝光。

⸻

7. Sitemap 与 robots
	1.	视频 Sitemap
	•	独立视频 sitemap：

	<url>
  <loc>https://example.com/video/123</loc>
  <video:video>
    <video:title>视频标题</video:title>
    <video:description>视频描述</video:description>
    <video:thumbnail_loc>缩略图URL</video:thumbnail_loc>
    <video:content_loc>视频URL</video:content_loc>
    <video:duration>150</video:duration>
  </video:video>
</url>

	2.	Robots.txt
	•	确保 /video/ 页面可抓取。

⸻

8. 移动端优化
	1.	响应式页面
	•	视频列表和详情页在移动端适配良好。
	2.	AMP 或快速加载
	•	可以提升移动端收录和体验。

⸻

9. 社交和外链
	•	视频站 SEO 还依赖外部信号：
	•	视频分享到微信、微博、B站、Twitter 等。
	•	内链文章、博客引用视频。


