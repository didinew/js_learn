const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

async function walk(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async e => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return p;
  }));
  return files.flat();
}

function isMd(p) {
  return p.toLowerCase().endsWith('.md');
}

function isCodeLine(line) {
  const l = line.trim();
  if (!l) return false;
  if (l.startsWith('#') || l.startsWith('- ') || l.startsWith('|')) return false;
  return /^(let|const|var|function|class|export\s+default|import\s|useEffect\(|watch(?:Effect)?\(|onMounted\(|Promise\.all|console\.log|return\b|if\s*\(|await\b|fetch[A-Z]?|AbortController\b)/.test(l);
}

function toHeading(line, idx) {
  const t = line.trim();
  if (/^一、/.test(t)) return '# ' + t.replace(/^一、\s*/, '');
  if (/^(二、|三、|四、|五、|六、)/.test(t)) return '## ' + t.replace(/^(.{2})\s*/, '');
  if (/^(结论|原因|问题|正确写法|标准解决方案|答案|代价是什么|面试官追问|面试标准说法)$/.test(t)) return '## ' + t;
  return null;
}

function transformColumns(lines, start) {
  const clean = t => (t || '').trim().replace(/[：:]\s*$/, '');
  const isHeader = t => {
    const s = clean(t);
    if (!s) return false;
    if (s === '⸻' || s === '---') return false;
    if (/^[-#|`]/.test(s)) return false;
    return s.length <= 32;
  };
  const isStop = t => {
    const s = (t || '').trim();
    if (!s) return true;
    if (/^[-#|`]/.test(s)) return true;
    if (s === '⸻' || s === '---') return true;
    return false;
  };
  for (let cols = 4; cols >= 2; cols--) {
    const headers = [];
    for (let k = 0; k < cols; k++) {
      if (!lines[start + k] || !isHeader(lines[start + k])) { headers.length = 0; break; }
      headers.push(clean(lines[start + k]));
    }
    if (headers.length !== cols) continue;
    let i = start + cols;
    while (i < lines.length && !lines[i].trim()) i++;
    const rows = [];
    while (i + (cols - 1) < lines.length) {
      const row = [];
      for (let k = 0; k < cols; k++) {
        const v = (lines[i + k] || '').trim();
        if (isStop(v)) { row.length = 0; break; }
        row.push(v);
      }
      if (row.length !== cols) break;
      rows.push('| ' + row.join(' | ') + ' |');
      i += cols;
      while (i < lines.length && !lines[i].trim()) i++;
    }
    if (rows.length >= 2) {
      const head = '| ' + headers.join(' | ') + ' |';
      const sep = '| ' + Array(cols).fill('---').join(' | ') + ' |';
      return { end: i, table: [head, sep, ...rows] };
    }
  }
  return null;
}

function applyTransforms(text) {
  let s = text.replace(/^\s*⸻\s*$/gm, '---');
  s = s.replace(/^\s*•\s*/gm, '- ');
  s = s.replace(/^\s*👉\s*/gm, '- ');
  const lines = s.split('\n');
  const out = [];
  let i = 0;
  let inCode = false;
  while (i < lines.length) {
    const h = toHeading(lines[i], i);
    if (h) {
      out.push(h);
      i++;
      continue;
    }
    const t = transformColumns(lines, i);
    if (t) {
      out.push(...t.table);
      i = t.end;
      continue;
    }
    if (!inCode && isCodeLine(lines[i])) {
      out.push('```js');
      inCode = true;
      out.push(lines[i]);
      i++;
      while (i < lines.length && (isCodeLine(lines[i]) || lines[i].trim() === '')) {
        out.push(lines[i]);
        i++;
      }
      out.push('```');
      inCode = false;
      continue;
    }
    out.push(lines[i]);
    i++;
  }
  return out.join('\n');
}

function needsTransform(text) {
  if (/^\s*⸻\s*$/m.test(text)) return true;
  if (/^\s*•\s*/m.test(text)) return true;
  if (/^\s*👉\s*/m.test(text)) return true;
  const lines = text.split('\n');
  const triple = (typeof transformColumns === 'function') ? transformColumns : (typeof transformTripleColumns === 'function' ? transformTripleColumns : null);
  if (triple) {
    for (let i = 0; i + 1 < lines.length; i++) {
      if (triple(lines, i)) return true;
    }
  }
  let inFence = false;
  let streak = 0;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (t.startsWith('```')) { inFence = !inFence; streak = 0; continue; }
    if (!inFence && isCodeLine(lines[i])) {
      streak++;
      if (streak >= 2) return true;
    } else {
      streak = 0;
    }
  }
  return false;
}

async function main() {
  const root = process.argv[2] || '/Users/luzhang/Desktop/js_learn/js1';
  const files = (await walk(root)).filter(isMd);
  for (const f of files) {
    const buf = await fsp.readFile(f, 'utf8');
    const should = needsTransform(buf);
    const next = should ? applyTransforms(buf) : buf;
    if (should && next !== buf) await fsp.writeFile(f, next, 'utf8');
  }
}

main().catch(e => {
  process.stderr.write(String(e));
  process.exit(1);
});