const Discord = require("discord.js");
const client = require("../index");

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefix = process.env.prefix;
  if (!message.content || !message.content.toLowerCase().startsWith(prefix)) return;

  const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift();
  let command = client.commands.get(cmd) || client.aliases.get(cmd);

  if (command) {
    command.run(client, message, args);
  }
});
