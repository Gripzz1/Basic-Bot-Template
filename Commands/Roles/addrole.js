const {
    MessageEmbed,
    Message,
    Client
} = require("discord.js");

module.exports = {
    name: "addrole",
    description: "Add role to users!",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
    run: async (client, message, args) => {
        if (!message.member.roles.cache.has(client.role)) return message.reply("You do not have permissions to use this command!");
        const role = args.pop();

        if (!role) return message.reply("Please use the following format!\n```!addrole <user> <role>```\nThere could be more than one user, seperate each with a space!");

        let findRole = message.guild.roles.cache.find(r => r.name.toLowerCase() == role.toLowerCase());
        if (!findRole) return message.reply(`Could not find role with the name **${role}**!`);

        const format = (m) => m.replace("<", "").replace("@", "").replace("!", "").replace(">", "")

        if (args.length < 1) return message.reply("Invalid users provided! Make sure all of the users exist in this server!!")

        const members = args.forEach(async m => {
            let formatted = format(m);
            let mem = await message.guild.members.fetch(formatted);
            await mem.roles.add(findRole).catch(e => {});
        });

        await message.channel.send(`The ${findRole} role has been added to all of the provided users!`)
    },
};
