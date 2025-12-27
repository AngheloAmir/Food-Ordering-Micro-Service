var streamTest = window.streamTest = {
    label: "Stream Tests",
    api: [
        {
            label: "Test Stream",
            route: "/api/stream/test",
            methods: ["POST"],
            connectionmode: "stream",
            description: "This is a test stream",
            sampleInput: "{}",
            suggested: [],
            isProtected: false,
            isPublic: false
        },
        {
            label: "Test Stream 2" ,
            route: "/api/stream",
            methods: ["POST"],
            connectionmode: "stream",
            description: "This is a test stream",
            sampleInput: "",
            suggested: [],
            isProtected: false,
            isPublic: true
        },
    ]
};