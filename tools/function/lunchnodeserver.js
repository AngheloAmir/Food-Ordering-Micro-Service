
const path = require('path');
const { exec } = require('child_process');
const confirm = require('./confirm');

module.exports = {
    launchNodeServer: (req, res) => {
        const nodeServicePath = path.join(__dirname, '../../backend/node-service');
        console.log(`Launching Node Server in: ${nodeServicePath}`);

        const child = exec('yarn run dev', { cwd: nodeServicePath });

        child.stdout.on('data', (data) => {
            console.log(`[Node Service]: ${data}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`[Node Service Error]: ${data}`);
        });
        
        child.on('error', (err) => {
             console.error(`Failed to start Node Service: ${err}`);
        });

        if (confirm && typeof confirm === 'function') {
            confirm(res, 'Node Server launch command initiated');
        } else {
             // Fallback if confirm is not imported correctly due to project inconsistencies
             res.writeHead(200, { 'Content-Type': 'application/json' });
             res.end(JSON.stringify({ message: 'Node Server launch command initiated' }));
        }
    }
};