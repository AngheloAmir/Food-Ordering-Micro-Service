var crudEmployee = {
    label: "Employee",
    api: [
            {
                label: "get employee data",
                route: "/api/employee/get",
                methods: ["GET"],
                description: "Get my employee data. This uses RLS policy so make sure to login first the employee account.",
                sampleInput: '{}',
                suggested: [],
                expectedOutcome: 'Note: This use RLS policy so make sure to login first the employee account.\n\n[ { ...the employee information in the database... } ]',
                isProtected: false,
                isPublic: false
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
                suggested: [
                    {
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
                },
                { 
                    name: "OnBoard Chef",
                    content: "" +
                        `{
    "passkey": "adminallow",
    "role": "chef",
    "admin_notes": "This is the the chef account",
    "first_name": "Chef",
    "last_name": "Chef",
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
                },
                {
                    name: "OnBoard Delivery",
                    content: "" +
                        `{
    "passkey": "adminallow",
    "role": "rider",
    "admin_notes": "This is the the delivery account",
    "first_name": "Delivery",
    "last_name": "Delivery",
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
                }

            ],
                expectedOutcome: 'NOTE: Please sign in first the account that will be onboarding \nWARNING: This route modify the database without any restrictions. \nThe Passkey must not be disclosed to anyone. \n\n{\n    "message": "Employee created successfully", \n    "data": null \n}',
                isProtected: false,
                isPublic: false
            }
        ]
};


