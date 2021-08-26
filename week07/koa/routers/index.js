const { promisify } = require("util");
const Router = require("@koa/router");
const router = new Router();

const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(
  "mongodb://root:mongodb@localhost:27017/todos?authSource=admin"
);

const mysql = require("mysql");
const mysqlConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123qwe",
  database: "todos",
});

const elasticsearch = require("elasticsearch");
const esClient = new elasticsearch.Client({
  host: "localhost:9200",
  log: "trace",
  apiVersion: "7.x", // use the same version of your Elasticsearch instance
});

const redis = require("redis");
const redisClient = redis.createClient({ host: "localhost", port: 6379 });

router.get("/animal", async (ctx, next) => {
  ctx.body = { hello: "animal" };
});

router.get("/mongodb/insert", async (ctx, next) => {
  await mongoClient.connect();
  const db = mongoClient.db();
  const collection = db.collection("todos");
  await collection.insertMany([
    {
      subject: "为什么Fastify这么快？",
      datetime: Date.now(),
      state: 0,
    },
    {
      subject: "插入文档",
      datetime: Date.now(),
      state: 1,
    },
    {
      subject: "更新文档",
      datetime: Date.now(),
      state: 0,
    },
    {
      subject: "删除文档",
      datetime: Date.now(),
      state: 0,
    },
  ]);
  ctx.body = { error: "", errorCode: 0, result: {} };
  await mongoClient.close();
});

router.get("/mongodb/query", async (ctx, next) => {
  await mongoClient.connect();
  const db = mongoClient.db("todos");
  const collection = db.collection("todos");
  const result = await collection.find({}).toArray();
  ctx.body = { error: "", errorCode: 0, result };
  await mongoClient.close();
});

router.get("/mysql/insert", async (ctx, next) => {
  const result = await promisify(mysqlConn.query.bind(mysqlConn))(
    "INSERT INTO todos VALUES (0, 'mysql', '2021-08-10 20:20:20')"
  );
  ctx.body = { error: "", errorCode: 0, result };
});

router.get("/mysql/query", async (ctx, next) => {
  const result = await promisify(mysqlConn.query.bind(mysqlConn))("SELECT * FROM todos");
  ctx.body = { error: "", errorCode: 0, result };
});

router.get("/redis/insert", async (ctx, next) => {
  if (!ctx.query || !Object.keys(ctx.query).length) {
    ctx.body = { error: "401", errorCode: "param key is required" };
    return;
  }
  Object.keys(ctx.query).forEach((key) => {
    redisClient.set(
      key,
      // @ts-ignore
      Array.isArray(ctx.query[key]) ? ctx.query[key].join(",") : ctx.query[key]
    );
  });
  ctx.body = { error: "", errorCode: 0, result: ctx.query };
});

router.get("/redis/query/:key", async (ctx, next) => {
  if (!ctx.params) {
    ctx.body = { error: "401", errorCode: "param key is required" };
    return;
  }
  const val = await promisify(redisClient.get.bind(redisClient))(ctx.params.key);
  ctx.body = { error: "", errorCode: 0, result: val };
});

router.get("/es/insert", async (ctx, next) => {
  const result = await esClient.index({
    index: "todos", //相当于database
    type: "todos",
    body: {
      //文档到内容
      subject: "tiger is a danger animal",
      datetime: Date.now(),
      state: 0,
    },
  });
  ctx.body = { error: "", errorCode: 0, result };
});

router.get("/es/query", async (ctx, next) => {
  const result = await esClient.search({
    index: "todos",
    type: "todos",
    body: {
      query: {
        match: {
          state: 0,
        },
      },
    },
  });
  ctx.body = { error: "", errorCode: 0, result };
});

module.exports = router;
