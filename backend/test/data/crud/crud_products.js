var crudProducts = {
    label: "Products and Invetory",
     api: [
            {
                label: "get all products",
                route: "/api/products/getall",
                methods: ["GET"],
                description: "Return all products. No authentication required.",
                sampleInput: '{}',
                suggested: [],
                expectedOutcome: 'URL Params: search, category\n\n{\n  "message": "Products fetched successfully"\n  "data": [ ... ]\n}',
                isProtected: false,
                isPublic: true
            },
                        {
                label: "get all categories",
                route: "/api/products/getcategory",
                methods: ["GET"],
                description: "Return all categories. No authentication required.",
                sampleInput: '{}',
                suggested: [],
                expectedOutcome: '{\n  "message": "Categories fetched successfully"\n  "data": [ ... ]\n}',
                isProtected: false,
                isPublic: true
            },
            {
                label: "product",
                route: "/api/products/product",
                methods: ["POST"],
                description: "Note: This is a protected route, only admin can use this route. Add, Modify or Delete a product. Request available: add, modify, delete",
                sampleInput: "{}",
                suggested: [
                    {
                        name: "Get All",
                        content: '{}'
                    },
                    {
                        name: "Add Burger",
                        content: '' +
`{
    "name": "Burger",
    "price": 20,
    "discount": 0,
    "description": "The best burger in world",
    "image": "default",
    "price_per_unit": 16,
    "est_cook_time": 10,
    "category": "burger",
    "ingredient_ids": [1, 2],
    "tags": ["patty", "buns"]
}`
                },
                 {
                    name: "Add Foot Long",
                    content: '' +
`{
    "name": "Foot Long",
    "price": 30,
    "discount": 0,
    "description": "Hotdog in a long bun",
    "image": "default",
    "price_per_unit": 26,
    "est_cook_time": 10,
    "category": "burger",
    "ingredient_ids": [1, 2],
    "tags": ["hotdog", "buns"]
}`
                 },
                 {
                    name: "Modify",
                    content: '' +
`{
    "modify": "FootLong",
    "name": "XFoot",
    "price": 30,
    "discount": 0,
    "description": "Hotdog in a long bun",
    "image": "default",
    "price_per_unit": 26,
    "est_cook_time": 10,
    "category": "burger",
    "ingredient_ids": [1, 2],
    "tags": ["hotdog", "buns"]
}`
                 },
                 {
                    name: "Delete",
                    content: '' +
`{
    "delete": "Foot Long"
}`
                 }
            ],
                expectedOutcome: 'Depdending on the request. Note the "modify" and "delete" attributes will set the API actions{\n   message: .... successfull message ... \n }',
                isProtected: true,
                isPublic: false
            },
            {
                label: "category",
                route: "/api/products/category",
                methods: ["POST"],
                description: "Note: This is a protected route, only admin can use this route. Add or modify a category. Request available: insert, modify, delete",
                sampleInput: '{}',
                suggested: [
                    { name: "get all", content: '{}' },
                    { name: "insert",     content: '{\n   "request": "insert",\n   "category": "test category"\n}' },
                    { name: "modify",     content: '{\n   "request": "modify",\n   "category": "test category",\n   "newname": "test category is modified"\n}' },
                    { name: "delete",     content: '{\n   "request": "delete",\n   "category": "test category"\n}' },
                ],
                expectedOutcome: 'Depdending on the request\n\n{\n  "message": "Category added successfully"\n}',
                isProtected: true,
                isPublic: false
            },
                        {
                label: "inventory",
                route: "/api/products/inventory",
                methods: ["POST"],
                description: "Note: This is a protected route, only admin can use this route. Return all inventory.",
                sampleInput: '{}',
                suggested: [{
                    name: "get all",
                    content: '{}'
                }, {
                    name: "search",
                    content: '{\n   "search": "bgr"\n}'
                }, 
                {
                        name: "Add Buns",
                        content: `{
    "name": "Buns",
    "cost_per_unit": 10,
    "available_quantity": 100
}`
                    },
                    {
                        name: "Add Patty",
                        content: `{
    "name": "Patty",
    "cost_per_unit": 25,
    "available_quantity": 50
}`,

    
                    },
                    {
                        name: "Add test",
                        content: `{
    "name": "Test",
    "cost_per_unit": 9999,
    "available_quantity": 9999
}`,
                    },
                {
                    name: "Delete",
                    content: '{\n   "delete": "Test"\n}'
                }, {
                    name: "Modify",
                    content: `{
    "modify": "Test",
    "name": "Test Modified",
    "cost_per_unit": 0,
    "available_quantity": 0
}`
                }],
                expectedOutcome: 'Depdending on the request\n\n{\n  "message": "Inventory fetched successfully"\n  "data": [ ... ]\n}',
                isProtected: true,
                isPublic: false
            },
        ]
};


