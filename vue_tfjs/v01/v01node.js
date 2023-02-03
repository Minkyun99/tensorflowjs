const express = require("express");
const path = require("path");
const logger = require("morgan");
const app = express();
const cw = require("./public/crawling_학식정보.js");
const port = 3000;

const _path = path.join(__dirname, "./dist");
console.log(_path);

app.use("/", express.static(_path));
app.use(logger("tiny"));

app.get("/hak", (req, res) => {
  res.send("<Script>alert('반가워요')</Script>");
  cw.ax().then((v) => {
    console.log(v);
    res.send(v);
  });
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`);
});
