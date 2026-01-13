// utils/mockSearch.js
export function mockSearchApi(keyword) {
  const fakeDatabase = [
    {
        id: 1,
        name: 'Apple'
    },{
        id: 2,
        name: 'Banana'
    },{
        id: 3,
        name: 'Orange'
    },{
        id: 4,
        name: 'Grapes'
    },{
        id: 5,
        name: 'Peach'
    },{
        id: 6,
        name: 'Pineapple'
    },{
        id: 7,
        name: 'Mango'
    },{
        id: 8,
        name: 'Strawberry'
    },{
        id: 9,
        name: 'Blueberry'
    }
  ]

  return new Promise((resolve, reject) => {
    const delay = Math.random() * 300 + 200 // 200~500ms延迟
    setTimeout(() => {
      const result = fakeDatabase.filter(item =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      )
      resolve(result)
    }, delay)
  })
}