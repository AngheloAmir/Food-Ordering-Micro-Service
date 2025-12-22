// State to track current test
let currentTestRoute = null;

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderSidebar();
    initNotes();
});

function initNotes() {
    const notesArea = document.getElementById('notes-area');
    if (!notesArea) return;

    // Load saved notes
    const savedNotes = localStorage.getItem('api_tester_notes');
    if (savedNotes) {
        notesArea.value = savedNotes;
    }

    // Save notes on input
    notesArea.addEventListener('input', (e) => {
        localStorage.setItem('api_tester_notes', e.target.value);
    });
}


function renderSidebar() {
    const listContainer = document.getElementById('test-list');
    listContainer.innerHTML = '';

    if (typeof apiTests === 'undefined') {
        listContainer.innerHTML = '<p class="text-red-400">Error: apiTests definition not found (from toTest.js)</p>';
        return;
    }

    apiTests.forEach((category, index) => {
        // Container for the whole accordion item
        const accordionItem = document.createElement('div');
        accordionItem.className = 'mb-1';

        // Header (Toggle)
        const headerBtn = document.createElement('button');
        headerBtn.className = 'w-full flex justify-between items-center px-4 py-3 text-left text-sm font-bold text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none transition-colors rounded-lg border border-gray-700';

        const titleSpan = document.createElement('span');
        titleSpan.textContent = category.category;

        // Chevron Icon
        const iconSpan = document.createElement('div');
        iconSpan.innerHTML = `<svg class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;

        headerBtn.appendChild(titleSpan);
        headerBtn.appendChild(iconSpan);

        // Content Wrapper (for animation)
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'overflow-hidden transition-all duration-300 ease-in-out';

        // Items container
        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'py-2 pl-2 space-y-1';

        // Create individual test buttons
        category.items.forEach(test => {
            const btn = document.createElement('button');
            btn.className = 'w-full text-left px-3 py-2 rounded text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition duration-150 flex items-center justify-between group';

            btn.onclick = () => loadTestHelper(test, btn);

            const nameSpan = document.createElement('span');
            nameSpan.textContent = test.label;

            const methodBadge = document.createElement('span');
            methodBadge.className = 'text-[10px] bg-gray-700 text-gray-500 px-1.5 py-0.5 rounded group-hover:bg-gray-600 group-hover:text-gray-300 transition duration-150 border border-gray-600';
            methodBadge.textContent = test.methods[0];

            btn.appendChild(nameSpan);
            btn.appendChild(methodBadge);
            itemsContainer.appendChild(btn);
        });

        contentWrapper.appendChild(itemsContainer);

        // Accordion Logic
        // By default open the first one
        let isOpen = index === 0;

        const updateState = () => {
            if (isOpen) {
                contentWrapper.style.maxHeight = contentWrapper.scrollHeight + 'px';
                iconSpan.firstElementChild.classList.add('rotate-180');
                headerBtn.classList.add('bg-gray-750'); // Optional active state style for header
            } else {
                contentWrapper.style.maxHeight = '0px';
                iconSpan.firstElementChild.classList.remove('rotate-180');
                headerBtn.classList.remove('bg-gray-750');
            }
        };

        // Initial state
        // We need to wait for DOM append to calculate scrollHeight correctly if we want precise animation, 
        // but for '0' vs 'scrollHeight' we can set inline style.
        // Actually, setting max-height to a large number or using a class is easier if we don't need perfect slide-up timing on dynamic content.
        // But let's stick to javascript height manipulation for standard accordion slide.

        headerBtn.onclick = () => {
            isOpen = !isOpen;
            updateState();
        };

        accordionItem.appendChild(headerBtn);
        accordionItem.appendChild(contentWrapper);
        listContainer.appendChild(accordionItem);

        // Run updateState after a microtask to allow rendering
        setTimeout(updateState, 0);
    });
}

function loadTestHelper(test, element) {
    // Update active state in sidebar
    const allButtons = document.querySelectorAll('#test-list button');
    allButtons.forEach(b => b.classList.remove('bg-blue-600', 'text-white', 'hover:bg-blue-700'));
    allButtons.forEach(b => {
        if (!b.classList.contains('bg-blue-600')) {
            b.classList.add('hover:bg-gray-700', 'text-gray-300');
        }
    });

    element.classList.remove('hover:bg-gray-700', 'text-gray-300');
    element.classList.add('bg-blue-600', 'text-white', 'hover:bg-blue-700');

    // Show card, hide empty state
    document.getElementById('empty-state').classList.add('hidden');
    document.getElementById('test-card').classList.remove('hidden');

    // Populate Card
    document.getElementById('card-title').textContent = "Testing: " + test.label;
    document.getElementById('card-route').textContent = test.route;
    document.getElementById('card-desc').textContent = test.description || '';

    // Set current route for execution
    currentTestRoute = test;

    // Populate methods
    const methodSelect = document.getElementById('method-select');
    methodSelect.innerHTML = '';
    test.methods.forEach(method => {
        const option = document.createElement('option');
        option.value = method;
        option.textContent = method;
        methodSelect.appendChild(option);
    });

    // Populate Input
    const inputArea = document.getElementById('input-area');
    inputArea.value = test.sampleInput || '';

    // Suggested Inputs
    const suggestedContainer = document.getElementById('suggested-inputs-container');
    suggestedContainer.innerHTML = ''; // Clear previous
    if (test.suggested && test.suggested.length > 0) {
        test.suggested.forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'text-xs bg-gray-700 hover:bg-gray-600 text-blue-300 border border-gray-600 rounded px-2 py-1 transition';
            btn.textContent = item.name;
            btn.title = "Load suggested input";
            btn.onclick = () => {
                inputArea.value = item.content;
            };
            suggestedContainer.appendChild(btn);
        });
    }

    // Populate Expected Outcome
    document.getElementById('expected-area').textContent = test.expectedOutcome || 'No expected outcome defined.';

    // Clear Output
    document.getElementById('output-area').textContent = 'Waiting for request...';
    document.getElementById('output-area').className = 'w-full border border-gray-600 rounded p-3 font-mono text-sm bg-black text-gray-500 overflow-x-auto min-h-[150px]';
}

async function executeTest() {
    if (!currentTestRoute) return;

    const endpoint = currentTestRoute.route;
    const method = document.getElementById('method-select').value;
    const inputElement = document.getElementById('input-area');
    const outputElement = document.getElementById('output-area');

    let body = null;
    let headers = {};

    outputElement.textContent = 'Loading...';
    outputElement.classList.remove('text-green-400', 'text-red-400', 'text-gray-500', 'text-yellow-400');
    outputElement.classList.add('text-yellow-400');
    outputElement.parentElement.classList.add('opacity-50');

    try {
        const inputValue = inputElement.value.trim();

        if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
            if (inputValue) {
                try {
                    // Try to parse JSON
                    body = JSON.stringify(JSON.parse(inputValue));
                    headers['Content-Type'] = 'application/json';
                } catch (e) {
                    outputElement.textContent = '' + e;
                    outputElement.classList.remove('text-yellow-400');
                    outputElement.classList.add('text-red-400');
                    outputElement.parentElement.classList.remove('opacity-50');
                    return;
                }
            }
        }

        const options = {
            method,
            headers,
            body
        };

        const response = await fetch(endpoint, options);

        const contentType = response.headers.get('content-type');
        let result;

        if (contentType && contentType.indexOf('application/json') !== -1) {
            result = await response.json();
            outputElement.textContent = JSON.stringify(result, null, 2);
        } else {
            result = await response.text();
            outputElement.textContent = result;
        }

        // Add status color
        outputElement.classList.remove('text-yellow-400', 'text-green-400', 'text-red-400', 'text-gray-500');
        if (response.ok) {
            outputElement.classList.add('text-green-400');
        } else {
            outputElement.classList.add('text-red-400');
        }

    } catch (error) {
        outputElement.textContent = 'Error: ' + error.message;
        outputElement.classList.remove('text-yellow-400');
        outputElement.classList.add('text-red-400');
    } finally {
        outputElement.parentElement.classList.remove('opacity-50');
    }
}
