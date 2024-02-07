const { Client, Intents, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages
  ]
});


client.once('ready', async () => {
  console.log('Bot is online!');
  // Fetch guild (server) information
  const guild = client.guilds.cache.first(); // Get the first guild the bot is connected to
  if (!guild) return console.error("Bot is not in any guild.");

  // Display available channels
  console.log('Available channels:');
  guild.channels.cache.forEach((channel) => {
    if (channel.type === 'text') {
      console.log(`${channel.name} (${channel.id})`);
    }
  });
});

client.on('message', async (message) => {
  if (message.content.startsWith('!showfiles')) {
    const channelName = message.content.slice(10); // Remove "!showfiles" from the message
    const channel = message.guild.channels.cache.find(
      (ch) => ch.name === channelName && ch.type === 'text'
    );

    if (!channel) {
      message.channel.send('Channel not found.');
      return;
    }

    const messages = await channel.messages.fetch({ limit: 50 }); // Fetch recent messages in the channel
    messages.forEach((msg) => {
      if (msg.attachments.size > 0) {
        msg.attachments.forEach((attachment) => {
          message.channel.send(attachment.url); // Send the URL of the file
        });
      }
    });
  }
});

client.login('MTE5Mjc1MzM4MjAxNjk0NjIyNg.GgRiO1.pHGPCc38vLtoLd5cD_RVAFCmnL0K_L1DPLQyyY'); // Replace YOUR_BOT_TOKEN with your bot token
