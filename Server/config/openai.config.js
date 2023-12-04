require('dotenv').config();
const OpenAi = require("openai");
const openai = new OpenAi({
  apiKey: process.env.OPENAI_APIKEY,
});

module.exports = openai;
