const apiTests = [
    {
        category: "General Tests",
        items: [
            {
                label: "/api/test",
                route: "/api/test",
                methods: ["GET", "POST"],
                sampleInput: '{}',
                expectedOutcome: '{\n  "message": "This is a test endpoint",\n  "timestamp": "..."\n}'
            },
            {
                label: "/api/testdb",
                route: "/api/testdb",
                methods: ["GET"],
                sampleInput: '{}',
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
                sampleInput: '{\n  "email": "admin@admin.com",\n  "password": "admin"\n}',
                expectedOutcome: '{\n  "message": "Login successful",\n  "session": {...},\n  "user": {...}\n}'
            },
            {
                label: "/api/verify-token",
                route: "/api/verify-token",
                methods: ["GET"],
                sampleInput: '',
                expectedOutcome: '{\n  "message": "Token is valid",\n  "user": { ... }\n}'
            },
            {
                label: "/api/logout",
                route: "/api/logout",
                methods: ["POST"],
                sampleInput: '',
                expectedOutcome: '{\n  "message": "Logout successful"\n}'
            },
            {
                label: "/api/verify-login",
                route: "/api/verify-login",
                methods: ["POST"],
                sampleInput: '{\n  "email": "admin@admin.com",\n  "password": "admin"\n}',
                expectedOutcome: '{\n  "message": "Login verification successful",\n  "access_token": "...",\n  ... \n} OR error if already logged in'
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
                sampleInput: '',
                expectedOutcome: '{\n  "products": []\n}'
            }
        ]
    }
];
