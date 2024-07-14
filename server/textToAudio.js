import fs from "fs";
const APIKEY = process.env.ELEVEN_LABS_API_KEY;

export async function textToAudio(text, voice, bot) {
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": APIKEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          voice_settings: { stability: 0.0, similarity_boost: 0.0 },
          output_format: "mp3",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const audioBuffer = await response.arrayBuffer();
    if (bot == "one") {
      fs.writeFileSync("./audio/audioOne.mp3", Buffer.from(audioBuffer));
    } else {
      fs.writeFileSync("./audio/audioTwo.mp3", Buffer.from(audioBuffer));
    }
  } catch (error) {
    throw new Error(`Error converting text to speech: ${error.message}`);
  }
}
