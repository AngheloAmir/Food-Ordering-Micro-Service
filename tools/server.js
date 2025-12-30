const http = require('http');
const PORT = process.env.PORT || 3000;

const { returnGui }        = require('./function/gui');
const { returnApiTestGui } = require('./function/apitestergui');
const { launchNodeServer } = require('./function/lunchnodeserver');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  switch( req.url ) {
    case '/': 
      return returnGui(req, res);

    case '/lunch-node':
      console.log('receive')
      return launchNodeServer(req, res);

    default: 
      return returnApiTestGui(req, res);
  }






  // } else if (req.url === '/api/launch-database' && req.method === 'POST') {
  //   const dbPath = path.resolve(__dirname, '../../database');
  //   console.log(`Launching database in: ${dbPath}`);
    
  //   // We use 'npm run start' as requested. 
  //   // Using exec to run it in the background or wait for it. 
  //   // Since it's likely a long running process (server), 'exec' might buffer output indefinitely if we're not careful, 
  //   // but the user just asked to "execute a command". 
  //   // For better control, spawn is usually better, but let's stick to a simple exec for now 
  //   // that fires and forgets or returns success immediately if it starts.
  //   // However, 'npm run start' for a DB usually blocks. 
  //   // Let's use exec but detaching it or just acknowledging it started.
    
  //   exec('npm run start', { cwd: dbPath }, (error, stdout, stderr) => {
  //     if (error) {
  //       console.error(`exec error: ${error}`);
  //       return;
  //     }
  //     console.log(`stdout: ${stdout}`);
  //     console.error(`stderr: ${stderr}`);
  //   });

  //   confirm(res, 'Database launch command initiated');

  // } 
  
  
  //   else if (req.url === '/api/launch-node-server' && req.method === 'POST') {
  //   const nodeServicePath = path.resolve(__dirname, '../../backend/node-service');
  //   console.log(`Launching Node Server in: ${nodeServicePath}`);

  //   // Using exec to run 'npm run dev'
  //   // This will start nodemon
  //   exec('npm run dev', { cwd: nodeServicePath }, (error, stdout, stderr) => {
  //     if (error) {
  //       console.error(`exec error: ${error}`);
  //       return;
  //     }
  //     console.log(`stdout: ${stdout}`);
  //     console.error(`stderr: ${stderr}`);
  //   });

  //   confirm(res, 'Node Server launch command initiated');
    

  // } else if (req.url === '/test') {
  //   // Redirect /test to /test/ so relative paths work correctly
  //   res.writeHead(301, { 'Location': '/test/' });
  //   res.end();
  // } else if (req.url === '/test/' || req.url.startsWith('/test/')) {
    
  //   // Determine the relative path
  //   let relativePath = req.url.substring('/test'.length);
  //   if (relativePath === '/' || relativePath === '') {
  //       relativePath = '/index.html';
  //   }

  //   // Sanitize URL
  //   const safeUrl = relativePath.replace(/\.\./g, '');
  //   const filePath = path.join(__dirname, 'test', safeUrl);

  //   const ext = path.extname(filePath).toLowerCase();
  //   let contentType = 'text/plain';
  //   const mimeTypes = {
  //     '.html': 'text/html',
  //     '.js': 'text/javascript',
  //     '.css': 'text/css',
  //     '.json': 'application/json',
  //     '.png': 'image/png',
  //     '.jpg': 'image/jpg',
  //     '.gif': 'image/gif',
  //     '.svg': 'image/svg+xml',
  //   };
    
  //   contentType = mimeTypes[ext] || contentType;

  //   fs.readFile(filePath, (err, content) => {
  //     if (err) {
  //       if(err.code === 'ENOENT') {
  //           console.log(`File not found: ${filePath}`);
  //           res.writeHead(404, { 'Content-Type': 'text/plain' });
  //           res.end('404 Not Found');
  //       } else {
  //           console.error(`Server error reading ${filePath}: ${err}`);
  //           res.writeHead(500, { 'Content-Type': 'text/plain' });
  //           res.end('Server Error: ' + err.code);
  //       }
  //     } else {
  //       res.writeHead(200, { 'Content-Type': contentType });
  //       res.end(content);
  //     }
  //   });

  // } else {
  //   res.writeHead(404, { 'Content-Type': 'text/plain' });
  //   res.end('404 Not Found');
  // }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
