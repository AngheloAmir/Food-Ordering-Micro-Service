
document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.getElementById('main-container');
    if (!window.data || !mainContainer) return;

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
        gridInner.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';

        section.cards.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.className = 'group bg-slate-800 rounded-xl p-6 card-hover cursor-pointer relative overflow-hidden';
            
            // Extract the base text color from the button color or default to something visible
            // We use the first button's color to theme the mini-icon background if possible, or just default slate
            // The original used specific muted colors (yellow-500/10) matching the section or card theme.
            // We'll try to derive a text color class from the section color for the icon.
            // Section color is like "bg-yellow-500". We want "text-yellow-500".
            const textColorClass = section.color.replace('bg-', 'text-');
            const bgOpacityClass = section.color.replace('bg-', 'bg-') + '/10';

            // Generate Buttons HTML
            const buttonsHTML = card.buttons.map(btn => {
                const openLink = btn.openlink ? 'true' : 'false';
                return `
                    <button onclick="executeAction('${btn.action}', ${openLink})" 
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
        mainContainer.appendChild(sectionEl);
    });
});

async function executeAction(actionRoute, openLink = false) {
    if (openLink) {
        window.open(actionRoute, '_blank');
        return;
    }

    // If it's a link (not starting with /api or similar command structure), maybe we just want to visit it?
    // User said "simple get request", so we'll fetch it. 
    // If user meant navigation for some, we might need to distinguish. 
    // But request says "action are simple get request".
    
    // However, some actions might be external links (like "Open Studio"). 
    // If action starts with http, window.open it.
    if (actionRoute.startsWith('http')) {
        window.open(actionRoute, '_blank');
        return;
    }

    try {
        const button = event.currentTarget; // Get the button that was clicked
        const originalContent = button.innerHTML;
        
        // Loading state
        button.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Working...';
        button.disabled = true;

        const response = await fetch(actionRoute);
        
        // We can check response content type or status to decide what to do.
        // For now, duplicate the logic of "confirm" or just log.
        if (response.ok) {
            // Check if JSON
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                console.log('Success:', data);
                // Maybe show a toast or alert? for now console.
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
        // Ensure button is reset even on error
         const button = event.currentTarget;
         if(button) {
             button.disabled = false;
             button.innerHTML = '<span>Retry</span><i class="fa-solid fa-rotate-right ml-2"></i>';
         }
    }
}
