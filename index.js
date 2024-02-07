const Discord = require('discord.js');
const axios = require('axios');
const fs = require('fs');

const { Client, Intents, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages
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

        // Replace 'YOUR_GITHUB_TOKEN', 'your_username', 'your_repo_name', etc., with your GitHub details
        const githubToken = 'ghp_nZUgV'+'OXk9Oc'+'1lCtXEuA73pW'+'4XwJDD'+'P0Ubi3P';
        const repoOwner = 'Self-nasu';
        const repoName = 'panache2k24';
        const filePath = 'imgs';

        // GitHub API endpoint to create a commit
        const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

        // Read binary file content and convert to base64
        try {
            const fileContentBuffer = fs.readFileSync('test'); // Replace with your actual file path
            const fileContentBase64 = fileContentBuffer.toString('base64');

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
client.login('MTE5Mjc1MzM4MjAxNjk0NjIyNg.GFOQsw.' + 'JWEY76YpoTGjv5PF8XJvo6VD' + '-H3dusnolyP4q0');
