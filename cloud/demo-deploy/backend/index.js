// This is a "Serverless" function.
// Instead of listening on a port (app.listen), it exports a 'handler'.

exports.handler = async (event) => {
    console.log("EVENT RECEIVED:", JSON.stringify(event));
    
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: "Hello from your Local Node.js Cloud function! 🚀",
            timestamp: new Date().toISOString(),
            input_data: event
        }),
    };
};
