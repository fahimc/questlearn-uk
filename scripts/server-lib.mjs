import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json', '.png':'image/png', '.svg':'image/svg+xml', '.md':'text/markdown; charset=utf-8' };

export function makeServer(rootDirectory) {
  const root = resolve(rootDirectory);
  return createServer((request, response) => {
    const requestPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const relative = normalize(requestPath).replace(/^([/\\])+/, '');
    let path = resolve(join(root, relative || 'index.html'));
    if (!path.startsWith(root)) { response.writeHead(403).end('Forbidden'); return; }
    if (existsSync(path) && statSync(path).isDirectory()) path = join(path, 'index.html');
    if (!existsSync(path)) { response.writeHead(404).end('Not found'); return; }
    response.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Cache-Control':'no-store' });
    createReadStream(path).pipe(response);
  });
}

