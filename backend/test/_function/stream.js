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

    // 3. Render Content Area (Placeholder for now)
    function renderStreamOperation(endpoint) {
        contentArea.innerHTML = `
            <div class="h-full flex flex-col items-center justify-center text-gray-500">
                <h3 class="text-xl font-bold text-gray-300 mb-2">${endpoint.label}</h3>
                <p>Stream testing interface coming soon...</p>
                <code class="mt-4 bg-gray-900 p-2 rounded text-xs font-mono">${endpoint.route}</code>
            </div>
        `;
    }

    // Initialize
    await loadStreamModules();
});
