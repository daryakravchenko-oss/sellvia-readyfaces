// serve.js — minimal static server for previewing the readyfaces landing page.
//
// index.html uses ABSOLUTE asset paths (/css-for-landings/..., /images-for-landings/...),
// which is correct for production (the files deploy to the Sellvia site root). Because of
// that, opening index.html directly via file:// does NOT work — those paths resolve to the
// disk root and every asset 404s. Run this tiny server from the repo root instead:
//
//   node serve.js          ->  http://localhost:8123
//   node serve.js 3000     ->  custom port
//
// Pure Node, no dependencies. Press Ctrl+C to stop.

const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT || process.argv[2] || 8123);

const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.json': 'application/json', '.ico': 'image/x-icon'
};

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const fp = path.join(root, p);
  if (!fp.startsWith(root)) { res.writeHead(403); res.end('403 Forbidden'); return; }   // no path traversal
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('404 Not Found: ' + p); return; }
    res.writeHead(200, { 'Content-Type': mime[path.extname(fp).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => {
  console.log('\n  readyfaces preview:  http://localhost:' + port + '\n');
  console.log('  serving ' + root);
  console.log('  press Ctrl+C to stop\n');
}).on('error', (e) => {
  if (e.code === 'EADDRINUSE') console.error('\n  Port ' + port + ' is busy. Try a different one:  node serve.js 8080\n');
  else console.error(e.message);
  process.exit(1);
});
