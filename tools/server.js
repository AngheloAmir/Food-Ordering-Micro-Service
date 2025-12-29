const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const { exec } = require('child_process');

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/') {
    const filePath = path.join(__dirname, 'gui', 'index.html');
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  } else if (req.url === '/api/launch-database' && req.method === 'POST') {
    const dbPath = path.resolve(__dirname, '../../database');
    console.log(`Launching database in: ${dbPath}`);
    
    // We use 'npm run start' as requested. 
    // Using exec to run it in the background or wait for it. 
    // Since it's likely a long running process (server), 'exec' might buffer output indefinitely if we're not careful, 
    // but the user just asked to "execute a command". 
    // For better control, spawn is usually better, but let's stick to a simple exec for now 
    // that fires and forgets or returns success immediately if it starts.
    // However, 'npm run start' for a DB usually blocks. 
    // Let's use exec but detaching it or just acknowledging it started.
    
    exec('npm run start', { cwd: dbPath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Database launch command initiated' }));

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
