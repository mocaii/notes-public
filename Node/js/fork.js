const child_process = require("child_process");

for (let i = 0; i < 3; i++) {
  let workerProcess = child_process.fork("command.js", [i]);

  workerProcess.on("close", function (code) {
    console.log("child process exited with code " + code);
  });
}
