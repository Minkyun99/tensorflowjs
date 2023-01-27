app.post("/", function (req, res) {
  // front 서버에서 post 방식으로 전송받음
  // console.log(req.body.resultgood);
  console.log(req.body);
  const main = async () => {
    const _data = {
      files: req.body.files,
    };
    const new_photo = new Photo(_data);
    const t = await new_photo.save();
  };
  main();
});