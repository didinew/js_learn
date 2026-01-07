🟦 Day 1｜DOM 树遍历与操作

🎯 今日目标
	•	能用 querySelector / getElementById / children / parentNode / nextSibling / previousSibling 遍历 DOM
	•	能做 增删改查操作：插入元素、删除元素、修改文本内容
	•	掌握 批量操作 的概念
	•	面试能说出 DOM 节点关系 & 常用操作

⸻

一、基础 DOM 查找
<div id="app">
  <ul class="list">
    <li>JS</li>
    <li>Vue</li>
    <li>React</li>
  </ul>
</div>

// 单个元素
const app = document.getElementById('app')
const list = document.querySelector('.list')
const firstItem = document.querySelector('li')

// 多个元素
const items = document.querySelectorAll('li') // NodeList

⸻

二、遍历 DOM
// NodeList 可以 forEach
items.forEach(item => console.log(item.textContent))

// children / parentNode / siblings
const ul = document.querySelector('ul')
console.log(ul.children)         // HTMLCollection
console.log(ul.parentNode)       // div#app
console.log(ul.firstElementChild) // 第一个 li
console.log(ul.lastElementChild)  // 最后一个 li

⸻

三、增删改查操作

// 创建元素
const li = document.createElement('li')
li.textContent = 'TS'

// 插入
ul.appendChild(li)       // 末尾添加
ul.insertBefore(li, ul.firstElementChild) // 插入到第一个前面

// 删除元素
ul.removeChild(ul.lastElementChild)

// 修改文本
ul.firstElementChild.textContent = 'JavaScript'

// 读取文本
console.log(ul.children[0].textContent)


⸻

四、批量操作优化（小技巧）

const fragment = document.createDocumentFragment()
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li')
  li.textContent = `Item ${i}`
  fragment.appendChild(li)
}
ul.appendChild(fragment) // 一次性操作，避免 1000 次重排

