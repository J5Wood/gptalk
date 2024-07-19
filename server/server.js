import express from "express";
import cors from "cors";
import { getText, getAudio } from "./index.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  const prompt = req.body.data;
  const text = await getText(prompt);
  res.set({
    "Content-Type": "application/json",
    "x-timestamp": Date.now(),
    "x-sent": true,
  });
  res.send(JSON.stringify(text));
});

app.post("/audio", async (req, res) => {
  const prompt = req.body.data;
  const audio = await getAudio(prompt);
  res.set({
    "x-timestamp": Date.now(),
    "x-sent": true,
  });
  res.send(audio);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
