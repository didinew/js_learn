文件转为markdown 命令
```bash
node index.js ./js1
```
可选：如果你同时希望统一基本格式（空格、换行等），可以用 Prettier 对所有 .md 再做一次格式化：
```bash
npx prettier --write ./js1/**/*.md
```