const spawn = require("child_process").spawn;

let spawnProcess = spawn(
  process.cwd() + "/node_modules/serverless/bin/serverless.js",
  ["offline", "start", "--env", "test"]
);
spawnProcess.stdout.on("data", async function (msg) {
  if (/server ready/.test(msg.toString())) {
    console.log("Server running...");
    process.exit(0);
  }
});
spawnProcess.stderr.on("data", function (msg) {
  console.log(msg.toString());
});
spawnProcess.on("close", function (code) {
  console.log(`CCCCCCCCCCCCCC Closed with code ${code}`);
});
