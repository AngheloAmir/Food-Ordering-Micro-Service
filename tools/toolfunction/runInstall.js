const path      = require('path');
const { spawn } = require('child_process');

module.exports = {
    runInstall: async (req, res) => {
       res.write(`runInstall`);
       res.end();
    }
};