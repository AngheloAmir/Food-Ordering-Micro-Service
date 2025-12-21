const apiTests = [
    {
        category: "Authentication",
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
                label: "/api/logout",
                route: "/api/logout",
                methods: ["POST"],
                description: "Invalidates the user's session token.",
                sampleInput: '',
                suggested: [],
                expectedOutcome: '{\n  "message": "Logout successful"\n}'
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
