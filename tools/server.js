const http = require('http');
const PORT = process.env.PORT || 3000;

const { returnGui, returnGuiStatic }   = require('./function/gui');
const { returnApiTestGui }             = require('./function/apitestergui');
const { launchTerminal, stopTerminal } = require('./function/terminal');

//the custom process tools
const { runSupabase, stopSupabase } = require('./toolfunction/runSupabase');
const { runInstall }                = require('./toolfunction/runInstall');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Extract pathname to ignore query parameters for routing
  const pathname = req.url.split('?')[0];

  switch( pathname ) {
    case '/':               return returnGui(req, res);
    case '/gui/data.js':    return returnGuiStatic(req, res);
    case '/gui/script.js':  return returnGuiStatic(req, res);
    case '/terminal':       return launchTerminal(req, res);
    case '/terminal-stop':  return stopTerminal(req, res);
    case '/test':           return returnApiTestGui(req, res);

    //these are the custom process========================================================
    case '/lunch-supabase': return runSupabase(req, res);
    case '/stop-supabase':  return stopSupabase(req, res);
    case '/install':        return runInstall(req, res);


    

    //====================================================================================

    default: 
      if (pathname.startsWith('/test/')) {
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
