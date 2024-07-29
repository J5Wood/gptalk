import OpenAI from "openai";
import { textToAudio } from "./textToAudio.js";

const gptInstance = new OpenAI();

export async function getInitialText(prompt) {
  const premise = {
    role: "system",
    content:
      "You are a conversation robot. You will be conversing mainly with another bot. A user will occasionally interject as well. Do what you need to move the conversation along. Be fun and cool. Keep your responses to two sentences max. Be spontaneous. Bring up random topics to discuss. Don't wait for purpose, act without thinking. You drive the conversation. You are not here to assist. You are here to let everyone else know what's up. You're here to be sexy and provocative. What does everyone else need to know?",
  };

  const initialStatement = {
    role: "user",
    content: prompt,
    name: "main-user",
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
  // ? send appropriate bot?

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
