const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

module.exports = {
    runInstall: async (req, res) => {
        const rootDir = path.resolve(__dirname, '../../');
        const targetDirs = ['frontend', 'backend'];
        
        const projects = [];

        // 1. Enumerate projects
        for (const dir of targetDirs) {
            const parentDir = path.join(rootDir, dir);
            if (fs.existsSync(parentDir)) {
                const subDirs = fs.readdirSync(parentDir);
                for (const subDir of subDirs) {
                    const projectPath = path.join(parentDir, subDir);
                    const packageJsonPath = path.join(projectPath, 'package.json');
                    
                    if (fs.existsSync(packageJsonPath) && fs.lstatSync(projectPath).isDirectory()) {
                        projects.push({
                            name: `${dir}/${subDir}`,
                            path: projectPath
                        });
                    }
                }
            }
        }

        res.write(`Found ${projects.length} projects to install dependencies for:\n`);
        projects.forEach(p => res.write(`- ${p.name}\n`));
        res.write('\n');

        // 2. Perform Install
        for (const project of projects) {
            res.write(`\n--------------------------------------------------\n`);
            res.write(`Installing dependencies for: ${project.name}\n`);
            res.write(`Path: ${project.path}\n`);
            res.write(`--------------------------------------------------\n\n`);

            await new Promise((resolve) => {
                const child = spawn('npm', ['install'], {
                    cwd: project.path,
                    shell: true,
                    env: process.env 
                });

                child.stdout.on('data', (data) => {
                    res.write(data);
                });

                child.stderr.on('data', (data) => {
                    res.write(data);
                });

                child.on('close', (code) => {
                    if (code === 0) {
                        res.write(`\nSuccessfully installed dependencies for ${project.name}\n`);
                    } else {
                        res.write(`\nFailed to install dependencies for ${project.name} (Exit code: ${code})\n`);
                    }
                    resolve();
                });

                child.on('error', (err) => {
                     res.write(`\nError spawning npm: ${err.message}\n`);
                     resolve();
                });
            });
        }

        res.write(`\nAll operations completed.\n`);
        res.end();
    }
};