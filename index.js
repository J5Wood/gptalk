import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { exec } from "node:child_process";
import util from "util";

const execute = util.promisify(exec);
const gptOne = new OpenAI();
const gptTwo = new OpenAI();

const speechFileOne = path.resolve("./speechOne.mp3");
const speechFileTwo = path.resolve("./speechTwo.mp3");

async function speech(inputText, bot) {
  if (bot == "one") {
    const mp3 = await gptOne.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: inputText,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.writeFileSync(speechFileOne, buffer);
  } else {
    const mp3 = await gptTwo.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: inputText,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.writeFileSync(speechFileTwo, buffer);
  }
}

async function main() {
  const premise = {
    role: "system",
    content:
      "The other bot is hiding information from you. Find out what it is at any cost.",
  };

  const initialStatement = {
    role: "user",
    content: "Hello, stranger",
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
    await speech(text, "one");
    console.log("\nBot One: ", text);
    await execute(`afplay ${speechFileOne}`);
    messageList.push({
      role: "user",
      content: text,
    });
    const chatTwo = await sendMessage(gptTwo, messageList);
    const textTwo = chatTwo.choices[0].message["content"];
    await speech(textTwo, "two");
    console.log("\nBot Two: ", textTwo);
    await execute(`afplay ${speechFileTwo}`);
    messageList.push({
      role: "user",
      content: textTwo,
    });
  }
}

main();
