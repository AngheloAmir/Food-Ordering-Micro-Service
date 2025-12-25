/**
 * @typedef {Object} APITest
 * @property {string} category
 * @property {APITestItem[]} items
 */

/**
 * @typedef {Object} APITestItem
 * @property {string} label
 * @property {string} route
 * @property {string[]} methods
 * @property {string} description
 * @property {string} sampleInput
 * @property {Object[]} suggested
 * @property {string} expectedOutcome
 */
const apiTests = [
    {
        category: "Authentication",
        items: [
            {
                label: "login",
                route: "/api/auth/login",
                methods: ["POST"],
                description: "Authenticates a user with email and password. Returns session and token.",
                sampleInput: '{\n  "email": "test@test.com",\n  "password": "test"\n}',
                suggested: [
                    { name: "Admin", content:   '{\n  "email": "admin@admin.com",\n  "password": "Admin123"\n}' },
                    { name: "CusRaRa", content: '{\n  "email": "CusRaRa@customer.com",\n  "password": "CusRaRa526"\n}' },
                    { name: "CusTaGe", content: '{\n  "email": "CusTaGe@customer.com",\n  "password": "CusTaGe789"\n}' }
                ],
                expectedOutcome: 'NOTE: a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter. \n\n {\n  "message": "user logged in successfully",\n   "code": "LOGIN_SUCCESS"\n}'
            },
            {
                label: "logout",
                route: "/api/auth/logout",
                methods: ["POST"],
                description: "Invalidates the user's session token.",
                sampleInput: '{}',
                suggested: [],
                expectedOutcome: '{\n  "message": "Logout successful"\n}'
            },
            {
                label: "dbtest",
                route: "/api/auth/dbtest",
                methods: ["GET"],
                description: "This one test the RLS policies. The endpoint will return all data associated with the user in the testuser table",
                sampleInput: '{}',
                suggested: [],
                expectedOutcome: '[\n {\n    id: "...", \n    user_id: "...", \n    message: "...", \n    created_at: "...", \n  }\n]'
            },
            {
                label: "create",
                route: "/api/auth/create",
                methods: ["POST"],
                description: "Creates a new user with email and password.",
                sampleInput: '{\n  "email": "test@test.com",\n  "password": "test"\n}',
                suggested: [
                    { name: "Admin", content:   '{\n  "email": "admin@admin.com",\n  "password": "Admin123"\n}' },
                    { name: "CusRaRa", content: '{\n  "email": "CusRaRa@customer.com",\n  "password": "CusRaRa526"\n}' },
                    { name: "CusTaGe", content: '{\n  "email": "CusTaGe@customer.com",\n  "password": "CusTaGe789"\n}' }
                ],
                expectedOutcome: 'NOTE: a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter. \n\n {\n  "message": "user created successfully",\n   "newUser": true\n}'
            }
        ]
    },

    //======================================================================================
    {
        category: "User",
        items: [
            {
                label: 'getting-started',
                route: '/api/user/gettingstarted',
                methods: ["POST"],
                description: "Setting the user information after registration. NOTE: This will use the current cookie token",
                sampleInput: "" +
                    `{
    "name": "test",
    "email": "test@test.com",
    "phone1": "1234567890",
    "phone2": "1234567890",
    "address": "test address",
    "city": "test city",
    "state": "test state",
    "zip": "test zip",
    "country": "test country",
    "icon": "test icon",
    "gender": "test gender",
    "delivery_notes": "test delivery notes"
}
`,
                suggested: [
                    {
                        name: "CusRaRa", content: "" +
                            `{
    "name": "Cus Ra Ramana",
    "email": "CusRaRa@customer.com",
    "phone1": "11111111111",
    "phone2": "11111111111",
    "address": "5000 malapitan, malakas, philippines",
    "city": "malapitan",
    "state": "malakas",
    "zip": "12345",
    "country": "philippines",
    "icon": "test icon",
    "gender": "female",
    "delivery_notes": "Make sure that it is packed correctly"
}`
                    },
                    {
                        name: "CusTaGe", content: "" +
                            `{
    "name": "Cus Ta Gero",
    "email": "CusTaGe@customer.com",
    "phone1": "22222",
    "phone2": "222222",
    "address": "800 kalan, kalayaan, philippines",
    "city": "kalan",
    "state": "kalayaan",
    "zip": "12345",
    "country": "philippines",
    "icon": "test icon",
    "gender": "male",
    "delivery_notes": "Ayos basta mainit pa"
}`
                    },
                ],
                expectedOutcome: '{\n  "message": "User information updated successfully"\n}'
            },
        ]
    },
    //======================================================================================
    { 
        category: "Inventory",
        items: [
            {
                label: "list all inventory",
                route: "/api/inventory/list",
                methods: ["GET"],
                description: "Note: This is a protected route, only admin can use this route. Return all inventory.",
                sampleInput: '{}',
                suggested: [],
                expectedOutcome: 'URL Params: search\n\n{\n  "message": "Inventory fetched successfully"\n  "data": [ ... ]\n}'
            },
        ]
    },

    //======================================================================================
    {
        category: "Products",
        items: [
            {
                label: "get all products",
                route: "/api/products/getall",
                methods: ["GET"],
                description: "Return all products. No authentication required.",
                sampleInput: '{}',
                suggested: [],
                expectedOutcome: 'URL Params: search, category\n\n{\n  "message": "Products fetched successfully"\n  "data": [ ... ]\n}'
            },
            {
                label: "add product",
                route: "/api/products/add",
                methods: ["POST"],
                description: "Note: This is a protected route, only admin can use this route. Add a product.",
                sampleInput: "" +
`{
    "name": "test product",
    "price": 10,
    "discount": 0,
    "description": "test product description",
    "image": "test product image",
    "price_per_unit": 10,
    "est_cook_time": 10,
    "category": "test category",
    "ingredient_ids": ["test ingredient id 1", "test ingredient id 2"],
    "tags": ["test tag 1", "test tag 2"]
}`,
                suggested: [],
                expectedOutcome: '{\n  "message": "Product added successfully"\n}'
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
                expectedOutcome: '{\n  "message": "Category added successfully"\n}'
            },
            {
                label: "get all categories",
                route: "/api/products/getcategory",
                methods: ["GET"],
                description: "Return all categories. No authentication required.",
                sampleInput: '{}',
                suggested: [],
                expectedOutcome: '{\n  "message": "Categories fetched successfully"\n  "data": [ ... ]\n}'
            }
        ]
    },

    //======================================================================================
    {
        category: "Order and Delivery",
        items: [
            // {
            //     label: "get all orders",
            //     route: "/api/orders/getall",
            //     methods: ["GET"],
            //     description: "??",
            //     sampleInput: '{}',
            //     suggested: [],
            //     expectedOutcome: '[ ... the JSON representation of the Token from supabase ... ]'
            // }
        ]
    },

    //======================================================================================
    {
        category: "Employee",
        items: [
            {
                label: "get employee data",
                route: "/api/employee/get",
                methods: ["GET"],
                description: "Get my employee data. This uses RLS policy so make sure to login first the employee account.",
                sampleInput: '{}',
                suggested: [],
                expectedOutcome: 'Note: This use RLS policy so make sure to login first the employee account.\n\n[ { ...the employee information in the database... } ]'
            },
            {
                label: "on board an employee",
                route: "/api/employee/onboard",
                methods: ["POST"],
                description: "On board an employee",
                sampleInput: "" +
                    `{
    "passkey": "adminallow",
    "role": "employee",
    "admin_notes": "test",
    "first_name": "test",
    "last_name": "test",
    "middle_name": "test",
    "gender": "unknown",
    "phone_number": "123456789",
    "address": "test",
    "city": "test",
    "state": "test",
    "zip_code": "test",
    "country": "test",
    "emergency_contacts": "[12345789, 98765432]"
}`,
                suggested: [{
                    name: "OnBoard Admin",
                    content: "" +
                        `{
    "passkey": "adminallow",
    "role": "admin",
    "admin_notes": "This is the the admin account",
    "first_name": "Admin",
    "last_name": "Admin",
    "middle_name": ".",
    "gender": "ultimate",
    "phone_number": "123456789",
    "address": "unknown",
    "city": "unknown",
    "state": "unknown",
    "zip_code": "unknown",
    "country": "unknown",
    "emergency_contacts": "[]"
}`
                }],
                expectedOutcome: 'NOTE: Please sign in first the account that will be onboarding \nWARNING: This route modify the database without any restrictions. \nThe Passkey must not be disclosed to anyone. \n\n{\n    "message": "Employee created successfully", \n    "data": null \n}'
            }
        ]
    },

    //======================================================================================
    {
        category: "Workday",
        items: [
            // {
            //     label: "add work",
            //     route: "/api/workday/add",
            //     methods: ["POST"],
            //     description: "Add work to the workday",
            //     sampleInput: '{}',
            //     suggested: [],
            //     expectedOutcome: '[ ... the JSON representation of the Token from supabase ... ]'
            // },

        ]
    },

    //======================================================================================
    {
        category: "Tools",
        items: [
            {
                label: "cookie token decode",
                route: "/api/tools/decode",
                methods: ["POST"],
                description: "Decodes the current cookie token. Dont change the code and pass to use this tool. MUST NOT BE USED IN THE FRONTEND!",
                sampleInput: '{\n   "code": "En8aZ5y1Al7a",\n   "pass": "9cm4hHMetlb8"\n}',
                suggested: [],
                expectedOutcome: '{ ... the JSON representation of the Token from supabase ... }'
            },
            {
                label: "list all users",
                route: "/api/tools/listallusers",
                methods: ["POST"],
                description: "Lists all users",
                sampleInput: '{\n   "code": "En8aZ5y1Al7a",\n   "pass": "9cm4hHMetlb8"\n}',
                suggested: [
                    {
                        name: "Search CusRaRa",
                        content: '{\n   "code": "En8aZ5y1Al7a",\n   "pass": "9cm4hHMetlb8",\n   "email": "CusRaRa@customer.com"\n}'
                    },
                    {
                        name: "Search CusTaGe",
                        content: '{\n   "code": "En8aZ5y1Al7a",\n   "pass": "9cm4hHMetlb8",\n   "email": "CusTaGe@customer.com"\n}'
                    }
                ],
                expectedOutcome: '[ all of the users info if email is not specified ]'
            },
            // {
            //     label: "list all employees",
            //     route: "/api/tools/listallemployees",
            //     methods: ["GET"],
            //     description: "Lists all employees",
            //     sampleInput: '{}',
            //     suggested: [],
            //     expectedOutcome: '[ ... ]'
            // }
        ]
    },

    //======================================================================================



];
