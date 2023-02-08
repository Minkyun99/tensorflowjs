const express = require("express");
const path = require("path");
const logger = require("morgan");
const { Server } = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
// const io = require('soket.io').listen(Server)

require("dotenv").config();
const port = 3000;
// const Photo = require("./ori.js");
const _path = path.join(__dirname, "./dist");
// console.log(_path);
app.use("/", express.static(_path));
app.use(logger("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*cam.vue 몽고DB저장*/
app.post("/", function (req, res) {
  // front 서버에서 post 방식으로 전송받음
  // console.log(req.body.resultgood);
  console.log(req.body);
  const main = async () => {
    const _data = {
      name: req.body.resultgood,
      img: req.body.resultgood,
    };
    const new_photo = new Photo(_data);
    const t = await new_photo.save();
  };
  main();
});

/*ex9 예제 클래스네임 번역*/
const NAVER_CLIENT_ID = process.env.ID;
const NAVER_CLIENT_SECRET = process.env.SECRET;

let api_url = "https://openapi.naver.com/v1/papago/n2mt";

const request = require("request");

io.on("connection", (socket) => {
  socket.on("trans", (msg) => {
    let options = {
      url: api_url,
      form: { source: "en", target: "ko", text: msg },
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
      },
    };
    request.post(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const rst = JSON.parse(body);
        io.emit("trans", rst.message.result.translatedText);
      } else {
        console.log("error = " + response.statusCode);
      }
    });
  });
});

/*단축 URL*/
var client_id = "F2aO9npMWBIghgiWOvKA"; //개발자센터에서 발급받은 Client ID
var client_secret = "GIGbSMRf6C"; //개발자센터에서 발급받은 Client Secret

var query = encodeURI("https://developers.naver.com/docs/utils/shortenurl");

app.get("/url", function (req, res) {
  io.on("connection", (socket) => {
    socket.on("data", (url) => {
      var api_url = "https://openapi.naver.com/v1/util/shorturl";
      var request = require("request");
      var options = {
        url: api_url,
        form: { url: query },
        headers: {
          "X-Naver-Client-Id": client_id,
          "X-Naver-Client-Secret": client_secret,
        },
      };
      request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
          console.log(
            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" })
          );
          res.end(body);
          console.log(body);
          io.emit("data", body);
        } else {
          res.status(response.statusCode).end();
          console.log("error = " + response.statusCode);
        }
      });
    });
  });
});

server.listen(port, () => {
  console.log(port + "에서 서버 동작 완료.");
});
