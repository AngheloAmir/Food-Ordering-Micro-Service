const path      = require('path');
const { spawn } = require('child_process');

module.exports = {
    template: async (req, res) => {
        res.writeHead(200, { 
            'Content-Type': 'text/plain', 
            'Transfer-Encoding': 'chunked'
        });   
        
        res.write('doing something...\n');
        res.end();
    },
};