document.addEventListener('DOMContentLoaded', async () => {
    const modulesNav = document.getElementById('crud-modules-nav');
    const contentArea = document.getElementById('crud-content-area');

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

    // 3. Render Content Area for specific Operation (Placeholder for now)
    function renderCrudOperation(endpoint) {
        contentArea.innerHTML = `
            <div class="max-w-4xl mx-auto h-full flex flex-col">
                <!-- Header -->
                <div class="mb-6 flex-none">
                     <div class="flex items-center gap-3 mb-2">
                        <span class="px-2 py-1 rounded bg-gray-800 text-xs font-mono text-gray-300 border border-gray-700 select-all">${endpoint.methods[0]}</span>
                        <h2 class="text-xl font-bold text-gray-100">${endpoint.label}</h2>
                        ${endpoint.isProtected ? '<span class="text-xs border border-amber-500/50 text-amber-500 px-2 py-0.5 rounded-full bg-amber-500/10">Protected</span>' : '<span class="text-xs border border-green-500/50 text-green-500 px-2 py-0.5 rounded-full bg-green-500/10">Public</span>'}
                     </div>
                     <div class="flex items-center gap-2 text-sm text-gray-400 font-mono bg-gray-900/50 px-3 py-2 rounded border border-gray-800">
                        <span class="text-indigo-400">POST</span>
                        <span class="select-all">${endpoint.route}</span>
                     </div>
                     <p class="text-gray-500 text-sm mt-3">${endpoint.description}</p>
                </div>

                <!-- Input/Output Area (Grid) -->
                <div class="grid grid-cols-2 gap-6 flex-1 min-h-0">
                    <!-- Request -->
                    <div class="flex flex-col h-full">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-xs font-bold text-gray-500 uppercase">Request Body</h3>
                            <div class="flex gap-2">
                                <!-- Suggested Presets -->
                                ${endpoint.suggested ? `
                                <div class="relative group/presets">
                                    <button class="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-1 rounded border border-gray-700 transition">Load Preset</button>
                                    <div class="hidden group-hover/presets:block absolute right-0 top-full mt-1 w-48 bg-gray-900 border border-gray-700 rounded shadow-xl z-20 py-1">
                                        ${endpoint.suggested.map(p => `
                                            <button onclick="updateEditorContent('${btoa(p.content)}')" class="block w-full text-left px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-gray-800">
                                                ${p.name}
                                            </button>
                                        `).join('')}
                                    </div>
                                </div>
                                ` : ''}
                                <button class="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded font-medium transition shadow-lg shadow-indigo-500/20">Send Request</button>
                            </div>
                        </div>
                        <div class="flex-1 bg-gray-900 border border-gray-800 rounded-lg p-0 relative overflow-hidden group-focus-within:border-gray-700 transition-colors">
                            <textarea class="w-full h-full bg-gray-900 text-gray-300 font-mono text-sm p-4 resize-none focus:outline-none custom-scrollbar" spellcheck="false">${endpoint.sampleInput}</textarea>
                        </div>
                    </div>

                    <!-- Response -->
                    <div class="flex flex-col h-full">
                         <div class="flex items-center justify-between mb-2">
                            <h3 class="text-xs font-bold text-gray-500 uppercase">Response</h3>
                             <span class="text-xs text-gray-600">Status: <span class="text-gray-400">-</span></span>
                        </div>
                         <div class="flex-1 bg-gray-900 border border-gray-800 rounded-lg relative overflow-hidden">
                              <pre class="w-full h-full text-gray-400 font-mono text-xs p-4 overflow-auto custom-scrollbar">No response yet.</pre>
                         </div>
                    </div>
                </div>
            </div>
        `;
        
        // Helper specifically for this render scope to handle the base64 update content
        // This is a dirty way to handle onclick string injection, usually I'd use addEventListener
        window.updateEditorContent = (b64) => {
             const decoded = atob(b64);
             const textarea = contentArea.querySelector('textarea');
             if(textarea) textarea.value = decoded;
        };
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
