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

function transformTripleColumns(lines, start) {
  if (!lines[start] || !lines[start+1] || !lines[start+2]) return null;
  if (lines[start].trim() !== '场景' || lines[start+1].trim() !== 'React' || lines[start+2].trim() !== 'Vue') return null;
  const rows = [];
  let i = start + 3;
  while (i + 2 < lines.length) {
    const a = lines[i].trim();
    const b = lines[i+1].trim();
    const c = lines[i+2].trim();
    if (!a || !b || !c) break;
    if (a === '⸻' || b === '⸻' || c === '⸻' || a === '---' || b === '---' || c === '---') break;
    rows.push(`| ${a} | ${b} | ${c} |`);
    i += 3;
  }
  if (!rows.length) return null;
  const table = ['| 场景 | React | Vue |', '| --- | --- | --- |', ...rows];
  return { end: i, table };
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
    const t = transformTripleColumns(lines, i);
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

async function main() {
  const root = process.argv[2] || '/Users/luzhang/Desktop/js_learn/js1';
  const files = (await walk(root)).filter(isMd);
  for (const f of files) {
    const buf = await fsp.readFile(f, 'utf8');
    const next = applyTransforms(buf);
    if (next !== buf) await fsp.writeFile(f, next, 'utf8');
  }
}

main().catch(e => {
  process.stderr.write(String(e));
  process.exit(1);
});