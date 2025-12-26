var crudProducts = {
    label: "Products",
    api: [
        {
            label: "Get all products",
            route: "/api/products/get",
            methods: ["GET"],
            description: "Retrieve a list of all available products.",
            sampleInput: '{}',
            suggested: [],
            expectedOutcome: '[\n  {\n    "id": 1,\n    "name": "Burger",\n    "price": 100\n  }\n]',
            isProtected: false,
            isPublic: true
        }
    ]
};


