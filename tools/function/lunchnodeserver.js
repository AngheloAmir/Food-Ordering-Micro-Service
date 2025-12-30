const path = require('path');
const { spawn } = require('child_process');

let runningNodeProcess = null;

module.exports = {
    launchNodeServer: (req, res) => {
        const nodeServicePath = path.join(__dirname, '../../backend/node-service');
        console.log(`Launching Node Server in: ${nodeServicePath}`);

        // Set streaming headers
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Transfer-Encoding': 'chunked'
        });

        // Kill existing process if any
        if (runningNodeProcess) {
            try {
                process.kill(-runningNodeProcess.pid); // Attempt to kill process group if possible, or just process
            } catch (e) {
                runningNodeProcess.kill();
            }
        }

        const child = spawn('yarn', ['run', 'dev'], { 
            cwd: nodeServicePath,
            shell: true,
            detached: true, // Detach to allow killing process group
            env: { ...process.env, FORCE_COLOR: '1' } 
        });

        runningNodeProcess = child;

        res.write(`Starting Node Server in ${nodeServicePath}...\n`);

        child.stdout.on('data', (data) => {
            res.write(data);
            console.log(`[Node Service]: ${data}`);
        });

        child.stderr.on('data', (data) => {
            res.write(data);
            console.error(`[Node Service Error]: ${data}`);
        });
        
        child.on('error', (err) => {
             const errorMsg = `Failed to start Node Service: ${err}\n`;
             res.write(errorMsg);
             console.error(errorMsg);
             res.end();
        });

        child.on('close', (code) => {
            res.write(`Node Service process exited with code ${code}\n`);
            res.end();
            if (runningNodeProcess === child) {
                runningNodeProcess = null;
            }
        });
        
        req.on('close', () => {
             // Connection closed logic
        });
    },

    stopNodeServer: (req, res) => {
        if (runningNodeProcess) {
            try {
                // To kill the shell and the spawned node process (process group)
                // We use negative PID
                process.kill(-runningNodeProcess.pid);
                console.log('Node Server stopped successfully.');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Node Server stopped successfully' }));
            } catch (e) {
                console.error('Error stopping Node Server:', e);
                // Fallback to simple kill
                runningNodeProcess.kill();
                 res.writeHead(200, { 'Content-Type': 'application/json' });
                 res.end(JSON.stringify({ message: 'Node Server stop signal sent (fallback)' }));
            }
            runningNodeProcess = null;
        } else {
            console.log('No running Node Server to stop.');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'No running Node Server to stop' }));
        }
    }
};