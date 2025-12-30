const path = require('path');
const fs   = require('fs');

module.exports = {
    returnGui: (req, res) => {
        const filePath = path.join(__dirname, '..', 'gui', 'index.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error');
            } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
            }
        });
    }
}