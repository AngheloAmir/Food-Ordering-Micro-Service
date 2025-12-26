document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const startBtn = document.getElementById('btn-start-test');
    const timerDisplay = document.getElementById('test-timer');
    const totalCountEl = document.getElementById('test-count-total');
    const successCountEl = document.getElementById('test-count-success');
    const failedCountEl = document.getElementById('test-count-failed');
    const failedListContainer = document.getElementById('test-failed-list-container');
    const failedList  = document.getElementById('test-failed-list');
    const statusText  = document.getElementById('test-status-text');
    const progressBar = document.getElementById('test-progress-bar');

    let isRunning = false;
    let timerInterval = null;
    let startTime = 0;

    // Helper: Format Time
    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        const centis = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
        return `${minutes}:${seconds}.${centis}`;
    }

    // Helper: Delay
    const delay = ms => new Promise(res => setTimeout(res, ms));

    // Helper: Syntax Highlighter
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

    // Helper: Partial Match for Objects
    function isSubset(subset, superset) {
        if (typeof subset !== 'object' || subset === null) return subset === superset;
        for (const key in subset) {
            if (Object.prototype.hasOwnProperty.call(subset, key)) {
                if (!superset || !Object.prototype.hasOwnProperty.call(superset, key)) return false;
                if (typeof subset[key] === 'object' && subset[key] !== null) {
                    if (!isSubset(subset[key], superset[key])) return false;
                } else if (subset[key] !== superset[key]) {
                    return false;
                }
            }
        }
        return true;
    }

    if (startBtn) {
        startBtn.addEventListener('click', async () => {
            if (isRunning) return;
            isRunning = true;
            startBtn.disabled = true;
            startBtn.classList.add('opacity-50', 'cursor-not-allowed');
            
            // Reset UI
            totalCountEl.textContent = automatedTest.length;
            successCountEl.textContent = '0';
            failedCountEl.textContent = '0';
            failedList.innerHTML = '';
            failedListContainer.classList.add('hidden');
            statusText.textContent = 'Initializing...';
            progressBar.style.width = '0%';
            timerDisplay.textContent = '00:00.00';

            // Start Timer
            startTime = performance.now();
            timerInterval = setInterval(() => {
                const current = performance.now();
                timerDisplay.textContent = formatTime(current - startTime);
            }, 50);

            // Get Base URL (reuse logic from auth/crud)
            const baseUrlInput = document.getElementById('base-url-input');
            const baseUrl = baseUrlInput?.value.replace(/\/$/, '') || 'http://localhost:5199';

            let successCount = 0;
            let failedCount = 0;

            // Execute Tests
            for (let i = 0; i < automatedTest.length; i++) {
                const test = automatedTest[i];
                const index = i + 1;
                
                // Update Status
                statusText.textContent = `Testing [${index}/${automatedTest.length}]: ${test.method} ${test.route}`;
                statusText.className = 'text-xs text-indigo-400 font-mono bg-gray-950 px-2 py-1 rounded border border-indigo-500/30 animate-pulse';
                
                // Construct URL
                let finalUrl = test.route;
                if (!test.route.startsWith('http')) {
                    finalUrl = baseUrl + test.route;
                }

                const options = {
                    method: test.method,
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                };
                
                // Fallback token authentication
                const token = localStorage.getItem('authToken');
                if (token) {
                    options.headers['Authorization'] = `Bearer ${token}`;
                }

                if (test.body && test.method !== 'GET') {
                    options.body = JSON.stringify(test.body);
                }

                try {
                    // Small delay for visual effect
                    await delay(300); 

                    const response = await fetch(finalUrl, options);
                    const data = await response.json().catch(() => ({})); // Handle empty/text response

                    let passed = true;
                    let failureReason = '';

                    // Check Status
                    if (test.expectedStatus && response.status !== test.expectedStatus) {
                        passed = false;
                        failureReason = `Status mismatch: Expected ${test.expectedStatus}, got ${response.status}`;
                    }

                    // Check Response Body (Subset Match)
                    if (passed && test.expectedResponse) {
                        if (!isSubset(test.expectedResponse, data)) {
                            passed = false;
                            failureReason = `Response mismatch`;
                        }
                    }

                    if (passed) {
                        successCount++;
                        successCountEl.textContent = successCount;
                    } else {
                        failedCount++;
                        failedCountEl.textContent = failedCount;
                        failedListContainer.classList.remove('hidden');
                        
                        const li = document.createElement('li');
                        li.className = 'bg-black/50 border border-red-900/40 rounded-lg p-4 shadow-sm';
                        
                        // Use Syntax Highlight
                        const actualHtml = syntaxHighlight(data);
                        const expectedHtml = syntaxHighlight(test.expectedResponse || {});

                        li.innerHTML = `
                            <div class="flex items-center justify-between mb-3 border-b border-red-900/30 pb-2">
                                <div class="flex items-center gap-2">
                                    <span class="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">FAILED</span>
                                    <span class="font-mono text-xs text-red-200 font-bold tracking-wide">${test.method} ${test.route}</span>
                                </div>
                                <div class="text-[10px] text-red-400 font-mono italic">${failureReason}</div>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <!-- Actual -->
                                <div class="flex flex-col overflow-hidden">
                                    <div class="text-[10px] text-gray-500 uppercase font-bold mb-1.5 pl-1 flex items-center gap-1">
                                        <div class="w-1.5 h-1.5 rounded-full bg-red-500"></div> Output
                                    </div>
                                    <div class="bg-gray-950 border border-gray-800 rounded-lg p-3 overflow-auto custom-scrollbar max-h-48 shadow-inner relative group">
                                         <pre class="text-[10px] font-mono whitespace-pre-wrap text-gray-300 leading-relaxed">${actualHtml}</pre>
                                    </div>
                                </div>
                                <!-- Expected -->
                                <div class="flex flex-col overflow-hidden">
                                     <div class="text-[10px] text-gray-500 uppercase font-bold mb-1.5 pl-1 flex items-center gap-1">
                                        <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div> Expected
                                     </div>
                                    <div class="bg-gray-900 border border-gray-800 rounded-lg p-3 overflow-auto custom-scrollbar max-h-48 shadow-inner">
                                        <pre class="text-[10px] font-mono whitespace-pre-wrap text-gray-300 leading-relaxed opacity-80">${expectedHtml}</pre>
                                    </div>
                                </div>
                            </div>
                        `;
                        failedList.appendChild(li);
                    }

                } catch (error) {
                    failedCount++;
                    failedCountEl.textContent = failedCount;
                    failedListContainer.classList.remove('hidden');

                    const li = document.createElement('li');
                    li.className = 'bg-black/50 border border-red-900/40 rounded-lg p-4 shadow-sm';
                    li.innerHTML = `
                        <div class="flex items-center gap-2 mb-2">
                             <span class="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">ERROR</span>
                             <span class="font-bold text-red-200 font-mono text-xs">${test.method} ${test.route}</span>
                        </div>
                        <div class="text-xs text-red-400 font-mono">Network/System Error: ${error.message}</div>
                    `;
                    failedList.appendChild(li);
                }

                // Update Progress
                const progress = (index / automatedTest.length) * 100;
                progressBar.style.width = `${progress}%`;
            }

            // Stop Timer
            clearInterval(timerInterval);
            isRunning = false;
            
            // Final Status
            if (failedCount === 0) {
                statusText.textContent = 'All Tests Passed Successfully!';
                statusText.className = 'text-xs text-green-400 font-bold font-mono bg-green-500/10 px-3 py-1.5 rounded border border-green-500/30 shadow-sm';
                progressBar.classList.add('bg-green-500');
                progressBar.classList.remove('bg-indigo-500');
            } else {
                statusText.textContent = `Test Run Complete: ${failedCount} Failed`;
                statusText.className = 'text-xs text-red-400 font-bold font-mono bg-red-500/10 px-3 py-1.5 rounded border border-red-500/30 shadow-sm animate-pulse';
                progressBar.classList.add('bg-red-500');
                progressBar.classList.remove('bg-indigo-500');
            }

            // Re-enable button
            startBtn.disabled = false;
            startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            startBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
                </svg>
                Restart Test`;
        });
    }
});
