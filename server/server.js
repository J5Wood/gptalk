import express from "express";
import cors from "cors";
import { getInitialText, getContinuedText, getAudio } from "./index.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  const prompt = req.body.data;
  const text = await getInitialText(prompt);
  res.set({
    "Content-Type": "application/json",
    "x-timestamp": Date.now(),
    "x-sent": true,
  });
  res.send(JSON.stringify(text));
});

app.post("/continue", async (req, res) => {
  //  Should each bot know which part of it's history belongs to it?
  //    Every other piece of context perhaps?
  //    Would need to differentiate user interjections as well

  const prompt = req.body.data;
  const text = await getContinuedText(prompt);
  res.set({
    "Content-Type": "application/json",
    "x-timestamp": Date.now(),
    "x-sent": true,
  });
  res.send(JSON.stringify(text));
});

app.post("/audio", async (req, res) => {
  const prompt = req.body.data;
  const voice = req.body.voice;
  const audio = await getAudio(prompt, voice);
  res.set({
    "x-timestamp": Date.now(),
    "x-sent": true,
  });
  res.send(audio);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
