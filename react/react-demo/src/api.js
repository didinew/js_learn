// api.js
export function fetchList() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 1000 }, (_, i) => ({
          id: i,
          name: `Item ${i}`
        }))
      );
    }, 800);
  });
}

export function deleteItem(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟 10% 失败率
      Math.random() > 0.1 ? resolve() : reject();
    }, 300);
  });
}