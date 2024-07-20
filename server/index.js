import OpenAI from "openai";
import { textToAudio } from "./textToAudio.js";
import voices from "./elevenLabsVoicesDict.json" assert { type: "json" };

const gptInstance = new OpenAI();

const voiceOne = voices["Demon"];
// const voiceTwo = voices["BillOxley"];

// const randomNumOne = Math.floor(Math.random() * 45);
// const randomVoiceKeyOne = Object.keys(voices)[randomNumOne];
// const randomNumTwo = Math.floor(Math.random() * 45);
// const randomVoiceKeyTwo = Object.keys(voices)[randomNumTwo];
// const voiceOne = voices[randomVoiceKeyOne];
// const voiceTwo = voices[randomVoiceKeyTwo];

export async function getInitialText(prompt) {
  const premise = {
    role: "system",
    content: prompt + " Your responses need to be one sentence.",
  };

  const initialStatement = {
    role: "user",
    content: "Begin.",
  };

  const messageList = [premise, initialStatement];

  async function sendMessage(bot, newMessage) {
    const response = await bot.chat.completions.create({
      messages: newMessage,
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 1000,
    });
    return response;
  }

  const chat = await sendMessage(gptInstance, messageList);
  const text = chat.choices[0].message["content"];

  console.log("\nBot: ", text);
  return text;
}

export async function getContinuedText(prompt) {
  const messageList = prompt;

  async function sendMessage(bot, newMessage) {
    const response = await bot.chat.completions.create({
      messages: newMessage,
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 1000,
    });
    return response;
  }

  const chat = await sendMessage(gptInstance, messageList);
  const text = chat.choices[0].message["content"];

  console.log("\nBot: ", text);
  return text;
}

export async function getAudio(text) {
  return await textToAudio(text, voiceOne, "one");
}
