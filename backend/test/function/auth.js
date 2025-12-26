document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const emailInput = document.getElementById('auth-email');
    const passwordInput = document.getElementById('auth-password');
    const loginForm = document.getElementById('auth-form');
    const accountsList = document.getElementById('auth-accounts-list');
    const descriptionContainer = document.getElementById('auth-description');
    const authError = document.getElementById('auth-error');
    const authErrorText = document.getElementById('auth-error-text');

    // 1. Render Quick Login Cards
    if (typeof authData !== 'undefined' && authData.accounts) {
        authData.accounts.forEach(account => {
            const card = document.createElement('button');
            card.type = 'button';
            // Styling for the card: "Card in the left side"
            card.className = "w-full text-left bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 p-3 rounded-lg transition-all group relative overflow-hidden";
            
            // Dynamic Color Border Indicator
            const borderColor = account.color === 'indigo' ? 'border-indigo-500' : 
                                account.color === 'green' ? 'border-green-500' : 
                                account.color === 'orange' ? 'border-orange-500' : 'border-gray-500';

            card.innerHTML = `
                <div class="absolute left-0 top-0 bottom-0 w-1 ${account.color ? 'bg-' + account.color + '-500' : 'bg-gray-500'}"></div>
                <div class="pl-2">
                    <div class="flex justify-between items-center mb-1">
                        <span class="font-semibold text-gray-200 text-sm">${account.label}</span>
                        <span class="text-[10px] uppercase tracking-wider font-bold bg-gray-950 text-gray-400 px-1.5 py-0.5 rounded border border-gray-800">${account.role || 'User'}</span>
                    </div>
                    <div class="text-xs text-gray-500 font-mono truncate">${account.email}</div>
                </div>
            `;

            // Click Handler for Quick Login
            card.addEventListener('click', () => {
                emailInput.value = account.email;
                passwordInput.value = account.password;

                // Visual Feedback on Inputs
                [emailInput, passwordInput].forEach(input => {
                    input.classList.add('bg-indigo-900/20', 'border-indigo-500');
                    setTimeout(() => {
                        input.classList.remove('bg-indigo-900/20', 'border-indigo-500');
                    }, 500);
                });

                // Optional: Auto-focus submit button or just inputs
                passwordInput.focus();
            });

            accountsList.appendChild(card);
        });
    }

    // 2. Render Description
    if (typeof authData !== 'undefined' && authData.description) {
        descriptionContainer.innerHTML = authData.description;
    }

    // 3. Form Submission Handler
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;

        // Reset Error State
        authError.classList.add('hidden');
        authErrorText.textContent = '';

        // Visual loading state (mock)
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing In...
        `;
        submitBtn.disabled = true;

        if (!authData?.routes?.login) {
            console.error('Login route configuration missing in authData');
            authErrorText.textContent = 'Configuration Error: Login route missing.';
            authError.classList.remove('hidden');
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
            return;
        }

        const { url, method, bodyTemplate } = authData.routes.login;
        
        // Prepare Body by replacing variables
        // simple replace for now, can be improved with regex if needed
        const body = bodyTemplate
            .replace('%email', email)
            .replace('%password', password);

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', //  <-- IMPORTANT: Ensure cookies are saved
                body: body
            });

            const data = await response.json();
            console.log('Login Response:', data);

            if (response.ok) {
                // Success: Update Header UI
                const userEmailDisplay = document.getElementById('user-email-display');
                if (userEmailDisplay) {
                    userEmailDisplay.innerHTML = `
                        <span class="text-sm text-gray-400">Logged in as <span class="text-indigo-400 font-semibold">${email}</span></span>
                        <button id="btn-header-logout" class="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs px-3 py-1.5 rounded-md border border-red-500/50 transition-colors flex items-center gap-1.5 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                                <path fill-rule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clip-rule="evenodd" />
                                <path fill-rule="evenodd" d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z" clip-rule="evenodd" />
                            </svg>
                            Log Out
                        </button>
                    `;
                    userEmailDisplay.classList.remove('hidden');

                    // Bind Logout Event
                    const logoutBtn = document.getElementById('btn-header-logout');
                    if (logoutBtn) {
                        logoutBtn.addEventListener('click', async (evt) => {
                            evt.preventDefault();
                            console.log('Logout clicked');
                            
                            // Optimistically hide UI
                            userEmailDisplay.classList.add('hidden');
                            userEmailDisplay.innerHTML = '';

                            if (!authData?.routes?.logout) {
                                console.error('Logout route configuration missing');
                                return;
                            }
                            const { url: logoutUrl, method: logoutMethod } = authData.routes.logout;
                            
                            try {
                                const logoutRes = await fetch(logoutUrl, { 
                                    method: logoutMethod,
                                    credentials: 'include'
                                });
                                if (logoutRes.ok) {
                                    console.log('Logged out successfully from API');
                                } else {
                                    console.error('Logout failed at API level');
                                }
                            } catch (err) {
                                console.error('Logout network error:', err);
                            }
                        });
                    }
                }
                
                // Show Success State on Button temporarily
                submitBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-2 inline-block">
                        <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
                    </svg>
                    Signed In
                `;
                submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                submitBtn.classList.remove('bg-indigo-600', 'hover:bg-indigo-500');

                // Optional: Store tokens if returned (e.g., data.token) - Implementing Basic LocalStorage for now
                const token = data.token || data.access_token || (data.session && data.session.access_token);
                if (token) {
                    localStorage.setItem('authToken', token);
                }

            } else {
                throw new Error(data.message || data.error || 'Login failed');
            }

        } catch (error) {
            console.error('Login Error:', error);
            authErrorText.textContent = error.message;
            authError.classList.remove('hidden');
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        } finally {
            // Restore button after delay if successful, or immediately if failed (handled above)
             if (submitBtn.innerText.includes('Signed In')) {
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                    submitBtn.classList.add('bg-indigo-600', 'hover:bg-indigo-500');
                }, 2000);
             }
        }
    });
});
