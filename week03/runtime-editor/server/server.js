const express = require("express");
const { readFileSync, writeFileSync } = require("fs");
const path = require("path");
const shell = require("shelljs");

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const filePath = path.join(__dirname, "src/App.tsx");

app.get("/api/load-file", (req, res) => {
  const value = readFileSync(filePath, "utf-8");

  res.json(value);
});

app.post("/api/save-preview", (req, res) => {
  writeFileSync(filePath, req.body.value, "utf-8");

  //执行编译命令
  const result = shell.exec("npm run inner-app:build;");

  if (result.match(/(.*error[\s\S]*)/m)) {
    res.json({ success: 0, msg: RegExp.$1 });
    return;
  }

  res.json({ success: 1, msg: result });
});

app.use(express.static(path.join(__dirname, "build")));

app.listen(port, () => {
  console.log(`server start at http://localhost:${port}`);
});
