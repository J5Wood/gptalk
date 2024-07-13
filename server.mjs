import express from "express";
import cors from "cors";
import main from "./index.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  console.log(req.body);
  const prompt = req.body.data;
  await main();
  res.writeHead(200);
  res.end();

  // res.end(`{"message": "This is a JSON response"}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
