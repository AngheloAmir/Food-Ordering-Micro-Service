import { spawn } from "child_process";

const URL = "http://localhost:3000";

// Start your tools server
const server = spawn("yarn", ["run", "start"], {
  cwd: "tools",
  stdio: "inherit",
  shell: true
});

// Wait a bit for the server to boot, then open browser
setTimeout(() => {
  const command =
    process.platform === "win32"
      ? `start ${URL}`
      : process.platform === "darwin"
      ? `open ${URL}`
      : `xdg-open ${URL}`;

  spawn(command, { shell: true });
}, 2000);

// Forward Ctrl+C so it shuts down cleanly
process.on("SIGINT", () => {
  server.kill("SIGINT");
  process.exit();
});
