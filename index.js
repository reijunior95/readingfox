// index.js
require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const registerCommands = require("./core/registerCommands");
const setupInteractions = require("./core/setupInteractions");


const client = new Client({
intents: [GatewayIntentBits.Guilds],
partials: [Partials.Channel]
});

registerCommands();
setupInteractions(client);

client.once("ready", () => {
console.log(`✅ Bot logged in as ${client.user.tag}`);

});

client.login(process.env.BOT_TOKEN);
