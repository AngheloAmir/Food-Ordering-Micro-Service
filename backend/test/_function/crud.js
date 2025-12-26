document.addEventListener('DOMContentLoaded', async () => {
    const modulesNav = document.getElementById('crud-modules-nav');
    const contentArea = document.getElementById('crud-content-area');

    // Helper: JSON Syntax Highlighter
    function syntaxHighlight(json) {
        if (typeof json !== 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            if (/^"/.test(match) && /:$/.test(match)) {
                return '<span class="text-orange-400">' + match.replace(/:$/, '') + '</span>:';
            }
            return match;
        });
    }

    // Store loaded modules
    const modules = {};

    // 1. Dynamic Loader for CRUD Data Files
    async function loadCrudModules() {
        modulesNav.innerHTML = ''; // Clear loading message

        if (typeof window.CRUD_CATALOG === 'undefined') {
            console.error('CRUD_CATALOG not found. Make sure data/crud_index.js is loaded.');
            modulesNav.innerHTML = '<div class="text-xs text-center text-red-500 py-4">Error loading catalog.</div>';
            return;
        }

        for (const item of window.CRUD_CATALOG) {
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
                }

            } catch (error) {
                console.error(`Failed to load module ${item.path}:`, error);
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-indigo-500">
                    <path fill-rule="evenodd" d="M2.24 6.8a.75.75 0 0 0 1.06-.04l1.95-2.1 1.95 2.1a.75.75 0 1 0 1.1-1.02l-2.5-2.7a.75.75 0 0 0-1.1 0l-2.5 2.7a.75.75 0 0 0 .04 1.06Zm6.72 8.4a.75.75 0 0 0 1.06.04l1.95-2.1 1.95 2.1a.75.75 0 1 0 1.1-1.02l-2.5-2.7a.75.75 0 0 0-1.1 0l-2.5 2.7a.75.75 0 0 0 .04 1.06Z" clip-rule="evenodd" />
                    <path d="M10.75 12a2.38 2.38 0 0 0 2.37-2.38v-4.63h.75a.75.75 0 0 0 0-1.5H10.13c-.41 0-.75.34-.75.75v5.88c0 .26.15.5.38.63l1 .5Z" />
                    <path d="M10.13 15.5a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
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
            // Method Badge Color
            const methodColor = getMethodColor(endpoint.methods[0]);
            
            methodBtn.innerHTML = `
                <span class="font-mono font-bold text-[10px] ${methodColor}">${endpoint.methods[0]}</span>
                <span class="truncate">${endpoint.label}</span>
            `;

            methodBtn.addEventListener('click', (e) => {
                // Highlight active state
                document.querySelectorAll('#crud-modules-nav button').forEach(b => b.classList.remove('text-indigo-400', 'bg-gray-800/50'));
                methodBtn.classList.add('text-indigo-400', 'bg-gray-800/50');
                
                renderCrudOperation(endpoint);
            });

            submenu.appendChild(methodBtn);
        });

        // Toggle Accordion
        header.addEventListener('click', () => {
            const isOpen = navItem.classList.contains('open');
            // Close others (optional, keeps UI cleaner)
            // document.querySelectorAll('#crud-modules-nav .group').forEach(g => {
            //     g.classList.remove('open');
            //     g.querySelector('div').classList.add('hidden');
            // });

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

    // 3. Render Content Area for specific Operation
    function renderCrudOperation(endpoint) {
        // Load Layout Preference
        const isMinimized = localStorage.getItem('crudExpectedOutputMinimized') === 'true';

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
                             <span class="${getMethodColor(endpoint.methods[0])} font-bold">${endpoint.methods[0]}</span>
                             <span id="route-display" class="select-all text-gray-300 mr-2">${endpoint.route}</span>
                             <span id="request-timer" class="text-gray-500 font-mono text-[10px] hidden">0ms</span>
                        </div>
                     </div>
                     
                     <!-- Description -->
                     <p class="text-gray-500 text-xs">${endpoint.description}</p>
                </div>

                <!-- 2. Controls (Compact Toolbar) -->
                <div class="flex-none flex items-center justify-start gap-2 mb-2">
                     <!-- Send Button -->
                     <button class="min-w-[140px] bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-1.5 px-4 rounded shadow-sm hover:shadow text-xs transition-all active:scale-[0.98] flex items-center justify-center gap-2 h-8" id="btn-send-request">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5">
                            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                        </svg>
                        Send Request
                     </button>
                     
                     <!-- Presets Dropdown (Click Toggle) -->
                     ${endpoint.suggested && endpoint.suggested.length > 0 ? `
                     <div class="relative h-8">
                        <button id="preset-toggle-btn" class="min-w-[140px] h-full bg-gray-800 hover:bg-gray-750 text-gray-300 font-medium border border-gray-600 hover:border-gray-500 rounded text-xs transition-all flex items-center justify-between px-3 focus:outline-none focus:border-indigo-500 shadow-sm">
                            <span>Presets</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3 transition-transform duration-200" id="preset-arrow">
                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        <div id="preset-menu" class="hidden absolute left-0 top-full mt-1 w-full min-w-[160px] bg-gray-900 border border-gray-700 rounded shadow-xl z-20 py-1 max-h-60 overflow-y-auto custom-scrollbar">
                            ${endpoint.suggested.map((p, index) => `
                                <button type="button" data-index="${index}" class="preset-option-btn block w-full text-left px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-gray-800 border-b border-gray-800 last:border-0 focus:bg-gray-800 focus:outline-none">
                                    ${p.name}
                                </button>
                            `).join('')}
                        </div>
                     </div>
                     ` : ''}

                     <!-- URL Params Input -->
                     <input type="text" id="url-params-input" class="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-1.5 text-gray-300 focus:outline-none focus:border-indigo-500 transition-colors font-mono text-xs placeholder-gray-700 h-8" placeholder="URL Params (Optional)">
                </div>

                <!-- 3. Main Data Grid (3 Columns) with Collapsible Logic -->
                <div class="flex-1 min-h-0 grid grid-cols-12 gap-4 max-w-[1920px] mx-auto w-full transition-all" id="main-grid-layout">
                    
                    <!-- Col 1: Request Body (Fixed 4 cols normally) -->
                    <div class="col-span-4 flex flex-col h-full overflow-hidden" id="col-request">
                        <h3 class="flex-none text-xs font-bold text-gray-500 uppercase mb-2">Request Body</h3>
                        <div class="flex-1 bg-gray-900 border border-gray-800 rounded-lg relative overflow-hidden group-focus-within:border-gray-600 transition-colors">
                            <textarea id="request-body-editor" class="w-full h-full bg-gray-900 text-gray-300 font-mono text-xs p-4 resize-none focus:outline-none custom-scrollbar leading-relaxed" spellcheck="false" placeholder="Enter JSON body here...">${endpoint.sampleInput}</textarea>
                        </div>
                    </div>

                    <!-- Col 2: Actual Response -->
                    <div class="${isMinimized ? 'col-span-7' : 'col-span-4'} flex flex-col h-full overflow-hidden transition-all duration-300" id="col-response">
                         <div class="flex-none flex items-center justify-between mb-2">
                            <h3 class="text-xs font-bold text-gray-500 uppercase">Response Output</h3>
                            <span id="response-status" class="text-xs font-mono text-gray-600">Status: -</span>
                        </div>
                        <div class="flex-1 bg-black border border-gray-800 rounded-lg relative overflow-hidden shadow-inner">
                            <div class="absolute inset-0 overflow-auto custom-scrollbar p-4">
                                <pre id="response-output" class="text-green-500 font-mono text-xs whitespace-pre-wrap">Waiting for request...</pre>
                            </div>
                        </div>
                    </div>

                    <!-- Col 3: Expected Output -->
                    <div class="${isMinimized ? 'hidden' : 'col-span-4'} flex flex-col h-full overflow-hidden transition-all duration-300 relative" id="col-expected">
                        <div class="flex-none flex items-center justify-between mb-2">
                            <h3 class="text-xs font-bold text-gray-500 uppercase">Expected Output</h3>
                            <!-- Toggle Button (Enhanced) -->
                            <button id="btn-toggle-expected" class="flex items-center justify-center w-6 h-6 rounded bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 hover:bg-gray-700 transition-all shadow-sm focus:outline-none" title="Minimize Expected Output">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                                    <path fill-rule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div class="flex-1 bg-gray-900/50 border border-gray-800 border-dashed rounded-lg relative overflow-hidden">
                            <div class="absolute inset-0 overflow-auto custom-scrollbar p-4">
                                <pre class="text-gray-500 font-mono text-xs whitespace-pre-wrap">${endpoint.expectedOutcome}</pre>
                            </div>
                        </div>
                    </div>

                    <!-- Minimized Expected Indicator -->
                    <div class="${isMinimized ? 'col-span-1' : 'hidden'} flex flex-col h-full items-center pt-8 transition-all" id="col-expected-minimized">
                         <button id="btn-restore-expected" class="bg-gray-800 hover:bg-gray-700 text-gray-400 p-2 rounded-lg border border-gray-700 shadow-lg transition-colors hover:text-white" title="Expand Expected Output">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                <path fill-rule="evenodd" d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5Zm4.75 6.75a.75.75 0 0 1 1.5 0v2.546l.943-1.048a.75.75 0 0 1 1.114 1.004l-2.25 2.5a.75.75 0 0 1-1.114 0l-2.25-2.5a.75.75 0 1 1 1.114-1.004l.943 1.048V8.75Z" clip-rule="evenodd" />
                            </svg>
                         </button>
                    </div>

                </div>
            </div>
        `;
        
        // --- Event Handlers within this scope ---

        // 1. Preset Menu Handlers
        const presetToggleBtn = contentArea.querySelector('#preset-toggle-btn');
        const presetMenu = contentArea.querySelector('#preset-menu');
        
        if (presetToggleBtn && presetMenu) {
            // Toggle
            presetToggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isHidden = presetMenu.classList.contains('hidden');
                if (isHidden) {
                    presetMenu.classList.remove('hidden');
                    presetToggleBtn.querySelector('#preset-arrow')?.classList.add('rotate-180');
                } else {
                    presetMenu.classList.add('hidden');
                    presetToggleBtn.querySelector('#preset-arrow')?.classList.remove('rotate-180');
                }
            });

            // Close on click outside
            document.addEventListener('click', (e) => {
                if (!presetToggleBtn.contains(e.target) && !presetMenu.contains(e.target)) {
                    presetMenu.classList.add('hidden');
                    presetToggleBtn.querySelector('#preset-arrow')?.classList.remove('rotate-180');
                }
            });

            // Handle Selection
             presetMenu.querySelectorAll('.preset-option-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = parseInt(btn.getAttribute('data-index'));
                    if (!isNaN(index) && endpoint.suggested && endpoint.suggested[index]) {
                        const content = endpoint.suggested[index].content;
                        const textarea = document.getElementById('request-body-editor');
                        if(textarea) textarea.value = content;
                    }
                    presetMenu.classList.add('hidden');
                    presetToggleBtn.querySelector('#preset-arrow')?.classList.remove('rotate-180');
                });
            });
        }

        // 4. Columns Toggle Handler
        const btnToggleExp = contentArea.querySelector('#btn-toggle-expected');
        const btnRestoreExp = contentArea.querySelector('#btn-restore-expected');
        const colResponse = contentArea.querySelector('#col-response');
        const colExpected = contentArea.querySelector('#col-expected');
        const colExpectedMin = contentArea.querySelector('#col-expected-minimized');

        if(btnToggleExp && btnRestoreExp) {
            btnToggleExp.addEventListener('click', () => {
                // Minimize
                colExpected.classList.add('hidden');
                colExpectedMin.classList.remove('hidden');
                
                colResponse.classList.remove('col-span-4');
                colResponse.classList.add('col-span-7');
                
                colExpectedMin.classList.add('col-span-1');
                
                // Persist
                localStorage.setItem('crudExpectedOutputMinimized', 'true');
            });

            btnRestoreExp.addEventListener('click', () => {
                // Restore
                colExpectedMin.classList.remove('col-span-1');
                colExpectedMin.classList.add('hidden');
                colExpected.classList.remove('hidden');

                colResponse.classList.remove('col-span-7');
                colResponse.classList.add('col-span-4');
                
                // Persist
                localStorage.setItem('crudExpectedOutputMinimized', 'false');
            });
        }

        // 3. Dynamic Route Display Logic
        const paramsInput = contentArea.querySelector('#url-params-input');
        const routeDisplay = contentArea.querySelector('#route-display');
        
        if (paramsInput && routeDisplay) {
            paramsInput.addEventListener('input', (e) => {
                const val = e.target.value.trim();
                routeDisplay.textContent = endpoint.route + val;
            });
        }

        // 2. Send Request Handler
        const sendBtn = contentArea.querySelector('#btn-send-request');
        if(sendBtn) {
            sendBtn.addEventListener('click', async () => {
                const responseOutput = document.getElementById('response-output');
                const statusLabel = document.getElementById('response-status');
                const urlParams = document.getElementById('url-params-input').value.trim();
                const bodyContent = document.getElementById('request-body-editor').value;

                // UI Loading State
                responseOutput.textContent = 'Sending request...';
                responseOutput.className = 'text-yellow-500 font-mono text-xs whitespace-pre-wrap'; // Yellow for loading
                sendBtn.disabled = true;
                sendBtn.classList.add('opacity-50', 'cursor-not-allowed');

                // Timer Logic
                const timerDisplay = document.getElementById('request-timer');
                timerDisplay.classList.remove('hidden');
                const startTime = performance.now();
                const timerInterval = setInterval(() => {
                    const current = performance.now();
                    timerDisplay.textContent = `${(current - startTime).toFixed(0)}ms`;
                }, 50);

                try {
                    // Construct URL with params
                    let finalUrl = endpoint.route; 
                    // Dynamic Base URL
                    const baseUrl = document.getElementById('base-url-input')?.value.replace(/\/$/, '') || 'http://localhost:5199';
                    finalUrl = baseUrl + finalUrl + urlParams;

                    // Parse Body safely
                    let requestBody = null;
                    if (endpoint.methods[0] !== 'GET' && bodyContent.trim()) {
                         try {
                            requestBody = JSON.parse(bodyContent);
                         } catch (e) {
                             throw new Error('Invalid JSON in Request Body');
                         }
                    }

                    const options = {
                        method: endpoint.methods[0],
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include' // <-- Ensure cookies are sent
                    };
                    
                    // Fallback: Attach Token via Header if Cookies fail
                    const token = localStorage.getItem('authToken');
                    if (token) {
                        options.headers['Authorization'] = `Bearer ${token}`;
                    }
                    
                    if (requestBody) {
                        options.body = JSON.stringify(requestBody);
                    }

                    // Execute Fetch
                    const res = await fetch(finalUrl, options);
                    const data = await res.json();

                    // Update UI with Response
                    statusLabel.textContent = `Status: ${res.status} ${res.statusText}`;
                    statusLabel.className = res.ok ? 'text-xs font-mono text-green-500' : 'text-xs font-mono text-red-500';
                    
                    responseOutput.innerHTML = syntaxHighlight(data);
                    responseOutput.className = 'text-green-400 font-mono text-xs whitespace-pre-wrap';

                } catch (err) {
                     statusLabel.textContent = 'Status: Error';
                     statusLabel.className = 'text-xs font-mono text-red-500';
                     responseOutput.textContent = err.message;
                     responseOutput.className = 'text-red-500 font-mono text-xs whitespace-pre-wrap';
                } finally {
                    clearInterval(timerInterval);
                    const endTime = performance.now();
                    timerDisplay.textContent = `${(endTime - startTime).toFixed(2)}ms`;
                    
                    sendBtn.disabled = false;
                    sendBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                }
            });
        }
    }

    function getMethodColor(method) {
        switch (method) {
            case 'GET': return 'text-sky-500';
            case 'POST': return 'text-violet-500';
            case 'PUT': return 'text-amber-500';
            case 'DELETE': return 'text-rose-500';
            default: return 'text-gray-500';
        }
    }

    // Initialize
    await loadCrudModules();
});
