const Koa = require("koa");
const logger = require("koa-logger");
const router = require("./routers");

const app = new Koa();

app.use(logger());

app.use(router.routes());

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

const start = async () => {
  console.log("start");
  await app.listen(3000);
  console.log("start at http://localhost:3000");
};
start();
