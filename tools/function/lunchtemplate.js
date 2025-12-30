const path = require('path');
const { spawn } = require('child_process');

//global variables====================================
let runningNodeProcess = null;

module.exports = {
    launchNodeServer: (req, res) => {
    //Inits=======================================================================================
        res.writeHead(200, { 'Content-Type': 'text/plain', 'Transfer-Encoding': 'chunked' });   
        const servicePath = path.join(__dirname, '../../backend/node-service');

        // Kill existing process if any==========================
        if (runningNodeProcess) {
            try {
                process.kill(-runningNodeProcess.pid); // Attempt to kill process group if possible, or just process
            } catch (e) {
                runningNodeProcess.kill();
            }
        }

        //run the command=======================================
        runningNodeProcess = spawn('yarn', ['run', 'dev'], { 
            cwd:        servicePath,
            shell:      true,
            detached:   true, // Detach to allow killing process group
            stdio:      ['ignore', 'pipe', 'pipe'],
            env:        { ...process.env, FORCE_COLOR: '1' } 
        });

        //make the response=======================================
        res.write(`Starting server in ${servicePath}...\n`);

        //========================================================
        //handle events===========================================
        runningNodeProcess.stdout.on('data', (data) => {
            res.write(data);
        });

        runningNodeProcess.stderr.on('data', (data) => {
            res.write(data);
        });
        
        runningNodeProcess.on('error', (err) => {
             const errorMsg = `Failed to start Node Service: ${err}\n`;
             res.write(errorMsg);
             res.end();
        });

        runningNodeProcess.on('close', (code) => {
            res.write(`Service process exited with code ${code}\n`);
            res.end();
            runningNodeProcess = null;
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
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Stopped server successfully' }));
            } catch (e) {
                // Fallback to simple kill
                runningNodeProcess.kill();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Server stop signal sent (fallback)' }));
            }
            runningNodeProcess = null;
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'No running server to stop' }));
        }
    }
};