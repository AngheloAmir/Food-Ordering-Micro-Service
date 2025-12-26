const authData = {
    accounts: [
        {
            label: "Admin",
            email: "admin@admin.com",
            password: "Admin123",
            role: "Administrator",
            color: "indigo"
        },
        {
            label: "RaRa",
            email: "cusRaRa@customer.com",
            password: "CusRaRa526",
            role: "Customer",
            color: "green"
        },
        {
            label: "Tage",
            email: "cusTage@customer.com",
            password: "CusTaGe789",
            role: "Customer",
            color: "green"
        },
        {
            label: "Chef",
            email: "chef@chef.com",
            password: "Chef123",
            role: "Chef",
            color: "orange"
        },
        {
            label: "Delivery",
            email: "delivery@delivery.com",
            password: "Delivery123",
            role: "Delivery",
            color: "orange"
        }
    ],
    routes: {
        login: {
            url: "/api/auth/login",
            method: "POST",
            bodyTemplate: "{\n  \"email\": \"%email\",\n  \"password\": \"%password\"\n}"
        },
        logout: {
            url: "/api/auth/logout",
            method: "POST"
        }
    },
    description: `
        <h3 class="text-lg font-semibold text-gray-200 mb-2">Authentication Module</h3>
        <p class="text-gray-400 text-sm mb-4">
            This module handles user authentication for the API. 
            Use the provided quick search cards to test different user roles.
        </p>
        <ul class="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li><span class="text-gray-300">Admin</span>: Full access to all resources.</li>
            <li><span class="text-gray-300">Customer</span>: Limited access to ordering and profile.</li>
            <li><span class="text-gray-300">Vendor</span>: Manage products and orders.</li>
        </ul>
        <div class="mt-4 p-3 bg-gray-800/50 rounded border border-gray-700">
            <p class="text-xs text-indigo-400">
                <span class="font-bold">Note:</span> 
                Passwords are unmasked for testing convenience.
            </p>
        </div>
    `
};
