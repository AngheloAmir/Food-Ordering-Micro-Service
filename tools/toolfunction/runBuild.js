const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

module.exports = {
    runBuild: async (req, res) => {
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
                        try {
                            const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
                            if (pkg.scripts && pkg.scripts.build) {
                                projects.push({
                                    name: `${dir}/${subDir}`,
                                    path: projectPath
                                });
                            }
                        } catch (e) {
                            // ignore invalid package.json
                        }
                    }
                }
            }
        }

        res.write(`Found ${projects.length} projects with a 'build' script:\n`);
        projects.forEach(p => res.write(`- ${p.name}\n`));
        res.write('\n');

        // 2. Perform Build
        for (const project of projects) {
            res.write(`\n--------------------------------------------------\n`);
            res.write(`Building: ${project.name}\n`);
            res.write(`Path: ${project.path}\n`);
            res.write(`--------------------------------------------------\n\n`);

            await new Promise((resolve) => {
                const child = spawn('npm', ['run', 'build'], {
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
                        res.write(`\nSuccessfully built ${project.name}\n`);
                    } else {
                        res.write(`\nFailed to build ${project.name} (Exit code: ${code})\n`);
                    }
                    resolve();
                });

                child.on('error', (err) => {
                     res.write(`\nError spawning npm: ${err.message}\n`);
                     resolve();
                });
            });
        }

        res.write(`\nAll build operations completed.\n`);
        res.end();
    }
};