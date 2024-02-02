/** IPC */
// process.on("message", (msg) => {
//   console.log("子进程收到主进程的消息：", msg);
// });

// // 子进程发送消息给主进程
// process.send("hello master process");

/** Socket */
const net = require("net");
const pipe = net.Socket({ fd: 1 });
pipe.write("hello master process");
