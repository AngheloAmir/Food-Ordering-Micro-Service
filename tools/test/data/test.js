const automatedTest = [
    {
        route: "/api/auth/login",
        method: "POST",
        body: {
            email: "admin@admin.com",
            password: "Admin123"
        },
        expectedStatus: 200,
        expectedResponse: {
            message: "user logged in successfully",
            code:    "LOGIN_SUCCESS",
        }
    },
    {
        route: "/api/auth/login",
        method: "POST",
        body: {
            email: "admin@admin.com",
            password: "Admin123"
        },
        expectedStatus: 200,
        expectedResponse: {
            message: "Login successful"
        }
    },
]