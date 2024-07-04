# GPTalk

NodeJS program for Chat GPT conversations

Allows two ChatGPT instances to send messages back and forth to each other.

Output from each GPT instance is output to the console, and also output as a randomly generated voice using Eleven Labs.

This program is setup to work for Mac only. Linux and Windows will likely require some configuration to work properly.

## Required Services

For this program, you will need an OpenAI API account with some money loaded onto your credit balance, so you can make API calls to chatGPT. This program is setup to use GPT 3.5 Turbo, which is fairly cheap for simple messages. You can easily change the code to a more powerful GPT if you wish.

You'll also need an Eleven Labs account. This will give you access to an API key necessary for turning the GPT text responses into audio. The free tier works fine for initial testing, but you may hit the free tier limit of 10,000 characters per month after a few conversations.

You'll need a recent version of Node.js installed to run the program.

## Setup

Fork or clone the repository locally.

You'll need to set up an OpenAI account, and add your OpenAI API key to your shell. You can follow the instructions from OpenAI [here](https://platform.openai.com/docs/quickstart). On quickstart language selection, select Node.js. Follow the Install Node.js instructions in Step 1, if you don't already have Node setup locally. Follow Step 2 to setup your OpenAi API key. Follow the "Set up your API key for all projects" instructions.

Set up an Eleven Labs account, which you can do [here](https://elevenlabs.io/app/sign-up). Once you're signed in to the app, click on the Profile button, and open the "Profile + API key" window. Generate yourself a new API key. In the root of your project create a file called `.env`. Inside of this file, add `ELEVEN_LABS_API_KEY = <your API key>`. Save the file.

Lastly, from your terminal in the root folder of your project, run `npm install`.

## Running program

Now just run `npm run start` from the root of your project. You should see the text output from Chat GPT in the console, and hear the audio output being played.

To change the premise, and initial input for the conversations, go to the index.js file. Just change the **content** strings inside **premise**, and **initialStatement** objects to whatever you want the premise and initial statement to be.

Program is setup to select two random eleven labs voices on each run. However you could easily hard code or fine tune specific voices to your liking if you wish. Available voices for this setup at the time of publication are saved in "elevenLabsVoicesDict.json" file.

To close the running program, just hit `ctrl c` in your terminal.
