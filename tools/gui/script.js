document.addEventListener('DOMContentLoaded', () => {
    const dashboardContainer = document.getElementById('dashboard-container');
    if (!window.data || !dashboardContainer) return;

    window.data.forEach(section => {
        const sectionEl = document.createElement('section');
        
        // Generate Section Header
        const headerHTML = `
            <div class="flex items-center gap-3 mb-6">
                <div class="h-8 w-1 ${section.color} rounded-full"></div>
                <h2 class="text-2xl font-bold text-gray-100">${section.title}</h2>
            </div>
        `;

        // Generate Cards Grid
        const cardsGrid = document.createElement('div');
        cardsGrid.className = 'bg-slate-900/50 rounded-2xl p-6 border border-slate-800/50 backdrop-blur-sm';
        
        const gridInner = document.createElement('div');
        gridInner.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';

        section.cards.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.className = 'group bg-slate-800 rounded-xl p-6 card-hover cursor-pointer relative overflow-hidden';
            
            const textColorClass = section.color.replace('bg-', 'text-');
            const bgOpacityClass = section.color.replace('bg-', 'bg-') + '/10';

            // Generate Buttons HTML
            // Generate Buttons HTML
            const buttonsHTML = card.buttons.map(btn => {
                // Escape single quotes (naive but usually sufficient for simple titles)
                const safeTitle = btn.title.replace(/'/g, "\\'");

                // >>> NEW: Generic Terminal Logic <<<
                if (btn.runTerminal) {
                    const termDir = btn.terminalDirectory || '';
                    // Escape quotes for the function call parameters
                    const termCmd = btn.terminalCommand ? btn.terminalCommand.replace(/'/g, "\\'") : '';
                    const termStop = btn.terminalOnStop ? btn.terminalOnStop.replace(/'/g, "\\'") : '';

                    return `
                        <button id="btn-${Date.now()}-${Math.floor(Math.random()*1000)}" 
                                onclick="executeTerminal('${termDir}', '${termCmd}', '${termStop}', '${safeTitle}', '${btn.color}')" 
                                class="w-full mt-2 flex items-center justify-center px-4 py-2 ${btn.color} hover:opacity-90 text-white text-sm font-medium rounded-lg transition-colors">
                            <span>${btn.title}</span>
                            <i class="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    `;
                }

                // >>> Existing Logic <<<
                const openLink = btn.openlink ? 'true' : 'false';
                const runCustomTerminal = btn.runCustomTerminal ? 'true' : 'false';
                const stopRoute = btn.onStop ? btn.onStop : '';
                
                return `
                    <button id="btn-${Date.now()}-${Math.floor(Math.random()*1000)}" 
                            onclick="executeAction('${btn.action}', ${openLink}, ${runCustomTerminal}, '${safeTitle}', '${btn.color}', '${stopRoute}')" 
                            class="w-full mt-2 flex items-center justify-center px-4 py-2 ${btn.color} hover:opacity-90 text-white text-sm font-medium rounded-lg transition-colors">
                        <span>${btn.title}</span>
                        <i class="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                    </button>
                `;
            }).join('');

            cardEl.innerHTML = `
                <div class="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <i class="${card.icon} text-6xl"></i>
                </div>
                <div class="flex items-start justify-between mb-4">
                    <div class="p-3 ${bgOpacityClass} ${textColorClass} rounded-lg">
                        <i class="${card.icon} text-xl"></i>
                    </div>
                </div>
                <h3 class="text-lg font-semibold text-white mb-2">${card.title}</h3>
                <p class="text-slate-400 text-sm mb-4 min-h-[40px]">${card.description}</p>
                <div class="flex flex-col gap-2">
                    ${buttonsHTML}
                </div>
            `;
            
            gridInner.appendChild(cardEl);
        });

        cardsGrid.appendChild(gridInner);
        sectionEl.innerHTML = headerHTML;
        sectionEl.appendChild(cardsGrid);
        dashboardContainer.appendChild(sectionEl);
    });
});

// --- Terminal Management Functions ---

function createTerminal(id, title, colorClass, stopRoute = '', buttonId = '') {
    const container = document.getElementById('terminals-container');
    const emptyState = container.querySelector('.empty-state');
    if(emptyState) emptyState.style.display = 'none';

    // Ensure we have a valid bg color for the header
    const headerColor = colorClass.startsWith('bg-') ? colorClass : 'bg-slate-700';

    const termEl = document.createElement('div');
    termEl.className = 'w-full bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col transition-all duration-300 animate-fade-in';
    termEl.id = id;
    
    // Accordion Header
    termEl.innerHTML = `
        <div class="${headerColor} px-4 py-3 flex items-center justify-between cursor-pointer group" onclick="toggleTerminal('${id}')">
            <div class="flex items-center gap-2 text-white font-medium">
                <i class="fa-solid fa-terminal text-white/80"></i>
                <span class="text-sm font-bold text-shadow-sm">${title}</span>
            </div>
            <div class="flex items-center gap-2">
                 <button onclick="clearTerminal('${id}'); event.stopPropagation();" class="text-white/60 hover:text-white transition-colors p-1 rounded hover:bg-white/10" title="Clear">
                    <i class="fa-solid fa-eraser text-xs"></i>
                </button>
                 <button onclick="closeTerminal('${id}', '${stopRoute}', '${buttonId}'); event.stopPropagation();" class="text-white/60 hover:text-white transition-colors p-1 rounded hover:bg-white/10" title="Close & Stop">
                    <i class="fa-solid fa-xmark text-xs"></i>
                </button>
                <i class="fa-solid fa-chevron-down text-white/60 transition-transform duration-300 chevron transform rotate-180"></i>
            </div>
        </div>
        <div class="terminal-body bg-slate-950 p-4 font-mono text-xs overflow-y-auto max-h-80 min-h-[100px] space-y-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent border-t border-slate-800 transition-all duration-300">
             <div class="text-slate-500 italic pb-2 border-b border-slate-800/50 mb-2">Initializing active session...</div>
        </div>
    `;
    
    container.prepend(termEl); 
    return termEl.querySelector('.terminal-body');
}

function toggleTerminal(id) {
    const term = document.getElementById(id);
    if (!term) return;
    
    const body = term.querySelector('.terminal-body');
    const chevron = term.querySelector('.chevron');
    
    if (body.classList.contains('hidden')) {
        body.classList.remove('hidden');
        chevron.classList.add('rotate-180');
    } else {
        body.classList.add('hidden');
        chevron.classList.remove('rotate-180');
    }
}

async function closeTerminal(id, stopRoute, buttonId) {
    // 1. If stopRoute is present, call it to stop the process
    if (stopRoute) {
        try {
            logToTerminal(id, '>>> Stopping process...', 'warning');
            await fetch(stopRoute); // Fire and forget mostly, or wait?
        } catch (e) {
            console.error("Failed to call stop route", e);
        }
    }

    // 2. Remove the terminal UI
    const term = document.getElementById(id);
    if (term) {
        term.remove();
        const container = document.getElementById('terminals-container');
        if (container.children.length <= 1) { 
             const emptyState = container.querySelector('.empty-state');
             if(emptyState) emptyState.style.display = 'block';
        }
    }

    // 3. Reset the original button if ID provided
    if (buttonId) {
        const btn = document.getElementById(buttonId);
        if (btn) {
            // We need to restore original text. We didn't save it explicitly but we know the structure.
            // Alternatively, we could have saved it in a data attribute.
            // For now, let's just make it look "ready" again.
            // The safest way is to grab the title from the button's execution context... which we don't have easily here.
            // But we know 'btn' is the element.
            // HACK: We can just set innerHTML based on a generic template or try to read a stored attribute.
            // Let's modify the create loop to store the original title in a data attribute.
            const title = btn.getAttribute('data-original-title') || 'Execute';
            btn.innerHTML = `<span>${title}</span><i class="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>`;
            btn.disabled = false;
        }
    }
}


function clearTerminal(id) {
    const term = document.getElementById(id);
    if (term) {
        const body = term.querySelector('.terminal-body');
        body.innerHTML = '<div class="text-slate-500 italic">History cleared.</div>';
    }
}

function logToTerminal(id, text, type = 'info') {
    const term = document.getElementById(id);
    if (!term) return;
    
    const body = term.querySelector('.terminal-body');
    const lines = text.split('\n');
    
    lines.forEach(line => {
        if (!line.trim()) return; 
        
        const lineEl = document.createElement('div');
        lineEl.className = 'break-words active-log';
        
        if (type === 'error' || line.toLowerCase().includes('error')) {
            lineEl.className += ' text-red-400';
        } else if (line.toLowerCase().includes('warning')) {
             lineEl.className += ' text-yellow-400';
        } else if (line.toLowerCase().includes('success')) {
             lineEl.className += ' text-green-400';
        } else {
            lineEl.className += ' text-slate-300';
        }
        
        const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        lineEl.innerHTML = `<span class="text-slate-600 mr-2 opacity-50 font-sans tracking-tight text-[10px]">[${time}]</span>${line}`;
        body.appendChild(lineEl);
    });

    body.scrollTop = body.scrollHeight;
}


async function executeAction(actionRoute, openLink = false, runCustomTerminal = false, title = 'Output', color = 'bg-slate-700', stopRoute = '') {
    if (openLink) {
        window.open(actionRoute, '_blank');
        return;
    }

    if (actionRoute.startsWith('http')) {
        window.open(actionRoute, '_blank');
        return;
    }

    const button = event.currentTarget;
    const originalContent = button.innerHTML;
    
    // Store original title if not already stored
    if (!button.hasAttribute('data-original-title')) {
        button.setAttribute('data-original-title', title);
    }
    
    try {
        if (runCustomTerminal) {
             button.innerHTML = '<span class="animate-pulse">[ Running Terminal ]</span>';
             button.disabled = true;

             const terminalId = 'term-' + Date.now();
             createTerminal(terminalId, title, color, stopRoute, button.id);
             
             try {
                 const response = await fetch(actionRoute);
                 const reader = response.body.getReader();
                 const decoder = new TextDecoder();

                 while(true) {
                     const {value, done} = await reader.read();
                     if (done) break;
                     const text = decoder.decode(value, {stream: true});
                     logToTerminal(terminalId, text);
                 }
                 logToTerminal(terminalId, '>>> Process Finished', 'success');
                 
             } catch (e) {
                 logToTerminal(terminalId, `Error: ${e.message}`, 'error');
             } finally {
                 // Revert button state after process finishes (or request finishes)
                 // NOTE: If we want the button to stay "Running" until manually closed, skip this.
                 // The user requested: "when stop, the button returns to normal".
                 // This implies the button should stay disabled/"Running" while the process is active.
                 // Fetch stream keeps connection open until server closes it.
                 // If connection closes physically (process ends), we reset.
                 // If manual close happens, we reset via closeTerminal.
                 // So we can leave this here for natural termination.
                 button.innerHTML = originalContent;
                 button.disabled = false;
             }
             return;
        }

        // Standard Action Logic
        button.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Working...';
        button.disabled = true;

        const response = await fetch(actionRoute);
        
        if (response.ok) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                console.log('Success:', data);
                // For non-terminal output, we could optionally show a toast or a generic terminal
                // But for now we stick to console logic or ignore if no UI specified
            } else {
                const text = await response.text();
                console.log('Response:', text);
            }
        } else {
            console.error('Request failed', response.status);
        }
        
         // Restore button state
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.disabled = false;
        }, 500);

    } catch (e) {
        console.error('Action error:', e);
        button.innerHTML = originalContent;
        button.disabled = false;
    }
}

