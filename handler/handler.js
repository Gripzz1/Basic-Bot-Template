const fs = require("fs");
const { readdirSync } = fs;
const client = require("../index");

console.log("-".repeat(30));

// COMMANDS
console.log("COMMANDS 🟢");
readdirSync("./commands").forEach(async (dir) => {
  const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
    file.endsWith(".js")
  );

  commands.map((cmd) => {
    let file = require(`../commands/${dir}/${cmd}`);

    let name = file.name || "No command name.";
    let aliases = file.aliases || [];

    let option = name == "No command name." ? "❌" : "✅";

    if (name != "No command name.") {
      client.commands.set(name, file);
      aliases.forEach((alias) => {
        client.aliases.set(alias, file);
      });
    }
    
    console.log(`Loaded Command ${option} | ${name}`);
  });
});

console.log("-".repeat(30));

//EVENTS
console.log("EVENTS 🟢");
readdirSync("./events").forEach(async (event) => {
  const eventName = event.replace(".js", "");
  require(`../events/${event}`);
  console.log("Loaded Event ✅ | " + eventName);
});

console.log("-".repeat(30));
