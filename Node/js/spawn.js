const child_process = require("child_process");

for (let i = 0; i < 3; i++) {
  let workerProcess = child_process.spawn("node", ["command.js", i]);

  workerProcess.stdout.on("data", function (data) {
    console.log("child process stdout: " + data);
  });
  workerProcess.stderr.on("data", function (data) {
    console.log("child process stderr: " + data);
  });
  workerProcess.on("close", function (code) {
    console.log("child process exited with code " + code);
  });
}
