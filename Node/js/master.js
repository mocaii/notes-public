/** IPC */
// const cp = require("child_process");
// const n = cp.fork("child.js");

// n.on("message", (msg) => {
//   console.log("主进程收到子进程的消息：", msg);
// });

// //主进程发送消息给子进程
// n.send("hello child process");

/** Socket */
const { spawn } = require("child_process");
const child = spawn("node", ["child.js"], {
  //子进程的标准输入输出配置
  stdio: [null, null, null, "pipe"],
});
child.stdio[1].on("data", (data) => {
  console.log("来自子进程消息", data.toString());
});
