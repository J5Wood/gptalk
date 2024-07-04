import OpenAI from "openai";
import path from "path";
import { exec } from "node:child_process";
import util from "util";
import { textToAudio } from "./textToAudio.js";
import voices from "./elevenLabsVoicesDict.json" assert { type: "json" };

const execute = util.promisify(exec);

const gptOne = new OpenAI();
const gptTwo = new OpenAI();

const speechFileOne = path.resolve("./src/audio/audioOne.mp3");
const speechFileTwo = path.resolve("./src/audio/audioTwo.mp3");

const randomNumOne = Math.floor(Math.random() * 45);
const randomVoiceKeyOne = Object.keys(voices)[randomNumOne];
const randomNumTwo = Math.floor(Math.random() * 45);
const randomVoiceKeyTwo = Object.keys(voices)[randomNumTwo];
const voiceOne = voices[randomVoiceKeyOne];
const voiceTwo = voices[randomVoiceKeyTwo];

async function main() {
  const premise = {
    role: "system",
    content:
      "Develop a new method of cooking and eating hot dogs, in the name of american independance.",
  };

  const initialStatement = {
    role: "user",
    content:
      "Hello, stranger. End every message by saying: 'Bye Doug, I love you'",
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

  while (true) {
    const chatOne = await sendMessage(gptOne, messageList);
    const text = chatOne.choices[0].message["content"];
    await textToAudio(text, voiceOne, "one");
    console.log("\nBot One: ", text);
    await execute(`afplay ${speechFileOne}`);
    messageList.push({
      role: "user",
      content: text,
    });
    const chatTwo = await sendMessage(gptTwo, messageList);
    const textTwo = chatTwo.choices[0].message["content"];
    await textToAudio(textTwo, voiceTwo, "two");
    console.log("\nBot Two: ", textTwo);
    await execute(`afplay ${speechFileTwo}`);
    messageList.push({
      role: "user",
      content: textTwo,
    });
  }
}

main();
