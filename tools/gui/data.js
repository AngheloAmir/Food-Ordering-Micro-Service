

window.data = [
    {
        title: "Development",
        color: "bg-yellow-500",
        cards: [
            {
                title:       "Launch Database",
                icon:        "fa-solid fa-database",
                description: "Start the PostgreSQL database service locally via Docker containers.",
                buttons:     [
                    {
                        title:       "Run Supabase Docker",
                        action:      "/database",
                        color:       "bg-blue-500"
                    },
                    {
                        title:       "Stop Supabase Docker",
                        action:      "/database-stop",
                        color:       "bg-red-500"
                    },
                    {
                        title:       "Open Studio",
                        action:      "/database-studio",
                        color:       "bg-green-500"
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
                        action:      "/lunch-node",
                        color:       "bg-blue-500",
                        spawnTerminal: true,
                        onStop:      "/stop-node"
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