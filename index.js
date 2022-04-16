const fs = require("fs");
const Discord = require("discord.js");
require("dotenv").config();

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_PRESENCES", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
  partials: ["GUILD_MEMBER", "CHANNEL", "REACTION", "USER"],
});

module.exports = client;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.role = "954237695981408296";

fs.readdirSync("./handler").forEach((file) => {
  require(`./handler/${file}`);
});

client.login(process.env.token);
