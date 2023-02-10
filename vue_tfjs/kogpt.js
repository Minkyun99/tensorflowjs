require("dotenv").config();
const request = require("request");
const REST_API_KEY = process.env.kogpt;
console.log(REST_API_KEY);

function kogptapi(prompt, max_tokens = 32, temperature, topP, n) {
  const url = "https://api.kakaobrain.com/v1/inference/kogpt/generation";
  const headers = {
    "Content-Type": "application/json",
    Authorization: "KakaoAK" + REST_API_KEY,
  };

  const options = {
    url,
    method: "POST",
    body: {
      prompt,
      max_tokens,
      temperature,
      top_p: topP,
      n,
    },
    headers,
    json: true,
  };
  request.post(options, (e, res, body) => {
    const rst = body;
    console.log(rst);
  });
}

const prompt = "뭐하고 놀지?";
kogptapi(prompt, 32, 0.5, 0.7, 1);
