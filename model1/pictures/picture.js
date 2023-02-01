const express = require('express')
const path = require('path')
const logger = require('morgan')
const { Server } = require('socket.io')
const http = require('http')
const app = express()
const server = http.createServer(app)
const io = new Server(server)
const multer = require('multer')

const port = 3000
const _path = path.join(__dirname, './dist')
console.log(_path)
app.use('/', express.static(_path))
app.use(logger('tiny'))

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

/*스피너*/
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, _path)
  },
  filename: (req, res, cb) => {
    let fix = Buffer.from(res.originalname, 'latin1').toString('utf8')
    cb(null, fix)
  }
})

let upload = multer({ storage: storage })

app.post('/up', upload.single('ufile'), (req, res) => {
  console.log(req.file)
  res.send(
    `<script>alert("파일 업로드 완료!");location.replace('AboutView.vue')</script>`
  )
})

/*소켓*/
// io.on('connection', (so) => {
//   so.on('send', (dog) => {
//     io.emit('send', dog)
//   })
//   /*파일 이름 보내기*/
//   io.emit('name', fix)
// })

server.listen(port, () => {
  console.log(port + '에서 서버동작 완료.')
})
