WebSocket 与 HTTP 的区别
1️⃣ 通信方式
特性
HTTP
WebSocket
通信模式
请求-响应（Request-Response）
全双工（Full-Duplex），客户端和服务端都可以主动发送消息
连接状态
无状态，每次请求都需要新建 TCP 连接（HTTP/1.1 可以复用 TCP，但仍是请求响应）
长连接，一旦建立就一直保持，直到显式关闭
是否保持连接
否（短连接）
是（长连接）


理解：
HTTP 就像你去餐厅点餐，每次都需要重新进门；WebSocket 就像开了一个聊天室，一旦进入就可以随时发送和接收消息。

⸻

2️⃣ 建立连接
性
HTTP
WebSocket
握手方式
每次请求都独立，无握手
需要一次 HTTP/HTTPS 握手升级（Upgrade: websocket），之后切换到 TCP 长连接
协议
HTTP/HTTPS
ws:// 或 wss://（基于 TCP）

理解：
WebSocket 其实是先走一次 HTTP 请求，然后升级协议变为 TCP 长连接。


⸻

3️⃣ 数据传输


特性
HTTP
WebSocket
数据格式
文本（HTML/JSON/XML 等）、二进制（文件、图片）
文本或二进制都支持，更高效的帧（frame）传输
开销
每次请求都带 header（较大）
握手后，数据包 header 很小，传输效率高
是否有延迟
有（每次请求都要重新建立 TCP / HTTP 请求头开销）
低延迟，适合实时通信

理解：
HTTP 请求就像每次邮寄信件都写上完整地址和信封；WebSocket 建立好信箱后，直接投入信件，快且省纸。


⸻

4️⃣ 使用场景

HTTP
WebSocket
页面加载、RESTful API、表单提交
实时聊天、股票行情、游戏、IoT 设备实时数据
请求频率低，延迟不敏感
请求频率高，延迟敏感，双向通信

5️⃣ 总结对比（核心面试点）
	•	HTTP：短连接、单向、请求-响应模式、适合静态/动态请求
	•	WebSocket：长连接、双向、低延迟、适合实时通信

⸻

💡 面试官追问点：
	1.	为什么 WebSocket 比 HTTP 更适合实时通信？
	•	因为它是全双工长连接，数据可以随时推送，无需每次建立连接和请求头开销。
	2.	HTTP/2 和 WebSocket 的区别？
	•	HTTP/2 是多路复用（一个 TCP 连接可以并发请求多个 HTTP），但仍是请求-响应模式；WebSocket 是真正的双向实时通信。
	3.	WebSocket 如何保证安全？
	•	使用 wss://，基于 TLS 加密，类似 HTTPS。

