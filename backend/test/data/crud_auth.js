var crudAuth = {
    label: "Authentication",
    api: [
        {
            label: "Login",
            route: "/api/auth/login",
            methods: ["POST"],
            description: "Authenticates a user with email and password. Returns session and token.",
            sampleInput: '{\n  "email": "test@test.com",\n  "password": "test"\n}',
            suggested: [
                { name: "Admin", content: '{\n  "email": "admin@admin.com",\n  "password": "Admin123"\n}' },
                { name: "CusRaRa", content: '{\n  "email": "cusRaRa@customer.com",\n  "password": "CusRaRa526"\n}' },
                { name: "CusTaGe", content: '{\n  "email": "cusTaGe@customer.com",\n  "password": "CusTaGe789"\n}' },
                { name: "Chef", content: '{\n  "email": "chef@chef.com",\n  "password": "Chef123"\n}' },
                { name: "Delivery", content: '{\n  "email": "delivery@delivery.com",\n  "password": "Delivery123"\n}' }
            ],
            expectedOutcome: 'NOTE: a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter. \n\n {\n  "message": "user logged in successfully",\n   "code": "LOGIN_SUCCESS"\n}',
            isProtected: false,
            isPublic: true
        }
    ]
};
