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

});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
