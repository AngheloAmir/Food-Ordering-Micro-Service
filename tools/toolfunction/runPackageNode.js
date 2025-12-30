const path = require('path');
const fs = require('fs');

module.exports = {
    runPackageNode: async (req, res) => {
        res.writeHead(200, { 
            'Content-Type': 'text/plain', 
            'Transfer-Encoding': 'chunked'
        });

        const rootDir     = path.resolve(__dirname, '../../');
        const appDir      = path.join(rootDir, 'app');
        const backendDir  = path.join(rootDir, 'backend/node-service');
        const frontendDir = path.join(rootDir, 'frontend');

        const log = (msg) => res.write(`${msg}\n`);

        try {
            log('Starting Package Process...');
            log(`Target Directory: ${appDir}`);
            
            // 1. Clean App Directory
            if (fs.existsSync(appDir)) {
                log(`Cleaning existing app directory...`);
                fs.rmSync(appDir, { recursive: true, force: true });
            }
            fs.mkdirSync(appDir);
            
            // 2. Prepare Public Directory
            const publicDir = path.join(appDir, 'public');
            fs.mkdirSync(publicDir);

            // 3. Copy Backend
            log('--------------------------------------------------');
            log('Packaging Backend (node-service)...');
            
            const backendDist = path.join(backendDir, 'dist');
            if (fs.existsSync(backendDist)) {
                 log(`Copying code from ${backendDist}...`);
                 // Copy contents of dist to app root
                 fs.cpSync(backendDist, appDir, { recursive: true });
                 
                 // Copy package.json
                 const pkgJson = path.join(backendDir, 'package.json');
                 if (fs.existsSync(pkgJson)) {
                     log(`Copying package.json...`);
                     const destPkgJson = path.join(appDir, 'package.json');
                     fs.copyFileSync(pkgJson, destPkgJson);
                     
                     // Patch package.json
                     try {
                         const pkgData = JSON.parse(fs.readFileSync(destPkgJson, 'utf8'));
                         pkgData.scripts.start = "node index.js";
                         delete pkgData.devDependencies; // Clean up
                         fs.writeFileSync(destPkgJson, JSON.stringify(pkgData, null, 2));
                         log(`Patched package.json start script.`);
                     } catch (e) {
                         log(`Warning: Failed to patch package.json: ${e.message}`);
                     }
                 }

                 // Copy .env if exists
                 const envFile = path.join(backendDir, '.env');
                 if (fs.existsSync(envFile)) {
                     log(`Copying .env file...`);
                     fs.copyFileSync(envFile, path.join(appDir, '.env'));
                 }

                 // Copy .gitignore if exists (crucial for deployment)
                 const gitignoreFile = path.join(backendDir, '.gitignore');
                 if (fs.existsSync(gitignoreFile)) {
                     log(`Copying .gitignore file...`);
                     fs.copyFileSync(gitignoreFile, path.join(appDir, '.gitignore')); 
                 } else {
                     // Fallback: copy root .gitignore if backend specific one doesn't exist
                     const rootGitignore = path.join(rootDir, '.gitignore');
                     if (fs.existsSync(rootGitignore)) {
                         log(`Copying root .gitignore file...`);
                         fs.copyFileSync(rootGitignore, path.join(appDir, '.gitignore'));
                     }
                 }
                 
                 // Copy backend public folder if exists (assets, etc)
                 const backendPublic = path.join(backendDir, 'public');
                 if (fs.existsSync(backendPublic)) {
                     log(`Copying backend static files from ${backendPublic}...`);
                     fs.cpSync(backendPublic, publicDir, { recursive: true });
                 }

            } else {
                log(`ERROR: Backend dist folder not found at ${backendDist}. Please run build first.`);
            }

            // 4. Copy Frontends
            log('--------------------------------------------------');
            log('Packaging Frontends...');
            
            if (fs.existsSync(frontendDir)) {
                const projects = fs.readdirSync(frontendDir);
                for (const project of projects) {
                    const projectPath = path.join(frontendDir, project);
                    
                    // Ignore hidden files or non-directories
                    if (project.startsWith('.') || !fs.lstatSync(projectPath).isDirectory()) {
                        continue;
                    }

                    const distPath = path.join(projectPath, 'dist');
                    const buildPath = path.join(projectPath, 'build');
                    
                    let sourcePath = null;
                    if (fs.existsSync(distPath)) sourcePath = distPath;
                    else if (fs.existsSync(buildPath)) sourcePath = buildPath;

                    if (sourcePath) {
                        const destPath = path.join(publicDir, project);
                        log(`Copying ${project} from ${sourcePath} to /public/${project}`);
                        fs.cpSync(sourcePath, destPath, { recursive: true });
                    } else {
                        log(`Skipping ${project} - No dist/build folder found.`);
                    }
                }
            }

            log('--------------------------------------------------');
            log('Packaging Complete.');
            log(`App is ready at: ${appDir}`);
            log('You can now navigate to the "app" folder and run "node index.js" (after installing dependencies).');

        } catch (error) {
            log(`\nERROR: ${error.message}`);
            // console.error(error); // Optional server-side logging
        }

        res.end();
    }
};