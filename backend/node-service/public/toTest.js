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
