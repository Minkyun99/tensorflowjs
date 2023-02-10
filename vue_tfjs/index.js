const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();

app.use(express.json());

const configureation = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(Configuration);

app.post("/", async (req, res) => {
  try {
    const reponse = await openai.createCompletion({
        model:'text-davinci-003',
        prompt : 'const example = (arr) =>{arr.map((item)=>{console.log(item2)'
            })
        }
        the time complexity of this function is 
  catch (error) {}
});

const port = 3000;

app.listen(port, () => {
  console.log(port + "로 서버가 연결되었습니다.");
});
