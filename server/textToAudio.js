const APIKEY = process.env.ELEVEN_LABS_API_KEY;

export async function textToAudio(text, voice) {
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
          voice_settings: { stability: 0.75, similarity_boost: 0.75 },
          output_format: "mp3",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const audioBuffer = await response.arrayBuffer();
    return Buffer.from(audioBuffer);
  } catch (error) {
    throw new Error(`Error converting text to speech: ${error.message}`);
  }
}
