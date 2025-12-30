const path = require('path');
const fs   = require('fs');

module.exports = {
    returnApiTestGui: (req, res) => {
        // Handle /test -> Redirect to /test/
        if (req.url === '/test') {
            res.writeHead(301, { 'Location': '/test/' });
            res.end();
            return;
        }

        // Handle /test/ and children
        if (req.url.startsWith('/test/')) {
            let relativePath = req.url.substring('/test'.length);
            
            // Default to index.html for directory root
            if (relativePath === '/' || relativePath === '') {
                relativePath = '/index.html';
            }

            // Security: Prevent directory traversal
            const safeUrl = relativePath.replace(/\.\./g, '');
            
            // Resolve path relative to tools/function/ -> tools/test/
            const filePath = path.join(__dirname, '..', 'test', safeUrl);

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
                        console.error(`Server error reading ${filePath}: ${err}`);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Server Error');
                    }
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content);
                }
            });
            return;
        }

        // Fallback for requests not starting with /test/
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
};