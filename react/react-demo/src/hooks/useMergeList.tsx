export const useMergeList = (prev: {id: number, name: string}[], serverList: {id: number, name: string}[]) => {
  const map = new Map(prev.map(item => [item.id, item]));

  return serverList.map(nextItem => {
    const prevItem = map.get(nextItem.id);
   // 1️⃣ 如果服务端字段完全一致，复用旧引用
    if (prevItem && shallowEqual(prevItem, nextItem)) {
      return prevItem;
    }

    // 2️⃣ 否则使用新对象
    return nextItem;
  }) 
}

function shallowEqual(a: {id: number, name: string}, b: {id: number, name: string}) {
  if (a === b) return true;
  if (!a || !b) return false;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  return aKeys.every(key => a[key as keyof typeof a] === b[key as keyof typeof b]);
}