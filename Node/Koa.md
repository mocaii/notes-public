# Koa

## 洋葱模型

中间件处理机制。在传统的堆叠式中间件（如 Express）中，中间件是线性排列并依次执行的，而在 Koa 中间件则按照洋葱模型的方式环绕请求和响应生命周期进行组织。每一个中间件都像是洋葱的每一层，当从洋葱中心穿过时，每层都会一进一出穿过两次，且最先穿入的一层最后穿出。

- middleware: 第一个中间件将会执行
- next: 每个中间件将会通过 next 来执行下一个中间件
  ![洋葱模型](./yangcong.png)

```js
const Koa = require("koa");
const app = new Koa();
app.use(async (ctx, next) => {
  console.log("1");
  await next();
  console.log("6");
});

app.use(async (ctx, next) => {
  console.log("2");
  await next();
  console.log("5");
});

app.use(async (ctx, next) => {
  console.log("3");
  await next();
  console.log("4");
});

app.listen(3000); // 1 2 3 4 5 6
```

## 源码核心

核心代码在源码文件的 lib 目录下。（内容不多，粗略看过，以后得再次细看）

### 1.application.js

对应 App（实例化应用）

### 2.context.js

对应 ctx（实例上下文）

### 3.request.js

对应 ctx.request（由原生 request 事件的 http.IncomingMessage 类过滤而来）

### 4.response.js

对应 ctx.response（由原生 request 事件的 http.ServerResponse 类过滤而来）

## 路由

### 原生路由

通过判断 request 对象的 URL 属性

```js
app.use(async (ctx, next) => {
  const path = ctx.request.path;
  if (path === "/user") {
    ctx.body = "user";
  } else {
    ctx.body = "other";
  }
});
```

### koa-router

```js
const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
c;
router.get("/other", async (ctx, next) => {
  ctx.body = "other";
});
app.use(router.routes());
app.listen(3000);
```

### 路由分割

#### 分成多个路由文件

把路由分割成多个文件，然后在 app.js 中引入

```
routes
 - user.js
 - other.js
 - index.js
```

```js
// routes/user.js
const Router = require("koa-router");
const router = new Router();
router.prefix("/user");
router.get("/info", async (ctx, next) => {
  ctx.body = "useInfo";
});
module.exports = router;
```

```js
// routes/other.js
const Router = require("koa-router");
const router = new Router();
router.get("/other", async (ctx, next) => {
  ctx.body = "other";
});
module.exports = router;
```

#### 通过 koa-compose 合并路由

```js
//routes/index.js
const compose = require("koa-compose");
const glob = require("glob");
const { resolve } = require("path");

registerRouter = () => {
  let routers = [];
  //递归获取当前文件夹下的js文件
  glob
    .sync(resolve(__dirname, ".", "**/*.js"))
    //排除index.js
    .filter((value) => value.indexOf("index.js") === -1)
    .forEach((router) => {
      routers.push(require(router).routes());
      routers.push(require(router).allowedMethods());
    });
  return compose(routers);
};
module.exports = registerRouter;
```

```js
//app.js
const registerRouter = require("./routes");
app.use(registerRouter());
```

#### 文件路由

## 数据库

### mysql

#### 插入

```sh
npm i mysql2
```

```js
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "myZone",
});

connection.connect();
const sql = `INSERT INTO toolList(name,url) VALUES('通义千问','https://tongyi.aliyun.com/qianwen')`;
connection.query(sql, (err, res) => {
  if (err) throw err;
  console.log(res);
});
```

#### 使用 ORM

操作数据库和操作对象一样

```sh
npm i sequelize
```

```js
const sequelize = new Sequelize("myZone", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false,
  define: {
    timestamps: false,
    freezeTableName: true,
  },
  pool: {
    max: 5,
    min: 0,
  },
});
const ToolList = sequelize.define("toolList", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
});
ToolList.create({
  name: "通义千问",
  url: "https://tongyi.aliyun.com/qianwen",
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

## ElasticSearch

分布式搜索服务，基于 Lucene 的引擎，提供一个集中的搜索服务。
