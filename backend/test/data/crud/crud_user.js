var crudUser = {
    label: "User",
    api: [
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
                expectedOutcome: '{\n  "message": "User information updated successfully"\nauth: { token: "...", refreshToken: "..." } or auth: null\n}',
                isProtected: false,
                isPublic: false
            },
            {
                label: "User info",
                route: "/api/user/info",
                methods: ["GET"],
                description: "Get the user information. NOTE: This will use the current cookie token / send the auth token",
                sampleInput: '{}',
                suggested: [],
                expectedOutcome: 'This filterout some data from the user information. \n\n{\n   "message": "User Info",\n   "data": {...}\n\nauth: { token: "...", refreshToken: "..." } or auth: null\n}',
                isProtected: false,
                isPublic: false
            },
        ]
};
