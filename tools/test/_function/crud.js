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
    // Session-persisted layout state (resets on refresh)
    let isExpectedOutputMinimized = false;

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
        // Layout Default: Use Session State
        const isMinimized = isExpectedOutputMinimized;

        contentArea.innerHTML = `
            <div class="h-full flex flex-col p-3">
                <!-- 1. Header (Left Aligned, Compact) -->
                <div class="flex-none mb-1">
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
                             <span id="request-size" class="text-gray-500 font-mono text-[10px] hidden border-l border-gray-700 pl-2 ml-2"></span>
                        </div>
                     </div>
                     
                     <!-- Description -->
                     <p class="text-gray-500 text-xs">${endpoint.description}</p>
                </div>

                <!-- 2. Controls (Compact Toolbar) -->
                <div class="flex-none flex items-center justify-start gap-2 mb-1">
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
                        <div class="flex-none flex items-center justify-between mb-1">
                            <h3 class="text-xs font-bold text-gray-500 uppercase">Request Body</h3>
                            <button id="btn-show-code" class="text-[10px] bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 rounded px-2 py-0.5 transition-colors focus:outline-none focus:border-indigo-500" title="Generate frontend fetch code">
                                Show Frontend Code
                            </button>
                        </div>
                        <div class="flex-1 bg-gray-900 border border-gray-800 rounded-lg relative overflow-hidden group-focus-within:border-gray-600 transition-colors">
                            <textarea id="request-body-editor" class="w-full h-full bg-gray-900 text-gray-300 font-mono text-xs p-4 resize-none focus:outline-none custom-scrollbar leading-relaxed" spellcheck="false" placeholder="Enter JSON body here...">${endpoint.sampleInput}</textarea>
                        </div>
                    </div>

                    <!-- Col 2: Actual Response -->
                    <div class="${isMinimized ? 'col-span-7' : 'col-span-4'} flex flex-col h-full overflow-hidden transition-all duration-300" id="col-response">
                         <div class="flex-none flex items-center justify-between mb-1">
                            <div class="flex items-center gap-2">
                                <h3 class="text-xs font-bold text-gray-500 uppercase">Response Output</h3>
                                <button id="btn-save-output" class="text-[10px] bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 rounded px-2 py-0.5 transition-colors focus:outline-none focus:border-indigo-500" title="Save this response to local storage">
                                    Save Output
                                </button>
                            </div>
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
                        <div class="flex-none flex items-center justify-between mb-1">
                            <div class="flex items-center gap-2">
                                <h3 class="text-xs font-bold text-gray-500 uppercase">Expected Output</h3>
                                <button id="btn-load-output" class="text-[10px] bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 rounded px-2 py-0.5 transition-colors focus:outline-none focus:border-indigo-500" title="Load saved output from local storage">
                                    Load Output
                                </button>
                            </div>
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

            <!-- Frontend Code Modal -->
            <div id="code-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-[2px] p-4 transition-opacity duration-200 opacity-0">
                <div class="bg-[#1e1e1e] border border-[#333] rounded-lg shadow-2xl w-[600px] max-w-full flex flex-col overflow-hidden transform transition-all scale-95 duration-200" id="code-modal-content">
                    <!-- Header -->
                    <div class="flex items-center justify-between px-4 py-3 border-b border-[#333] bg-[#252526]">
                        <h3 class="text-xs font-bold text-[#cccccc] uppercase tracking-wide">Frontend Fetch Code</h3>
                        <button id="btn-close-modal" class="text-[#858585] hover:text-[#cccccc] transition-colors focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                            </svg>
                        </button>
                    </div>
                    <!-- Editor Area -->
                    <div class="p-0 bg-[#1e1e1e] overflow-auto custom-scrollbar relative group max-h-[60vh]">
                        <pre id="generated-code" class="font-mono text-[13px] leading-relaxed text-[#d4d4d4] whitespace-pre-wrap p-4 select-all outline-none"></pre>
                        <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button id="btn-copy-code-icon" class="bg-[#333] hover:bg-[#444] text-[#cccccc] p-1.5 rounded-md border border-[#444] shadow-lg" title="Copy">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 is-copy-icon">
                                    <path fill-rule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-3.579-2.92-6.48-6.476-6.48H6.445a6.473 6.473 0 0 0-3.328.913 6.476 6.476 0 0 1 3.219-5.772 6.556 6.556 0 0 1 5.378-.088L12.5 4.36l.245.545c.42.934 1.156 1.765 2.115 2.228a6.52 6.52 0 0 1 1.96-1.92 6.49 6.49 0 0 1 .843-2.095ZM6.446 19.5h5.078a4.502 4.502 0 0 0 4.476-4.5V13.5h-5.078a4.476 4.476 0 0 0-4.476 4.476v1.524Z" clip-rule="evenodd" /></svg>
                             </button>
                        </div>
                    </div>
                    <!-- Footer -->
                    <div class="flex items-center justify-end px-4 py-3 border-t border-[#333] gap-2 bg-[#252526]">
                        <button id="btn-copy-code" class="bg-[#3c3c3c] hover:bg-[#4c4c4c] text-[#cccccc] font-medium py-1.5 px-3 rounded text-xs border border-[#333] transition-colors">
                            Copy Code
                        </button>
                        <button id="btn-close-modal-footer" class="bg-[#0e639c] hover:bg-[#1177bb] text-white font-medium py-1.5 px-3 rounded text-xs transition-colors shadow-md">
                            Close
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
                
                isExpectedOutputMinimized = true;
            });

            btnRestoreExp.addEventListener('click', () => {
                // Restore
                colExpectedMin.classList.remove('col-span-1');
                colExpectedMin.classList.add('hidden');
                
                colExpected.classList.remove('hidden');
                colExpected.classList.add('col-span-4'); // Ensure span is added if missing

                colResponse.classList.remove('col-span-7');
                colResponse.classList.add('col-span-4');
                
                isExpectedOutputMinimized = false;
            });
        }

        // 5. Save/Load Output Handlers
        const btnSaveOutput = contentArea.querySelector('#btn-save-output');
        const btnLoadOutput = contentArea.querySelector('#btn-load-output');
        // Global key for shared clipboard-style output across all modules
        const storageKey = 'crud_global_saved_output';

        if (btnSaveOutput) {
            btnSaveOutput.addEventListener('click', () => {
                const responseEl = document.getElementById('response-output');
                const currentContent = responseEl ? responseEl.innerText : '';
                
                if (currentContent && currentContent !== 'Waiting for request...') {
                    localStorage.setItem(storageKey, currentContent);
                    
                    // Visual Feedback
                    const originalText = btnSaveOutput.innerHTML;
                    btnSaveOutput.textContent = 'Saved!';
                    btnSaveOutput.classList.add('text-green-400', 'border-green-500/50');
                    
                    setTimeout(() => {
                        btnSaveOutput.innerHTML = originalText;
                        btnSaveOutput.classList.remove('text-green-400', 'border-green-500/50');
                    }, 1000);
                } else {
                     // Error Feedback?
                }
            });
        }

        if (btnLoadOutput) {
            btnLoadOutput.addEventListener('click', () => {
                const savedContent = localStorage.getItem(storageKey);
                if (savedContent) {
                    const expectedEl = colExpected.querySelector('pre');
                    if (expectedEl) {
                        expectedEl.textContent = savedContent;
                        
                        // Visual Feedback
                        const originalText = btnLoadOutput.innerHTML;
                        btnLoadOutput.textContent = 'Loaded!';
                        btnLoadOutput.classList.add('text-green-400', 'border-green-500/50');
                        
                        setTimeout(() => {
                            btnLoadOutput.innerHTML = originalText;
                            btnLoadOutput.classList.remove('text-green-400', 'border-green-500/50');
                        }, 1000);
                    }
                } else {
                    alert('No saved output found for this request.');
                }
            });
        }

        // 6. Show Frontend Code Modal Logic
        const btnShowCode = contentArea.querySelector('#btn-show-code');
        const modal = contentArea.querySelector('#code-modal');
        const modalContent = contentArea.querySelector('#code-modal-content');
        const btnCloseModal = contentArea.querySelector('#btn-close-modal');
        const btnCloseModalFooter = contentArea.querySelector('#btn-close-modal-footer');
        const btnCopyCode = contentArea.querySelector('#btn-copy-code');
        const btnCopyCodeIcon = contentArea.querySelector('#btn-copy-code-icon');
        const codePre = contentArea.querySelector('#generated-code');

        function toggleModal(show) {
            if (show) {
                modal.classList.remove('hidden');
                // Small delay for transition
                requestAnimationFrame(() => {
                    modal.classList.remove('opacity-0');
                    modalContent.classList.remove('scale-95');
                    modalContent.classList.add('scale-100');
                });
            } else {
                modal.classList.add('opacity-0');
                modalContent.classList.remove('scale-100');
                modalContent.classList.add('scale-95');
                setTimeout(() => {
                    modal.classList.add('hidden');
                }, 200);
            }
        }

        if (btnShowCode && modal) {
            btnShowCode.addEventListener('click', () => {
                const method = endpoint.methods[0];
                const baseUrl = document.getElementById('base-url-input')?.value.replace(/\/$/, '') || 'http://localhost:5199';
                const urlParams = document.getElementById('url-params-input')?.value.trim() || '';
                const route = endpoint.route; // Assuming route already has leading slash
                const fullUrl = `${baseUrl}${route}${urlParams}`;
                const bodyContent = document.getElementById('request-body-editor')?.value;

                let jsCode = ``;
                // jsCode += `const endpoint = '${fullUrl}';\n`; // Removed per request
                
                // Simplified Fetch Statement
                jsCode += `const response = await fetch('${fullUrl}', {\n`;
                jsCode += `    <span class="text-orange-400">method</span>: '${method}',\n`;
                jsCode += `    <span class="text-orange-400">headers</span>: {\n`;
                jsCode += `        '<span class="text-orange-400">Content-Type</span>': 'application/json'`;
                if (!endpoint.isPublic) {
                    jsCode += `,\n        '<span class="text-orange-400">Authorization</span>': \`Bearer \${accessToken}\``;
                    jsCode += `,\n        '<span class="text-orange-400">x-refresh-token</span>': refreshToken`;
                }
                jsCode += `\n    }`;

                if (method !== 'GET' && method !== 'HEAD' && bodyContent.trim()) {
                    try {
                        const jsonBody = JSON.parse(bodyContent);
                        // Helper to color keys in JSON body
                        const colorizeJsonKeys = (obj, indentLevel = 2) => {
                             const indent = '    '.repeat(indentLevel);
                             const innerIndent = '    '.repeat(indentLevel + 1);
                             let str = '{\n';
                             const keys = Object.keys(obj);
                             keys.forEach((key, index) => {
                                 const val = obj[key];
                                 let valStr;
                                 if (typeof val === 'object' && val !== null) {
                                     valStr = colorizeJsonKeys(val, indentLevel + 1);
                                 } else if (typeof val === 'string') {
                                     valStr = `'${val}'`;
                                 } else {
                                     valStr = val;
                                 }
                                 str += `${innerIndent}<span class="text-orange-400">${key}</span>: ${valStr}`;
                                 if (index < keys.length - 1) str += ',';
                                 str += '\n';
                             });
                             str += `${indent}}`;
                             return str;
                        };
                        
                        // We need to insert this into the string template properly
                        // This simplistic approach might break if not careful with formatting
                        // Reverting to standard JSON.stringify for complex objects but attempting to color main keys if simple
                         const indentedJson = JSON.stringify(jsonBody, null, 4).replace(/\n/g, '\n    ');
                         // Regex replace keys to add color span
                         const coloredJson = indentedJson.replace(/"([^"]+)":/g, '<span class="text-orange-400">$1</span>:');
                         
                        jsCode += `,\n    <span class="text-orange-400">body</span>: JSON.stringify(${coloredJson})`;
                    } catch (e) {
                        jsCode += `,\n    <span class="text-orange-400">body</span>: JSON.stringify(${bodyContent.trim()})`; 
                    }
                }

                jsCode += `\n});`;

                // Set HTML content instead of textContent to render spans
                codePre.innerHTML = jsCode;
                toggleModal(true);
            });

            // Close Handlers
            [btnCloseModal, btnCloseModalFooter].forEach(btn => {
                if(btn) btn.addEventListener('click', () => toggleModal(false));
            });
            
            // Click outside to close
            modal.addEventListener('click', (e) => {
                if (e.target === modal) toggleModal(false);
            });
            
            // Copy Handlers
            [btnCopyCode, btnCopyCodeIcon].forEach(btn => {
                if(btn) {
                    btn.addEventListener('click', () => {
                        navigator.clipboard.writeText(codePre.textContent).then(() => {
                            const originalText = btn.innerText;
                            if(btn.id === 'btn-copy-code') btn.textContent = 'Copied!';
                            else btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-green-500"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" /></svg>';
                            
                            setTimeout(() => {
                                if(btn.id === 'btn-copy-code') btn.textContent = 'Copy Code';
                                else btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 is-copy-icon"><path fill-rule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-3.579-2.92-6.48-6.476-6.48H6.445a6.473 6.473 0 0 0-3.328.913 6.476 6.476 0 0 1 3.219-5.772 6.556 6.556 0 0 1 5.378-.088L12.5 4.36l.245.545c.42.934 1.156 1.765 2.115 2.228a6.52 6.52 0 0 1 1.96-1.92 6.49 6.49 0 0 1 .843-2.095ZM6.446 19.5h5.078a4.502 4.502 0 0 0 4.476-4.5V13.5h-5.078a4.476 4.476 0 0 0-4.476 4.476v1.524Z" clip-rule="evenodd" /></svg>';
                            }, 1500);
                        });
                    });
                }
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
                const sizeDisplay = document.getElementById('request-size');
                timerDisplay.classList.remove('hidden');
                if (sizeDisplay) sizeDisplay.classList.add('hidden');
                
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
                    const refreshToken = localStorage.getItem('refreshToken');
                    if (refreshToken) {
                        options.headers['x-refresh-token'] = refreshToken;
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
                    
                    if (sizeDisplay) {
                        const size = JSON.stringify(data).length;
                        sizeDisplay.textContent = `${size.toLocaleString()} Bytes`;
                        sizeDisplay.classList.remove('hidden');
                    }

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
