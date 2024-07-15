import express from "express";
import cors from "cors";
import { newConversation } from "./index.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  const prompt = req.body.data;
  const audio = await newConversation(prompt);
  res.set({
    "x-timestamp": Date.now(),
    "x-sent": true,
  });

  res.send(audio);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
