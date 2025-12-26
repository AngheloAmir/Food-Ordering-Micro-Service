var crudTools = {
    label: "Tools",
    api: [
            {
                label: "cookie token decode",
                route: "/api/tools/decode",
                methods: ["POST"],
                description: "Decodes the current cookie token. Dont change the code and pass to use this tool. MUST NOT BE USED IN THE FRONTEND!",
                sampleInput: '{\n   "code": "En8aZ5y1Al7a",\n   "pass": "9cm4hHMetlb8"\n}',
                suggested: [],
                expectedOutcome: '{ ... the JSON representation of the Token from supabase ... }',
                isProtected: false,
                isPublic: false
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
                expectedOutcome: '[ all of the users info if email is not specified ]',
                isProtected: false,
                isPublic: false
            },
            {
                label: "list all employees",
                route: "/api/tools/listemployee",
                methods: ["POST"],
                description: "Lists all employees",
                sampleInput: '{\n   "code": "En8aZ5y1Al7a",\n   "pass": "9cm4hHMetlb8"\n}',
                suggested: [],
                expectedOutcome: '[ ... ]',
                isProtected: false,
                isPublic: false
            }
        ]
};
