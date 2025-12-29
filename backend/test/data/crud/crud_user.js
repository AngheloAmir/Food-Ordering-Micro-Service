var crudUser = {
    label: "User",
    api: [
            {
                label: "user info",
                route: "/api/user/info",
                methods: ["GET"],
                description: "Get the user information. NOTE: This will use the current cookie token / send the auth token",
                sampleInput: '{}',
                suggested: [],
                expectedOutcome: 'This filterout some data from the user information. \n\n{\n   "message": "User Info",\n   "data": {...}\n\nauth: { token: "...", refreshToken: "..." } or auth: null\n}',
                isProtected: false,
                isPublic: false
            },
//===================================================================
            {
                label: 'on board user',
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
//===================================================================
            {
                label: "cart",
                route: "/api/user/cart",
                methods: ["POST"],
                description: "Get, Add or Update a product to the cart. NOTE: This will use the current cookie token / send the auth token",
                sampleInput: '{}',
                suggested: [
                    { name: "Get User Cart", content: '{}' },
                    {
                        name: "Add to Cart", content: '{\n   "update": false,\n   "product_id": "1",\n   "quantity": 1 \n}'
                    },
                    {
                        name: "Update Cart", content: "" +
`{
    "update": true,
    "products": [
    {
        "checked": true,
        "quantity": 10,
        "product_id": "1"
    },
    {
        "checked": true,
        "quantity": 5,
        "product_id": "2"
    }
]}`
                    }
                ],
                expectedOutcome: 'Insert or completely update the cart. \n\n{\n  "message": " ... "\nauth: { token: "...", refreshToken: "..." } or auth: null\n}',
                isProtected: false,
                isPublic: false
            },
//===================================================================
            {
                label: "checkout",
                route: "/api/user/checkout",
                methods: ["POST"],
                description: "Create or get all checkout orders. NOTE: This will use the current cookie token / send the auth token",
                sampleInput: '{}',
                suggested: [
                    { name: "Get User Checkout Orders", content: '{}' },
                    { name: "Checkout", content: "" +
`{
    "checkout": true,
    "name":    "my name",
    "contact": "1234567890",
    "email":   "myemail@gmail.com",
    "address": "random 101 black green, orange state",
    "delivery_notes": "Just deliver it fast",
}
`
                    },
                ],
                expectedOutcome: "" +
`Get or Checkout cart items that flag. It will use user Token to get its user id.
Note: the name, email, contact and address should be automatically populated by the user however, the user is allowed to do an edit when maoking an order.
{
    "message": " ... "
    auth: { token: "...", refreshToken: "..." } or auth: null
}
..if checking out:
{
    "message": "order being process",
    "
}    

`,
                isProtected: false,
                isPublic: false

            }

        ]
};
