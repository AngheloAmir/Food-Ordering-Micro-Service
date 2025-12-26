document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const seedAllBtn = document.getElementById('btn-seed-all');
    const timerDisplay = document.getElementById('seed-timer');
    const cardsContainer = document.getElementById('seed-cards-container');
    const seedingTabBtn = document.querySelector('.nav-item[data-tab="seeding"]');

    let isSeeding = false;
    let timerInterval = null;
    let startTime = 0;

    // Load Cards on Init and Tab Click
    function renderSeedCards() {
        if (!cardsContainer) return;
        cardsContainer.innerHTML = '';
        
        if (!window.seedData || !Array.isArray(window.seedData)) {
            cardsContainer.innerHTML = '<div class="col-span-full text-center text-gray-500">No seed data available</div>';
            return;
        }

        window.seedData.forEach((seed, index) => {
            const card = document.createElement('div');
            card.className = 'bg-gray-900 border border-gray-800 rounded-lg p-3 shadow-sm hover:border-gray-700 transition-all group relative overflow-hidden flex flex-col h-32';
            card.id = `seed-card-${index}`;

            card.innerHTML = `
                <!-- Gradient Line -->
                <div class="absolute top-0 left-0 w-1 h-full bg-gray-800 group-hover:bg-indigo-500 transition-colors"></div>

                <div class="flex-1 px-2">
                    <div class="flex items-center justify-between mb-1">
                        <h3 class="text-xs font-bold text-gray-200 truncate pr-2">${seed.label || 'Untitled Seed'}</h3>
                        <span id="badge-${index}" class="text-[10px] font-bold uppercase px-1 py-px rounded border border-gray-700 text-gray-500 bg-gray-800 scale-90 origin-right">
                            Ready
                        </span>
                    </div>
                    
                    <p class="text-[10px] text-gray-500 mb-2 line-clamp-2 leading-tight min-h-[2.5em]">${seed.description || 'No description provided.'}</p>
                    
                    <div class="mb-2">
                        <div class="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-black/30 border border-gray-800 font-mono text-[10px] text-gray-400">
                             <span class="${getMethodColor(seed.method)} font-bold">${seed.method}</span>
                             <span class="truncate max-w-[120px]">${seed.route}</span>
                        </div>
                    </div>
                </div>

                <div class="px-2 mt-auto">
                    <button class="w-full btn-seed-single bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-[10px] font-bold py-1.5 rounded border border-gray-700 transition-colors flex items-center justify-center gap-1.5" data-index="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-2.5 h-2.5">
                            <path fill-rule="evenodd" d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.9a.75.75 0 0 0-1.06-1.06L5.5 8.94a.75.75 0 0 0 0 1.06l1.83 2.9a.75.75 0 0 0 1.06-1.06L7.56 10l.83-1.1Zm2.72 1.9a.75.75 0 0 0 1.06 1.06l1.83-2.9a.75.75 0 0 0-1.06-1.06L11.5 8.94l-.83 1.1Z" clip-rule="evenodd" />
                        </svg>
                        Seed This
                    </button>
                </div>
            `;
            cardsContainer.appendChild(card);
        });

        // re-attach single listeners
        document.querySelectorAll('.btn-seed-single').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                runSingleSeed(index);
            });
        });
    }

    // Colors helper (reused from crud)
    function getMethodColor(method) {
        switch(method) {
            case 'GET': return 'text-sky-500';
            case 'POST': return 'text-emerald-500';
            case 'PUT': return 'text-amber-500';
            case 'DELETE': return 'text-rose-500';
            default: return 'text-gray-400';
        }
    }

    // Format Time Helper
    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        const centis = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
        return `${minutes}:${seconds}.${centis}`;
    }

     // Helper: Delay
    const delay = ms => new Promise(res => setTimeout(res, ms));

    // Execute Single Seed
    async function runSingleSeed(index) {
        const seed = window.seedData[index];
        const badge = document.getElementById(`badge-${index}`);
        const btn = document.querySelector(`button[data-index="${index}"]`);
        
        // UI Loading
        badge.textContent = 'Seeding...';
        badge.className = 'text-[10px] font-bold uppercase px-1 py-px rounded border border-blue-500 text-blue-400 bg-blue-500/10 animate-pulse scale-90 origin-right';
        if(btn) btn.disabled = true;

         // Get Base URL
        const baseUrlInput = document.getElementById('base-url-input');
        const baseUrl = baseUrlInput?.value.replace(/\/$/, '') || 'http://localhost:5199';
        
        let finalUrl = seed.route;
        if (!seed.route.startsWith('http')) {
            finalUrl = baseUrl + seed.route;
        }

        const options = {
            method: seed.method,
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        };

        // Fallback token
        const token = localStorage.getItem('authToken');
        if (token) {
             options.headers['Authorization'] = `Bearer ${token}`;
        }

        if (seed.body && seed.method !== 'GET') {
            options.body = JSON.stringify(seed.body);
        }

        try {
            await delay(200); // Visual delay
            const res = await fetch(finalUrl, options);
            
            // Check success (200-299)
            if (res.ok) {
                badge.textContent = 'Seeded';
                badge.className = 'text-[10px] font-bold uppercase px-1 py-px rounded border border-green-500 text-green-400 bg-green-500/10 scale-90 origin-right';
            } else {
                 badge.textContent = 'Failed to Seed';
                 badge.className = 'text-[10px] font-bold uppercase px-1 py-px rounded border border-red-500 text-red-400 bg-red-500/10 scale-90 origin-right';
            }
        } catch (err) {
            badge.textContent = 'Failed to Seed';
            badge.className = 'text-[10px] font-bold uppercase px-1 py-px rounded border border-red-500 text-red-400 bg-red-500/10 scale-90 origin-right';
        } finally {
            if(btn) btn.disabled = false;
        }
    }

    // Seed All Logic
    if (seedAllBtn) {
        seedAllBtn.addEventListener('click', async () => {
             if (isSeeding) return;
             isSeeding = true;
             seedAllBtn.disabled = true;
             seedAllBtn.classList.add('opacity-50', 'cursor-not-allowed');
             
             // Reset badges
             window.seedData.forEach((_, i) => {
                 const b = document.getElementById(`badge-${i}`);
                 if(b) {
                     b.textContent = 'Pending';
                     b.className = 'text-[10px] font-bold uppercase px-1 py-px rounded border border-gray-700 text-gray-500 bg-gray-800 scale-90 origin-right';
                 }
             });

             // Start Timer
             startTime = performance.now();
             timerInterval = setInterval(() => {
                const current = performance.now();
                timerDisplay.textContent = formatTime(current - startTime);
            }, 50);

             // Execute Sequentially
             for (let i = 0; i < window.seedData.length; i++) {
                 // Scroll to card
                 const card = document.getElementById(`seed-card-${i}`);
                 if(card) {
                     card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                     card.classList.add('border-indigo-500'); // Highlight current
                 }
                 
                 await runSingleSeed(i);
                 
                 if(card) card.classList.remove('border-indigo-500');
             }

             // Stop Timer
             clearInterval(timerInterval);
             isSeeding = false;
             seedAllBtn.disabled = false;
             seedAllBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        });
    }

    // Init Render if Tab Clicked or Already Visible
    if (seedingTabBtn) {
        seedingTabBtn.addEventListener('click', renderSeedCards);
    }
    
    // Initial render attempt (if hot reload/refresh on tab)
    if (!document.getElementById('view-seeding').classList.contains('hidden')) {
        renderSeedCards();
    }
});
