// utils/mockSearch.js
// export function mockSearchApi(keyword) {
//   const fakeDatabase = [
//     {
//         id: 1,
//         name: 'Apple'
//     },{
//         id: 2,
//         name: 'Banana'
//     },{
//         id: 3,
//         name: 'Orange'
//     },{
//         id: 4,
//         name: 'Grapes'
//     },{
//         id: 5,
//         name: 'Peach'
//     },{
//         id: 6,
//         name: 'Pineapple'
//     },{
//         id: 7,
//         name: 'Mango'
//     },{
//         id: 8,
//         name: 'Strawberry'
//     },{
//         id: 9,
//         name: 'Blueberry'
//     }
//   ]

//   return new Promise((resolve, reject) => {
//     const delay = Math.random() * 300 + 200 // 200~500ms延迟
//     setTimeout(() => {
//       const result = fakeDatabase.filter(item =>
//         item.name.toLowerCase().includes(keyword.toLowerCase())
//       )
//       resolve(result)
//     }, delay)
//   })
// }



export function mockSearchApi(keyword, page = 1, pageSize = 1000) {
  return new Promise(resolve => {
    const total = 10000
    const list = Array.from({ length: total }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`
    }))
      .filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()))
      .slice((page - 1) * pageSize, page * pageSize)
    setTimeout(() => resolve(list), Math.random() * 200 + 100)
  })
}