window.seedData = [
    {
        label: "Create Admin Account",
        description: "Create Admin Account",
        route: "/api/auth/register",
        method: "POST",
        body: {
            name: "Admin",
            email: "admin@admin.com",
            password: "Admin123"
        }
    },
    {
        label: "Register as Admin Employee",
        description: "Register the admin as An Employee",
        route: "/api/employee",
        method: "POST",
        body: {
            passkey: "adminallow",
            role: "admin",
            admin_notes: "This is the the admin account",
            first_name: "Admin",
            last_name: "Admin",
            middle_name: ".",
            gender: "ultimate",
            phone_number: "123456789",
            address: "unknown",
            city: "unknown",
            state: "unknown",
            zip_code: "unknown",
            country: "unknown",
            emergency_contacts: "[]"
        }
    },
    {
        label: "Create Chef Account",
        description: "Create Chef Account",
        route: "/api/auth/register",
        method: "POST",
        body: {
            name: "Chef",
            email: "chef@chef.com",
            password: "Chef123"
        }
    },
    {
        label: "Register as Chef Employee",
        description: "Register the chef as An Employee",
        route: "/api/employee",
        method: "POST",
        body: {
            passkey: "adminallow",
            role: "chef",
            admin_notes: "This is the the chef account",
            first_name: "Chef",
            last_name: "Chef",
            middle_name: ".",
            gender: "ultimate",
            phone_number: "123456789",
            address: "unknown",
            city: "unknown",
            state: "unknown",
            zip_code: "unknown",
            country: "unknown",
            emergency_contacts: "[]"
        }
    },
    {
        label: "Create Delivery Account",
        description: "Create Delivery Account",
        route: "/api/auth/register",
        method: "POST",
        body: {
            name: "Delivery",
            email: "delivery@delivery.com",
            password: "Delivery123"
        }
    },
    {
        label: "Register as Delivery Employee",
        description: "Register the delivery as An Employee",
        route: "/api/employee",
        method: "POST",
        body: {
            passkey: "adminallow",
            role: "delivery",
            admin_notes: "This is the the delivery account",
            first_name: "Delivery",
            last_name: "Delivery",
            middle_name: ".",
            gender: "ultimate",
            phone_number: "123456789",
            address: "unknown",
            city: "unknown",
            state: "unknown",
            zip_code: "unknown",
            country: "unknown",
            emergency_contacts: "[]"
        }
    },

    //Resgiter customers============================================
    {
        label: "Create Customer Account",
        description: "Create Customer Account",
        route: "/api/auth/register",
        method: "POST",
        body: {
            name: "Cus Ra Ramana",
            email: "cusRaRa@customer.com",
            password: "CusRaRa526"
        }
    },
    {
        label: "Register Customer RaRa",
        description: "REgister",
        route: '/api/user/gettingstarted',
        method: "POST",
        body: {
            name: "Cus Ra Ramana",
            email: "CusRaRa@customer.com",
            phone1: "11111111111",
            phone2: "11111111111",
            address: "5000 malapitan, malakas, philippines",
            city: "malapitan",
            state: "malakas",
            zip: "12345",
            country: "philippines",
            icon: "test icon",
            gender: "female",
            delivery_notes: "Make sure that it is packed correctly"
        }
    },

    {
        label: "Create Customer Account",
        description: "Create Customer Account",
        route: "/api/auth/register",
        method: "POST",
        body: {
            name: "Cus Ta Ge",
            email: "cusTaGe@customer.com",
            password: "CusTaGe789"
        }
    },
    {
        label: "Register Customer Ta Ge",
        description: "REgister",
        route: '/api/user/gettingstarted',
        method: "POST",
        body: {
            name: "Cus Ta Ge",
            email: "cusTaGe@customer.com",
            phone1: "11111111111",
            phone2: "11111111111",
            address: "5000 malapitan, malakas, philippines",
            city: "malapitan",
            state: "malakas",
            zip: "12345",
            country: "philippines",
            icon: "test icon",
            gender: "male",
            delivery_notes: "Ayos basta mainit pa"
        }
    },
    
]   