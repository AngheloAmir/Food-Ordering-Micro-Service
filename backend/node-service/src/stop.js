const { exec } = require("child_process");

const PORT = 5199;

exec(`lsof -ti :${PORT}`, (err, stdout) => {
  if (err || !stdout) {
    console.log(`Port ${PORT} is already free or lsof failed`);
    return;
  }

  const pids = stdout.trim().split("\n").filter(Boolean).join(" ");

  if (pids) {
      exec(`kill -9 ${pids}`, (killErr) => {
        if (killErr) {
            console.error(`Failed to kill pids ${pids}:`, killErr);
        } else {
            console.log(`Killed process(es) on port ${PORT}: ${pids}`);
        }
      });
  }
});
