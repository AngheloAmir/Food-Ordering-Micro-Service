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
                expectedOutcome: '{\n  "message": "user logged in successfully",\n   "code": "LOGIN_SUCCESS"\n}'
            },
            {
                label: "/api/logout",
                route: "/api/logout",
                methods: ["POST"],
                description: "Invalidates the user's session token.",
                sampleInput: '{}',
                suggested: [],
                expectedOutcome: '{\n  "message": "Logout successful"\n}'
            },
            {
                label: "/api/authdbtest",
                route: "/api/authdbtest",
                methods: ["GET"],
                description: "This one test the RLS policies. The endpoint will return all data associated with the user in the testuser table",
                sampleInput: '{}',
                suggested: [],
                expectedOutcome: '[\n {\n    id: "...", \n    user_id: "...", \n    message: "...", \n    created_at: "...", \n  }\n]'
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
