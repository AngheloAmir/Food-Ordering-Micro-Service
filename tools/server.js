const http = require('http');
const PORT = process.env.PORT || 3000;

const { returnGui, returnGuiStatic } = require('./function/gui');
const { returnApiTestGui } = require('./function/apitestergui');
const { launchNodeServer } = require('./function/lunchnodeserver');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  switch( req.url ) {
    case '/':               return returnGui(req, res);
    case '/gui/data.js':    return returnGuiStatic(req, res);
    case '/gui/script.js':  return returnGuiStatic(req, res);
   
    case '/lunch-node':     return launchNodeServer(req, res);
    case '/test':           return returnApiTestGui(req, res);

    default: 
      if (req.url.startsWith('/test/')) {
        return returnApiTestGui(req, res);
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      break;
  }

});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
