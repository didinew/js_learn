import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import React from 'react'
import Item from './Item'
import { fetchList, deleteItem } from './api'
import { useMergeList } from './hooks/useMergeList'
// Named export
import { List } from 'react-window';
// // 只部分渲染
// const Item1 = React.memo(({item, removeItem}: {item: string, removeItem: (item: string) => void}) => {
//   console.log('render item', item)
//   return (
//     <div>
//       {item}
//       <button onClick={() => removeItem(item)}>remove</button>
//     </div>
//   )
// })

// // 全部列表重新渲染
// const Item = ({item, removeItem}: {item: string, removeItem: (item: string) => void}) => {
//   console.log('render item', item)
//   return (
//     <div>
//       {item}
//       <button onClick={() => removeItem(item)}>remove</button>
//     </div>
//   )
// }

function App() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alive, setAlive] = useState(true);
  const [version, setVersion] = useState(0);

  const removeItem = useCallback(async (item: {name: string, id: number}) => {
    let backup;
    setList(prev => {
        backup = prev
        return prev.filter((i) => i.id !== item.id)
    })
    try {
      await deleteItem(item.id);
      // await initFetch();
      setVersion(prev => prev + 1);
    } catch (e) {
      // 回滚
      setList(backup);
      alert('删除失败，已回滚');
    }

  },[])

  const initFetch = () => {
    console.log('initFetch', version)
    fetchList().then(res => {
      if (!alive) return;
      setList(prev => {
        return useMergeList(prev, res);
      });
    }).catch(err => {
      if (!alive) return;
      setError(err);
    }).finally(() => {
      if (!alive) return;
      setLoading(false);
    })
  }

  useEffect(() => {
    initFetch();

    return () => {
      setAlive(false);
    };
  }, [version])

  if (loading) {
    return <div>loading...</div>
  }
  
  if (error) {
    return <div>error</div>
  }
  
  return (
    <div style={{height: 300, width: 300}}>
     <List
      rowComponent={({ index, style }) => (
        <Item key={list[index].id} style={style} item={list[index]} removeItem={removeItem} />
      )}
      rowCount={list.length}
      rowHeight={50}
      rowProps={{ list }} 
    />
    </div>
  )
}

export default App
