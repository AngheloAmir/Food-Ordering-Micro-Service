document.addEventListener('DOMContentLoaded', () => {
    const dashboardContainer = document.getElementById('dashboard-container');
    if (!window.data || !dashboardContainer) return;

    window.data.forEach(section => {
        const sectionEl = document.createElement('section');
        
        // Generate Section Header
        const headerHTML = `
            <div class="flex items-center gap-3 mb-4">
                <div class="h-6 w-1 ${section.color} rounded-full"></div>
                <h2 class="text-xl font-bold text-gray-100">${section.title}</h2>
            </div>
        `;

        // Generate Cards Grid
        const cardsGrid = document.createElement('div');
        cardsGrid.className = 'bg-slate-900/50 rounded-2xl p-4 border border-slate-800/50 backdrop-blur-sm';
        
        const gridInner = document.createElement('div');
        gridInner.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';

        section.cards.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.className = 'group bg-slate-800 rounded-xl p-4 card-hover cursor-pointer relative overflow-hidden';
            
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
                    const termRunTillStop = btn.terminalRunTillStop ? 'true' : 'false';
                    const termOpenLink = btn.terminalOpenLink ? btn.terminalOpenLink : '';

                    return `
                        <button id="btn-${Date.now()}-${Math.floor(Math.random()*1000)}" 
                                onclick="executeTerminal('${termDir}', '${termCmd}', '${termStop}', '${safeTitle}', '${btn.color}', ${termRunTillStop}, '${termOpenLink}')" 
                                class="w-full mt-1.5 flex items-center justify-center px-3 py-1.5 ${btn.color} hover:opacity-90 text-white text-xs font-medium rounded-lg transition-colors">
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
                            class="w-full mt-1.5 flex items-center justify-center px-3 py-1.5 ${btn.color} hover:opacity-90 text-white text-xs font-medium rounded-lg transition-colors">
                        <span>${btn.title}</span>
                    </button>
                `;
            }).join('');

            cardEl.innerHTML = `
                <div class="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <i class="${card.icon} text-5xl"></i>
                </div>
                <div class="flex items-start justify-between mb-3">
                    <div class="p-2 ${bgOpacityClass} ${textColorClass} rounded-lg">
                        <i class="${card.icon} text-lg"></i>
                    </div>
                </div>
                <h3 class="text-base font-semibold text-white mb-1.5">${card.title}</h3>
                <p class="text-slate-400 text-xs mb-3 min-h-[32px] leading-relaxed">${card.description}</p>
                <div class="flex flex-col gap-1.5">
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

function createTerminal(id, title, colorClass, stopRoute = '', buttonId = '', meta = {}) {
    const container = document.getElementById('terminals-container');
    const emptyState = container.querySelector('.empty-state');
    if(emptyState) emptyState.style.display = 'none';

    // Ensure we have a valid bg color for the header
    const headerColor = colorClass.startsWith('bg-') ? colorClass : 'bg-slate-700';

    const termEl = document.createElement('div');
    termEl.className = 'w-full bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col transition-all duration-300 animate-fade-in';
    termEl.id = id;
    
    // Store metadata for POST requests
    if (meta.dir) termEl.dataset.dir = meta.dir;
    if (meta.stopCmd) termEl.dataset.stopCmd = meta.stopCmd;
    
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
    console.log(`[closeTerminal] ID: ${id}, StopRoute: '${stopRoute}'`); // Debugging: Check if empty

    const term = document.getElementById(id);
    
    // 1. Abort the connection (triggers req.on('close') in backend)
    if (term && term.abortController) {
        console.log("Aborting connection...");
        term.abortController.abort();   
    }

    // 2. Execute Stop Command
    // Priority: POST request with metadata if available
    let postSent = false;
    if (term && term.dataset.dir && term.dataset.stopCmd) {
        try {
            console.log("Executing Stop Command via POST...");
            const pid = term.dataset.serverProcessId || null;
            await fetch('/terminal-stop', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dir: term.dataset.dir,
                    command: term.dataset.stopCmd,
                    pid: pid
                })
            });
            console.log("POST Stop request sent.");
            postSent = true;
        } catch (e) {
             console.error("Failed POST stop:", e);
        }
    }

    // Fallback: GET request if 'stopRoute' argument is present AND we didn't just send a POST (or we want double tap?)
    // Let's rely on POST if metadata exists. If not, use stopRoute (legacy).
    if (!postSent && stopRoute) {
        try {
            console.log(`Fetching Stop Route: ${stopRoute}`);
            await fetch(stopRoute); 
            console.log("Stop route request sent.");
        } catch (e) {
            console.error("Failed to call stop route", e);
        }
    } else if (!postSent && !stopRoute) {
        console.warn("No stopRoute or metadata provided. Skipping explicit stop command.");
    }
    
    // 3. Remove the terminal UI
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
    
    // Ignore heartbeat signals
    if (text === '-') return;

    const body = term.querySelector('.terminal-body');

    // Special handling for heartbeat dots (append to last line instead of new line)
    if (text === '.' || /^\.+$/.test(text)) {
        const lastLine = body.lastElementChild;
        if (lastLine) {
            lastLine.insertAdjacentText('beforeend', text);
            body.scrollTop = body.scrollHeight;
            return;
        }
    }

    const lines = text.split('\n');
    
    lines.forEach(line => {
        if (!line.trim()) return; 
        
        const lineEl = document.createElement('div');
        lineEl.className = 'break-words active-log font-mono';
        
        // Basic line-level styling fallback
        let baseClass = 'text-slate-300';
        if (type === 'error' ) {
            baseClass = 'text-red-400';
        } else if (type === 'warning') { // Only apply if explicit type passed, otherwise let ANSI handle it
             baseClass = 'text-yellow-400';
        } else if (type === 'success') {
             baseClass = 'text-green-400';
        }
        
        // Parse ANSI codes
        const htmlContent = parseAnsi(line);
        
        const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        // wrapper for the content to apply base color if no ANSI color provided for parts of it
        lineEl.innerHTML = `<span class="text-slate-600 mr-2 opacity-50 font-sans tracking-tight text-[10px] select-none">[${time}]</span><span class="${baseClass}">${htmlContent}</span>`;
        
        body.appendChild(lineEl);
    });

    body.scrollTop = body.scrollHeight;
}

function parseAnsi(text) {
    // Basic ANSI to HTML converter
    // Supports 30-37 (foreground), 39 (reset fg), 1 (bold), 22 (no bold), 2 (dim), 22 (no dim)
    // Also strips common cursor movements [2K, [1G, etc.
    
    if (!text) return '';

    // 1. Strip cursor controls (Clear Line, Move cursor, etc.)
    // \x1B[2K (Clear Line), \x1B[1G (Move to column 1), \x1B[?25l (Hide cursor), \x1B[?25h (Show cursor)
    let processed = text.replace(/\x1B\[[0-9;]*[KJG]/g, ''); 
    processed = processed.replace(/\x1B\[\?[0-9]*[hl]/g, '');

    // 2. Tokenize by CSI (Control Sequence Introducer)
    const parts = processed.split(/(\x1B\[[0-9;]*m)/);
    
    let html = '';
    let styleStack = []; 
    // We'll treat this simple: just wrapping in spans with classes.
    // Real terminal emulators maintain state. We will try to map common codes to tailwind classes.

    const colorMap = {
        '30': 'text-black',
        '31': 'text-red-500',
        '32': 'text-green-500', 
        '33': 'text-yellow-500',
        '34': 'text-blue-500',
        '35': 'text-purple-500',
        '36': 'text-cyan-500',
        '37': 'text-white',
        '90': 'text-gray-500', // Bright Black
        '91': 'text-red-400',
        '92': 'text-green-400',
        '93': 'text-yellow-400',
        '94': 'text-blue-400',
        '95': 'text-purple-400',
        '96': 'text-cyan-400',
        '97': 'text-white',
    };

    parts.forEach(part => {
        if (part.startsWith('\x1B[')) {
            // It's a code
            const content = part.slice(2, -1); // remove \x1B[ and m
            const codes = content.split(';');
            
            codes.forEach(code => {
                if (code === '0' || code === '39' || code === '') {
                    // Reset
                    if (styleStack.length > 0) {
                        html += '</span>'.repeat(styleStack.length);
                        styleStack = [];
                    }
                } else if (colorMap[code]) {
                    // It's a color
                    const cls = colorMap[code];
                    html += `<span class="${cls}">`;
                    styleStack.push('span');
                } else if (code === '1') {
                     html += `<span class="font-bold">`;
                     styleStack.push('span');
                } else if (code === '2') {
                     html += `<span class="opacity-75">`; // dim
                     styleStack.push('span');
                }
                // Ignore others for now
            });
        } else {
            // It's text
            html += part;
        }
    });

    // Close remaining tags
    if (styleStack.length > 0) {
        html += '</span>'.repeat(styleStack.length);
    }

    return html;
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
                     let result;
                     try {
                         result = await reader.read();
                     } catch (err) {
                         console.error("Stream read error:", err);
                         // If it's a TypeError from the stream, break
                         break;
                     }
                     
                     const {value, done} = result;
                     if (done) break;
                     
                     if (value) {
                         const text = decoder.decode(value, {stream: true});
                         logToTerminal(terminalId, text);
                     }
                 }
                 logToTerminal(terminalId, '>>> Process Finished', 'success');
                 
             } catch (e) {
                 logToTerminal(terminalId, `Error: ${e}`, 'error');
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

async function executeTerminal(dir, cmd, stopCmd, title, color, runTillStop = false, openLink = '') {
    const button = event.currentTarget;
    const originalContent = button.innerHTML;

    if (!button.hasAttribute('data-original-title')) {
        button.setAttribute('data-original-title', title);
    }

    if (openLink) {
        setTimeout(() => {
            window.open(openLink, '_blank');
        }, 3000);
    }
    
    button.innerHTML = '<span class="animate-pulse">[ Running Terminal ]</span>';
    button.disabled = true;

    // Stop Route is now legacy for terminals, we pass metadata for POST
    // But we keep the variable for createTerminal signature if needed, or pass empty.
    
    // We pass dir and stopCmd in the meta object
    const meta = { dir: dir, stopCmd: stopCmd };
    
    const terminalId = 'term-' + Date.now();
    createTerminal(terminalId, title, color, '', button.id, meta);
    
    // Create AbortController for this terminal session
    const controller = new AbortController();
    const termEl = document.getElementById(terminalId);
    if (termEl) {
        termEl.abortController = controller;
    }

    try {
        const response = await fetch('/terminal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                terminalDirectory: dir,
                terminalCommand: cmd,
                terminalRunTillStop: runTillStop
            }),
            signal: controller.signal
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while(true) {
            let result;
            try {
                result = await reader.read();
            } catch (err) {
                 console.error("Stream read error:", err);
                 break;
            }
            
            const {value, done} = result;
            if (done) break;
            
            if (value) {
                const text = decoder.decode(value, {stream: true});
                logToTerminal(terminalId, text);
            }
        }
        logToTerminal(terminalId, '>>> Process Finished', 'success');
        
    } catch (e) {
        logToTerminal(terminalId, `Error: ${e}`, 'error');
    } finally {
        button.innerHTML = originalContent;
        button.disabled = false;
    }
}
