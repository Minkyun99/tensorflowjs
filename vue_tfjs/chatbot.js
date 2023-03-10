/*eslint-disable*/

require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const token = process.env.botid;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

import data from "./data.js";

bot.on("message", async (msg) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: msg.text,
    max_tokens: 256,
    temperature: 0.3,
    data,
  });
  const chatId = msg.chat.id;
  const responseon = response.data.choices[0].text;
  console.log(responseon);
  bot.sendMessage(chatId, responseon);
});
