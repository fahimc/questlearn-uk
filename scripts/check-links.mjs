import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const files = [];
function walk(directory) { for (const name of readdirSync(directory)) { if (name === '.git' || name === 'node_modules') continue; const path=join(directory,name); if (statSync(path).isDirectory()) walk(path); else files.push(path); } }
walk(root);
const errors=[];
for(const file of files.filter((item)=>['.html','.md'].includes(extname(item)))){
  const text=readFileSync(file,'utf8');
  const pattern=extname(file)==='.html'?/(?:href|src)="([^"#]+)"/g:/\[[^\]]+\]\(([^)#]+)(?:#[^)]+)?\)/g;
  for(const match of text.matchAll(pattern)){
    const target=match[1]; if(/^(https?:|mailto:|data:)/.test(target))continue;
    const clean=decodeURIComponent(target.split('?')[0]); const resolved=resolve(dirname(file),clean);
    if(!existsSync(resolved)) errors.push(`${file.replace(root,'')}: missing ${target}`);
  }
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Checked ${files.length} files: local links resolve.`);
