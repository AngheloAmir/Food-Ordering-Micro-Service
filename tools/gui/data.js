

window.data = [
    {
        title: "Development Server",
        color: "bg-yellow-500",
        cards: [
            {
                title:       "Launch Database",
                icon:        "fa-solid fa-database",
                description: "Start the PostgreSQL database service locally via Docker containers.",
                buttons:     [
                    {
                        title:       "Run Supabase Docker",
                        color:       "bg-blue-500",
                        runCustomTerminal: true,
                        action:      "/lunch-supabase",
                        onStop:      "/stop-supabase"  
                    },
                    {
                        title:       "Open Studio",
                        color:       "bg-green-500",
                        action:      "http://127.0.0.1:54323",
                        openlink:    true
                    },
                ]
            },
            {
                title:       "Launch Node Server",
                icon:        "fa-brands fa-node",
                description: "Spin up the main Node.js backend service with hot-reloading enabled.",
                buttons:     [
                    {
                        title:       "Run Node Server",
                        color:       "bg-blue-500",
                        runTerminal: true,
                        terminalDirectory: 'backend/node-service',
                        terminalCommand:   'yarn run dev',
                        terminalOnStop:    'yarn run stop'
                    },
                    {
                        title:       "Check Node Server Status",
                        action:      "http://localhost:5199/",
                        color:       "bg-blue-500",
                        openlink:    true
                    },
                ]
            },
            {
                title:       "Launch API Tester",
                icon:        "fa-solid fa-flask",
                description: "Test API endpoints and view responses in a user-friendly interface.",
                buttons:     [
                    {
                        title:       "Run API Tester",
                        action:      "/test",
                        color:       "bg-blue-500",
                        openlink:    true
                    },
                ]
            }
        ]
    },

    
]