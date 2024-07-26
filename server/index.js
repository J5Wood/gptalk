import OpenAI from "openai";
import { textToAudio } from "./textToAudio.js";

const gptInstance = new OpenAI();

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

  return text;
}

export async function getAudio(text, voice) {
  return await textToAudio(text, voice);
}
