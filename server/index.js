import OpenAI from "openai";
import path from "path";
// import { exec } from "node:child_process";
// import util from "util";
import { textToAudio } from "./textToAudio.js";
import voices from "./elevenLabsVoicesDict.json" assert { type: "json" };

// const execute = util.promisify(exec);

const gptOne = new OpenAI();
// const gptTwo = new OpenAI();

// const speechFileOne = path.resolve("./audio/audioOne.mp3");
// const speechFileTwo = path.resolve("./audio/audioTwo.mp3");

const voiceOne = voices["Demon"];
// const voiceTwo = voices["BillOxley"];

// const randomNumOne = Math.floor(Math.random() * 45);
// const randomVoiceKeyOne = Object.keys(voices)[randomNumOne];
// const randomNumTwo = Math.floor(Math.random() * 45);
// const randomVoiceKeyTwo = Object.keys(voices)[randomNumTwo];
// const voiceOne = voices[randomVoiceKeyOne];
// const voiceTwo = voices[randomVoiceKeyTwo];

export async function newConversation(prompt) {
  const premise = {
    role: "system",
    content: prompt,
  };

  const initialStatement = {
    role: "user",
    content: "Begin",
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

  const chatOne = await sendMessage(gptOne, messageList);
  const text = chatOne.choices[0].message["content"];
  const rawAudio = await textToAudio(text, voiceOne, "one");

  console.log("\nBot One: ", text);
  return rawAudio;
  // await execute(`afplay ${speechFileOne}`);
  // messageList.push({
  //   role: "user",
  //   content: text,
  // });

  // const chatTwo = await sendMessage(gptTwo, messageList);
  // const textTwo = chatTwo.choices[0].message["content"];
  // await textToAudio(textTwo, voiceTwo, "two");
  // console.log("\nBot Two: ", textTwo);
  // await execute(`afplay ${speechFileTwo}`);
  // messageList.push({
  //   role: "user",
  //   content: textTwo,
  // });
  // }
}
