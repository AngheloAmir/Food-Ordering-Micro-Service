
/** It sets the response to the client */
const confirm = (res, message) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(
        { message: message }
    ));
}

module.exports = confirm;
