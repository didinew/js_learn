import React from "react"

const Item = React.memo(({style, item, removeItem}: {style: React.CSSProperties, item: {name: string, id: number}, removeItem: (item: {name: string, id: number}) => void}) => {
  console.log('render item', item)
  return (
    <div style={{...style, height: 50}}>
      {item.name}
      <button onClick={() => removeItem(item)}>remove</button>
    </div>
  )
})

export default Item