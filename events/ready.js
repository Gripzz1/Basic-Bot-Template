const Discord = require("discord.js");
const client = require("../index");

client.on("ready", async () => {
  console.log(client.user.username + " is online!");
});
