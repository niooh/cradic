import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { exec } from 'child_process';

const PORT = 3000;
const PROJECT_ROOT = '/storage/emulated/0/Code/JS/Format/Text/to_txt/cradic';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = createServer(async (req, res) => {
  try {
    let filePath = req.url;
    if (filePath === '/') {
      filePath = '/tests/demos/demo.html';
    }
    const fullPath = join(PROJECT_ROOT, filePath);    
    console.log(`Request: ${req.url} -> ${fullPath}`);
    const data = await readFile(fullPath);
    
    const extension = '.' + fullPath.split('.').pop().toLowerCase();
    const contentType = MIME_TYPES[extension] || 'application/octet-stream';    
    res.writeHead(200, { 
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    res.end(data);
    
  } catch (error) {
    console.error(`Error: ${req.url}`, error.message);
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<title>404 Not Found</title>`);
  }
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}/`;
  console.log(`✅ Server started successfully!
🔗 Open in browser: ${url}
📁 Project root: ${PROJECT_ROOT}`);

  const command = process.platform === 'win32' ? 'start' :
                  process.platform === 'darwin' ? 'open' : 'xdg-open';
  exec(`${command} "${url}"`, (err) => {
    if (err) console.log('⚠️ Could not open browser automatically');
  });
});
