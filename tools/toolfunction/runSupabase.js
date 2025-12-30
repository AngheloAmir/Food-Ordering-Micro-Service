const path      = require('path');
const { spawn } = require('child_process');

module.exports = {
    runSupabase: async (req, res) => {
        // Keep connection open and streaming
        res.writeHead(200, { 
            'Content-Type': 'text/plain', 
            'Transfer-Encoding': 'chunked'
        });   
        
        const servicePath = path.join(__dirname, '../../database');

        // Helper to run a command while piping output and keeping connection alive
        const runCommand = (cmd, args) => {
            return new Promise((resolve, reject) => {
                const child = spawn(cmd, args, { 
                    cwd:        servicePath,
                    shell:      true,
                    stdio:      ['pipe', 'pipe', 'pipe'], // Using pipe for stdin/stdout/stderr
                    env:        { ...process.env, FORCE_COLOR: '1' } 
                });

                // Heartbeat interval to prevent timeouts during long periods of silence
                const heartbeat = setInterval(() => {
                    res.write('.');
                }, 3000); // 3 seconds

                child.stdout.on('data', (data) => {
                    res.write(data);
                });

                child.stderr.on('data', (data) => {
                    res.write(data);
                });
                
                child.on('error', (err) => {
                     clearInterval(heartbeat);
                     res.write(`\n[Error]: ${err.message}\n`);
                     // We don't necessarily reject here, we let 'close' handle the flow
                });

                child.on('close', (code) => {
                    clearInterval(heartbeat);
                    resolve(code);
                });
            });
        };

        try {
            // 1. Clean up first
            res.write(`>>> [Auto-Fix] Ensuring clean state (supabase stop)...\n`);
            await runCommand('yarn', ['run', 'stop']);

            // 2. Start
            res.write(`\n>>> Starting Supabase (supabase start)...\n`);
            // We use 'script -q -c' trick or similar if we really wanted PTY, but for now stick to basic spawn
            // We assume 'yarn run start' runs 'supabase start'
            const code = await runCommand('yarn', ['run', 'start']);
            
            res.write(`\n>>> Process exited with code ${code}\n`);
            res.end();
            
        } catch (error) {
            res.write(`\n>>> Critical Scope Error: ${error}\n`);
            res.end();
        }
    },

    stopSupabase: (req, res) => {
        const servicePath = path.join(__dirname, '../../database');
        
        const child = spawn('yarn', ['run', 'stop'], { 
            cwd:        servicePath,
            shell:      true,
            env:        { ...process.env, FORCE_COLOR: '1' } 
        });
        
        child.on('close', (code) => {
             res.writeHead(200, { 'Content-Type': 'application/json' });
             res.end(JSON.stringify({ message: `Supabase stopped (code ${code})` }));
        });

        child.on('error', (err) => {
             res.writeHead(500, { 'Content-Type': 'application/json' });
             res.end(JSON.stringify({ message: `Failed to stop: ${err.message}` }));
        });
    }   
};