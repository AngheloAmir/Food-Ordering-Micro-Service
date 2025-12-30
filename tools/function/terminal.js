const path = require('path');
const { spawn } = require('child_process');

const activeProcesses = new Map();

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

                const processId = Date.now().toString();
                activeProcesses.set(parseInt(processId), child);
                res.write(`\n[Process ID]: ${processId}\n`);

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
                    activeProcesses.delete(parseInt(processId)); // Remove from active processes
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
                    activeProcesses.delete(parseInt(processId)); // Ensure it's removed on client disconnect
                });

            } catch (e) {
                console.error(e);
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid JSON');
            }
        });
    },

    stopTerminal: (req, res) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                // Support both body (POST) and query (GET fallback if needed, but we switch to POST)
                // Actually user requested POST, so let's check body mainly.
                let { command, dir, pid } = JSON.parse(body || '{}');
                
                // Fallback to query params if body is empty (for backward compat if needed during transition)
                if (!command && !dir && !pid) {
                    const url = new URL(req.url, `http://${req.headers.host}`);
                    command = url.searchParams.get('command');
                    dir = url.searchParams.get('dir');
                    pid = url.searchParams.get('pid');
                }

                if (pid && activeProcesses.has(parseInt(pid))) {
                    const child = activeProcesses.get(parseInt(pid));
                    console.log(`Killing process by ID: ${pid} (OS PID: ${child.pid})`);
                    try {
                        // On non-Windows, kill the process group to ensure all spawned children are killed
                        if (process.platform !== 'win32') {
                            try { process.kill(-child.pid, 'SIGKILL'); } catch(e) { child.kill(); }
                        } else {
                            child.kill();
                        }
                    } catch(e) {
                         try { child.kill(); } catch(err) { console.error('Failed to kill process:', err); }
                    }
                    activeProcesses.delete(parseInt(pid));
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: `Process ${pid} stopped.` }));
                    return;
                }

                if (!command || !dir) {
                     res.writeHead(400, { 'Content-Type': 'application/json' });
                     res.end(JSON.stringify({ message: 'Missing command or dir' }));
                     return;
                }

                const workingDir = path.join(__dirname, '../../', dir);
                console.log(`Running Stop Command: "${command}" in ${workingDir}`);

                const child = spawn(command, {
                    cwd: workingDir,
                    shell: true,
                    stdio: ['pipe', 'pipe', 'pipe'] 
                });

                child.stdout.on('data', (d) => console.log(`[StopCmd Output]: ${d}`));
                child.stderr.on('data', (d) => console.error(`[StopCmd Error]: ${d}`));

                child.on('close', (code) => {
                     res.writeHead(200, { 'Content-Type': 'application/json' });
                     res.end(JSON.stringify({ message: `Stop command executed. Code: ${code}` }));
                });
                
                child.on('error', (err) => {
                     res.writeHead(500, { 'Content-Type': 'application/json' });
                     res.end(JSON.stringify({ message: `Failed to execute stop command: ${err.message}` }));
                });

            } catch (e) {
                console.error(e);
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid JSON');
            }
        });
    }
};
