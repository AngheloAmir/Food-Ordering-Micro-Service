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
    },
    
    returnGuiStatic: (req, res) => {
        let safeUrl = req.url.replace(/\.\./g, '');
        if (safeUrl.startsWith('/gui/')) {
            safeUrl = safeUrl.substring(4);
        }
        const filePath = path.join(__dirname, '..', 'gui', safeUrl);
        const ext = path.extname(filePath).toLowerCase();
        let contentType = 'text/plain';
        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
        };
        contentType = mimeTypes[ext] || contentType;

        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 Not Found');
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Server Error');
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    }
}