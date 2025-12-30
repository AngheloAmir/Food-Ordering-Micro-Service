const path = require('path');
const { spawn } = require('child_process');

module.exports = {
    launchTerminal: (req, res) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const { terminalDirectory, terminalCommand, terminalRunTillStop } = JSON.parse(body);

                if (!terminalDirectory || !terminalCommand) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Missing terminalDirectory or terminalCommand');
                    return;
                }

                const workingDir = path.join(__dirname, '../../', terminalDirectory);

                // Set streaming headers
                res.writeHead(200, {
                    'Content-Type': 'text/plain',
                    'Transfer-Encoding': 'chunked'
                });

                res.write(`${terminalDirectory}$ ${terminalCommand}`);

                // Heartbeat setup if requested
                let heartbeatInterval = null;
                if (terminalRunTillStop) {
                    heartbeatInterval = setInterval(() => {
                        res.write('-'); // Send hyphen as invisible heartbeat
                    }, 3000);
                }

                const child = spawn(terminalCommand, {
                    cwd: workingDir,
                    shell:      true,
                    stdio:      ['pipe', 'pipe', 'pipe'], 
                    env:        { ...process.env, FORCE_COLOR: '1' } 
                });

                child.stdout.on('data', (data) => {
                    res.write(data);
                });

                child.stderr.on('data', (data) => {
                    res.write(data);
                });

                child.on('error', (err) => {
                    if (heartbeatInterval) clearInterval(heartbeatInterval);
                    res.write(`\n[Error]: ${err.message}\n`);
                    res.end();
                });

                child.on('close', (code, signal) => {
                    if (heartbeatInterval) clearInterval(heartbeatInterval);
                    res.write(`\n[Close]: Process exited with code ${code} (Signal: ${signal})\n`);
                    res.end();
                });

                // If the client disconnects, we should probably kill the process
                req.on('close', () => {
                    if (heartbeatInterval) clearInterval(heartbeatInterval);
                    console.log('Request connection closed by client.');
                    if (!child.killed) {
                        try {
                            console.log('Killing process ' + child.pid);
                            child.kill();
                        } catch (e) {
                             console.error('Failed to kill process:', e);
                        }
                    }
                });

            } catch (e) {
                console.error(e);
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid JSON');
            }
        });
    },

    stopTerminal: (req, res) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const command = url.searchParams.get('command');
        const directory = url.searchParams.get('dir');

        if (!command || !directory) {
             res.writeHead(400, { 'Content-Type': 'application/json' });
             res.end(JSON.stringify({ message: 'Missing command or dir' }));
             return;
        }

        const workingDir = path.join(__dirname, '../../', directory);
        console.log(`Running Stop Command: "${command}" in ${workingDir}`);

        const child = spawn(command, {
            cwd: workingDir,
            shell: true,
            stdio: 'ignore' // We don't really care about output for stop command usually
        });

        child.on('close', (code) => {
             res.writeHead(200, { 'Content-Type': 'application/json' });
             res.end(JSON.stringify({ message: `Stop command executed. Code: ${code}` }));
        });
        
        child.on('error', (err) => {
             res.writeHead(500, { 'Content-Type': 'application/json' });
             res.end(JSON.stringify({ message: `Failed to execute stop command: ${err.message}` }));
        });
    }
};