async function executeTerminal(dir, cmd, stopCmd, title, color) {
    const button = event.currentTarget;
    const originalContent = button.innerHTML;

    if (!button.hasAttribute('data-original-title')) {
        button.setAttribute('data-original-title', title);
    }
    
    button.innerHTML = '<span class="animate-pulse">[ Running Terminal ]</span>';
    button.disabled = true;

    // Construct the stop route for the close button to use
    let stopRoute = '';
    if (stopCmd) {
        // We'll call /terminal-stop with query params
        stopRoute = `/terminal-stop?dir=${encodeURIComponent(dir)}&command=${encodeURIComponent(stopCmd)}`;
    }

    const terminalId = 'term-' + Date.now();
    createTerminal(terminalId, title, color, stopRoute, button.id);
    
    try {
        const response = await fetch('/terminal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                terminalDirectory: dir,
                terminalCommand: cmd
            })
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while(true) {
            const {value, done} = await reader.read();
            if (done) break;
            const text = decoder.decode(value, {stream: true});
            logToTerminal(terminalId, text);
        }
        logToTerminal(terminalId, '>>> Process Finished', 'success');
        
    } catch (e) {
        logToTerminal(terminalId, `Error: ${e.message}`, 'error');
    } finally {
        button.innerHTML = originalContent;
        button.disabled = false;
    }
}
