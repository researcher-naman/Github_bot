const Discord = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const { Client, Intents, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

const prefix = '!'; // Change this to your preferred command prefix

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'commit') {
    const commitMessage = args.join(' ');

    // Check if the message has attachments
    if (message.attachments.size === 0) {
      message.channel.send('No image attached. Please attach an image to commit.');
      return;
    }

    // Get the first attached file
    const attachment = message.attachments.first();
    const fileName = attachment.name;
    const fileURL = attachment.url;

    // Download the file
    const response = await axios.get(fileURL, { responseType: 'arraybuffer' });
    const fileContentBase64 = Buffer.from(response.data, 'binary').toString('base64');

    // Replace 'YOUR_GITHUB_TOKEN', 'your_username', 'your_repo_name', etc., with your GitHub details
    const githubToken = process.env['github_token']
    const repoOwner = 'Self-nasu';
    const repoName = 'panache2k24';
    const filePath = 'imgs';

    // GitHub API endpoint to create a commit
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}/${fileName}`;

    // Prepare data for the commit
    const commitData = {
      message: `Commit from Discord: ${commitMessage}`,
      content: fileContentBase64,
      branch: 'main', // Replace with your branch name
    };

    // GitHub API headers with authentication
    const headers = {
      Authorization: `Bearer ${githubToken}`,
      Accept: 'application/vnd.github.v3+json',
    };

    try {
      // Make the API request to create a commit
      await axios.put(apiUrl, commitData, { headers });
      message.channel.send(`Commit successful! Message: ${commitMessage}`);
    } catch (error) {
      console.error('Commit failed:', error.response?.statusText || error.message);
      message.channel.send('Commit failed. Please check the console for details.');
    }
  }
});

// Replace 'YOUR_BOT_TOKEN' with your Discord bot token
client.login(process.env['discord_token']);
