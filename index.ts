import { Client, Events, GatewayIntentBits } from 'discord.js';

const API_URL = Bun.env.API_URL;
const TOKEN = Bun.env.DISCORD_TOKEN;

if (!API_URL) {
  console.error(`API_URL is not set!`)
  process.exit()
}

if (!TOKEN) {
  console.error(`DISCORD_TOKEN is not set!`)
  process.exit()
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;

  for (const match of message.content.matchAll(/```\n([\s\S]*?)\n```/g)) {
    const code = match[1];
    console.log(code)
    const payload = { code }

    try {
      const res = await fetch(`${API_URL}/`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      })

      if (res.ok) {
        const result = await res.text();
        await message.reply(result);
      } else {
        console.warn(`The API responded with status: ${res.status}`);
        await message.reply('I could not execute your code :c\nAre you sure that\'s valid BIRL code?');
      }
    } catch (error) {
      console.error(error)
      await message.reply('I could not execute your code :c\nThe BIRL API seems to be down...')
    }
  }
});

client.login(TOKEN);
