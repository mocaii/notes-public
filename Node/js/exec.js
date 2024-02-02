const child_process = require("child_process");
for (let i = 0; i < 3; i++) {
  let workerProcess = child_process.exec("node command.js " + i, function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log("Error code:", error.coder);
      console.log("Singal: ", error.signal);
    }
    console.log("stdout: ", stdout);
    console.log("stderr: ", stderr);
  });
  workerProcess.on("exit", function (code) {
    console.log("child process exited with code " + code);
  });
}
