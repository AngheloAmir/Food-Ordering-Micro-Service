document.addEventListener('DOMContentLoaded', async () => {
    const modulesNav = document.getElementById('stream-modules-nav');
    const contentArea = document.getElementById('stream-content-area');

    // Store loaded modules
    const modules = {};

    // 1. Dynamic Loader for Stream Data Files
    async function loadStreamModules() {
        modulesNav.innerHTML = ''; // Clear loading message

        if (typeof window.STREAM_CATALOG === 'undefined') {
            console.error('STREAM_CATALOG not found. Make sure data/datastream.js is loaded.');
            modulesNav.innerHTML = '<div class="text-xs text-center text-red-500 py-4">Error loading catalog.</div>';
            return;
        }

        for (const item of window.STREAM_CATALOG) {
            try {
                // Dynamically load script
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = item.path;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.body.appendChild(script);
                });

                // Get module data from global scope
                const varName = item.varName;
                const moduleData = window[varName];

                if (moduleData) {
                    modules[varName] = moduleData;
                    renderSidebarItem(moduleData, varName);
                } else {
                    console.warn(`Module data for ${varName} not found after loading ${item.path}`);
                    modulesNav.innerHTML += `<div class="text-xs text-red-500 px-3 py-1">Missing: ${varName}</div>`;
                }

            } catch (error) {
                console.error(`Failed to load module ${item.path}:`, error);
                modulesNav.innerHTML += `<div class="text-xs text-red-500 px-3 py-1">Err: ${item.path}</div>`;
            }
        }
    }

    // 2. Render Sidebar Navigation Items (Accordion Style)
    function renderSidebarItem(moduleData, moduleKey) {
        const navItem = document.createElement('div');
        navItem.className = 'group';

        // Header (The Module Name)
        const header = document.createElement('button');
        header.className = 'w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-md transition-all focus:outline-none';
        header.innerHTML = `
            <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-indigo-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 0 0-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                ${moduleData.label}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 transition-transform transform group-[.open]:rotate-180 opacity-50">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clip-rule="evenodd" />
            </svg>
        `;

        // Submenu (The Methods)
        const submenu = document.createElement('div');
        submenu.className = 'hidden pl-4 pr-1 space-y-0.5 mt-1 border-l border-gray-800 ml-4';
        
        moduleData.api.forEach((endpoint, index) => {
            const methodBtn = document.createElement('button');
            methodBtn.className = 'w-full text-left px-3 py-1.5 text-xs text-gray-500 hover:text-indigo-400 hover:bg-gray-800/50 rounded flex items-center gap-2 transition-colors truncate';
            
            methodBtn.innerHTML = `
                <span class="font-mono font-bold text-[10px] text-gray-400">${endpoint.methods[0]}</span>
                <span class="truncate">${endpoint.label}</span>
            `;

            methodBtn.addEventListener('click', (e) => {
                // Highlight active state
                document.querySelectorAll('#stream-modules-nav button').forEach(b => b.classList.remove('text-indigo-400', 'bg-gray-800/50'));
                methodBtn.classList.add('text-indigo-400', 'bg-gray-800/50');
                
                renderStreamOperation(endpoint);
            });

            submenu.appendChild(methodBtn);
        });

        // Toggle Accordion
        header.addEventListener('click', () => {
            const isOpen = navItem.classList.contains('open');
            if (isOpen) {
                navItem.classList.remove('open');
                submenu.classList.add('hidden');
            } else {
                navItem.classList.add('open');
                submenu.classList.remove('hidden');
            }
        });

        navItem.appendChild(header);
        navItem.appendChild(submenu);
        modulesNav.appendChild(navItem);
    }

    // 3. Render Content Area for Stream Operation
    function renderStreamOperation(endpoint) {
        contentArea.innerHTML = `
            <div class="h-full flex flex-col p-6">
                 <!-- 1. Header (Left Aligned, Compact) -->
                <div class="flex-none mb-4">
                     <div class="flex items-center flex-wrap gap-3 mb-1">
                        <!-- Label -->
                        <h2 class="text-lg font-bold text-gray-100">${endpoint.label}</h2>
                        
                        <!-- Badge -->
                        ${endpoint.isProtected ? 
                            '<span class="text-[10px] border border-amber-500/50 text-amber-500 px-1.5 py-0.5 rounded bg-amber-500/10 font-medium">Private</span>' : 
                            endpoint.isPublic ? 
                            '<span class="text-[10px] border border-green-500/50 text-green-500 px-1.5 py-0.5 rounded bg-green-500/10 font-medium">Public</span>' : 
                            '<span class="text-[10px] border border-blue-500/50 text-blue-500 px-1.5 py-0.5 rounded bg-blue-500/10 font-medium">Authenticated</span>'}
                        
                        <!-- Method & Route -->
                        <div class="flex items-center gap-2 text-xs text-gray-400 font-mono bg-gray-900 px-2 py-1 rounded border border-gray-800">
                             <span class="font-bold text-violet-500">${endpoint.methods[0]}</span>
                             <span class="select-all text-gray-300 mr-2">${endpoint.route}</span>
                        </div>
                     </div>
                     
                     <!-- Description -->
                     <p class="text-gray-500 text-xs">${endpoint.description}</p>
                </div>

                <!-- 2. Controls -->
                <div class="flex-none flex items-center justify-start gap-4 mb-4">
                     <button id="btn-stream-send" class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-6 rounded shadow-sm hover:shadow text-xs transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5">
                            <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
                        </svg>
                        Send Request
                     </button>
                     <span id="stream-status" class="text-xs text-gray-500 font-mono">Status: Idle</span>
                     <span id="stream-timer" class="text-xs text-gray-500 font-mono hidden">0ms</span>
                </div>

                <!-- 3. Main Split View -->
                <div class="flex-1 min-h-0 grid grid-cols-2 gap-6 w-full">
                    
                    <!-- Left: Request Body -->
                    <div class="flex flex-col h-full overflow-hidden">
                        <h3 class="flex-none text-xs font-bold text-gray-500 uppercase mb-2">Request Body</h3>
                        <div class="flex-1 bg-gray-900 border border-gray-800 rounded-lg relative overflow-hidden group-focus-within:border-gray-600 transition-colors">
                            <textarea id="stream-body-editor" class="w-full h-full bg-gray-900 text-gray-300 font-mono text-xs p-4 resize-none focus:outline-none custom-scrollbar leading-relaxed" spellcheck="false" placeholder="Enter JSON body here...">${endpoint.sampleInput || ''}</textarea>
                        </div>
                    </div>

                    <!-- Right: Stream Output -->
                    <div class="flex flex-col h-full overflow-hidden">
                        <div class="flex-none flex items-center justify-between mb-2">
                            <h3 class="text-xs font-bold text-gray-500 uppercase">Stream Output</h3>
                            <button id="btn-clear-stream" class="text-[10px] text-gray-500 hover:text-gray-300">Clear</button>
                        </div>
                        <div class="flex-1 bg-black border border-gray-800 rounded-lg relative overflow-hidden shadow-inner">
                            <div id="stream-output-container" class="absolute inset-0 overflow-auto custom-scrollbar p-4 font-mono text-xs whitespace-pre-wrap text-green-400">waiting for stream...</div>
                        </div>
                    </div>

                </div>
            </div>
        `;

        // Logic
        const sendBtn = document.getElementById('btn-stream-send');
        const outputContainer = document.getElementById('stream-output-container');
        const bodyEditor = document.getElementById('stream-body-editor');
        const statusLabel = document.getElementById('stream-status');
        const timerLabel = document.getElementById('stream-timer');
        const clearBtn = document.getElementById('btn-clear-stream');

        if(clearBtn) {
            clearBtn.addEventListener('click', () => {
                 outputContainer.textContent = 'waiting for stream...';
                 statusLabel.textContent = 'Status: Idle';
                 statusLabel.className = 'text-xs text-gray-500 font-mono';
                 timerLabel.classList.add('hidden');
            });
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', async () => {
                outputContainer.innerHTML = ''; // Clear previous
                statusLabel.textContent = 'Status: Connecting...';
                statusLabel.className = 'text-xs text-yellow-500 font-mono';
                sendBtn.disabled = true;
                sendBtn.classList.add('opacity-50');
                
                timerLabel.textContent = '0ms';
                timerLabel.classList.remove('hidden');
                const startTime = performance.now();
                const timerInterval = setInterval(() => {
                    timerLabel.textContent = (performance.now() - startTime).toFixed(0) + 'ms';
                }, 50);

                try {
                    const baseUrl = document.getElementById('base-url-input')?.value.replace(/\/$/, '') || 'http://localhost:5199';
                    const url      = baseUrl + endpoint.route;
                    
                    const options = {
                        method: endpoint.methods[0],
                        headers: { 
                            'Content-Type': 'application/json',
                            'Accept': 'text/plain'
                        }
                    };
                    // Auth Token
                    const token = localStorage.getItem('authToken');
                    if (!endpoint.isPublic && token) {
                        options.headers['Authorization'] = `Bearer ${token}`;
                    }

       
                    // Body
                    const bodyContent = bodyEditor.value.trim();
                    if (bodyContent) {
                        try {
                            // Validate JSON
                            JSON.parse(bodyContent);
                            options.body = bodyContent;
                        } catch(e) {
                             outputContainer.innerHTML = '<span class="text-red-500">Error: Invalid JSON Body</span>';
                             throw new Error("Invalid Body");
                        }
                    }

                //Prepare the reader
                    const response = await fetch(url, options);
                    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                    
                    const reader   = response.body.getReader();
                    const decoder  = new TextDecoder();

                //UI Updates
                    statusLabel.textContent = 'Status: Streaming...';
                    statusLabel.className   = 'text-xs text-blue-400 font-mono';

                    const chunks = [];
                    let   chunktext = '';
                    while (true) {
                        const { value, done } = await reader.read()
                        if (done) break

                    //For RAW Values
                        chunks.push(value);

                    //For Decoded Values
                        const chunk = decoder.decode(value, { stream: true })
                        chunktext  += chunk

                    //do the update UI here
                        document.getElementById('stream-output-container').innerText += chunk;
                        outputContainer.scrollTop = outputContainer.scrollHeight;
                    }
                    statusLabel.textContent = 'Status: Completed';
                    statusLabel.className = 'text-xs text-green-500 font-mono';
                } catch (err) {
                    statusLabel.textContent = 'Status: Failed';
                    statusLabel.className = 'text-xs text-red-500 font-mono';
                    const errSpan = document.createElement('div');
                    errSpan.className = 'text-red-500 mt-2 border-t border-red-500/30 pt-2';
                    errSpan.textContent = err.message;
                    outputContainer.appendChild(errSpan);
                } finally {
                    clearInterval(timerInterval);
                    sendBtn.disabled = false;
                    sendBtn.classList.remove('opacity-50');
                }
            });
        }
    }

    // Initialize
    await loadStreamModules();
});
