
const Discord = require('discord.js');

module.exports = {
    name: 'ban',
	description: 'Bannear a alguien del servidor',
	args: true,
    usage: '<usuario al que queres bannear> <razón>',
    guildOnly: true,
    adminOnly: true,
    execute(message, args) {
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!bUser) return message.reply("No puedo encontrar a ese usuario");
        if (bUser.hasPermission("ADMINISTRATOR")) return message.reply("Esa persona no puede ser banneada de lo hermosa que es y tambien es muy poderosa en este server xd");

        let bReason = args.join(" ").slice(22);
        if (!bReason) { return message.reply("Debe haber una razón") };

        let banEmbed = new Discord.RichEmbed()
        .setDescription("BAN")
        .setColor("#cc0000")
        .addField("Usuario baneado:", bUser)
        .addField("Razón:  ", bReason);

        bUser.send(`Has sido banneado del servidor \'${message.guild.name}\'\n`, banEmbed);
        message.guild.member(bUser).ban(bReason);
        message.channel.send(banEmbed);
    }
}
