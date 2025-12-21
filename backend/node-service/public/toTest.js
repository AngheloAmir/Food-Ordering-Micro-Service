const apiTests = [
    {
        category: "General Tests",
        items: [
            {
                label: "/api/test",
                route: "/api/test",
                methods: ["GET", "POST"],
                description: "Basic test endpoint to verify API connectivity. Supports GET and POST.",
                sampleInput: '{}',
                suggested: [
                    { name: "Empty Object", content: "{}" },
                    { name: "With Key", content: "{\n  \"key\": \"value\"\n}" }
                ],
                expectedOutcome: '{\n  "message": "This is a test endpoint",\n  "timestamp": "..."\n}'
            },
            {
                label: "/api/testdb",
                route: "/api/testdb",
                methods: ["GET"],
                description: "Retrieves a specific test record from the Supabase database. Checks DB connection.",
                sampleInput: '{}',
                suggested: [],
                expectedOutcome: '{\n  "message": "test 2 is found",\n  "data": [\n    {\n      "id": "...",\n      "testtext": "test 2",\n      "created_at": "..."\n    }\n  ]\n}'
            }
        ]
    },
    {
        category: "Authentication Tests",
        items: [
            {
                label: "/api/login",
                route: "/api/login",
                methods: ["POST"],
                description: "Authenticates a user with email and password. Returns session and token.",
                sampleInput: '{\n  "email": "admin@admin.com",\n  "password": "admin"\n}',
                suggested: [
                    { name: "Admin Creds", content: '{\n  "email": "admin@admin.com",\n  "password": "admin"\n}' },
                    { name: "Invalid Creds", content: '{\n  "email": "wrong@test.com",\n  "password": "wrong"\n}' }
                ],
                expectedOutcome: '{\n  "message": "Login successful",\n  "session": {...},\n  "user": {...}\n}'
            },
            {
                label: "/api/verify-token",
                route: "/api/verify-token",
                methods: ["GET"],
                description: "Verifies the validity of the provided Bearer token.",
                sampleInput: '',
                suggested: [],
                expectedOutcome: '{\n  "message": "Token is valid",\n  "user": { ... }\n}'
            },
            {
                label: "/api/logout",
                route: "/api/logout",
                methods: ["POST"],
                description: "Invalidates the user's session token.",
                sampleInput: '',
                suggested: [],
                expectedOutcome: '{\n  "message": "Logout successful"\n}'
            },
            {
                label: "/api/verify-login",
                route: "/api/verify-login",
                methods: ["POST"],
                description: "Checks login status or authenticates if not logged in. Returns login info including device/IP.",
                sampleInput: '{\n  "email": "admin@admin.com",\n  "password": "admin"\n}',
                suggested: [
                    { name: "Admin Creds", content: '{\n  "email": "admin@admin.com",\n  "password": "admin"\n}' }
                ],
                expectedOutcome: '{\n  "message": "Login verification successful",\n  "access_token": "...",\n  "login_info": {\n    "ip_address": "...",\n    "device": { "browser": "..." },\n    "location": { "country": "..." }\n  }\n}'
            },
            {
                label: "/api/authdbtest",
                route: "/api/authdbtest",
                methods: ["GET"],
                description: "Test RLS policies. Returns 'testuser' data only for the authenticated user.",
                sampleInput: '',
                suggested: [],
                expectedOutcome: '{\n  "message": "Authenticated DB query successful",\n  "data": [ { ... } ]\n}'
            }
        ]
    },
    {
        category: "Products (Mock)",
        items: [
            {
                label: "/api/products/list",
                route: "/api/products/list",
                methods: ["GET"],
                description: "Mock endpoint to list all available products.",
                sampleInput: '',
                suggested: [],
                expectedOutcome: '{\n  "products": []\n}'
            }
        ]
    }
];
