const Discord = require('discord.js');

module.exports = {
    name: 'kick',
	description: 'Kickear a alguien del servidor',
	args: true,
    usage: '<usuario al que queres kickear> <razón>',
    guildOnly: true,
    adminOnly: true,
    execute(message, args) {
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!kUser) return message.reply("No puedo encontrar a ese usuario");
        if (kUser.hasPermission("ADMINISTRATOR")) return message.reply("Esa persona no puede ser kickeada de lo hermosa que es y tambien es muy poderosa en este server xd");

        let kReason = args.join(" ").slice(22);
        if (!kReason) { return message.reply("Debe haber una razón") };

        let kickEmbed = new Discord.RichEmbed()
        .setDescription("BAN")
        .setColor("#cc0000")
        .addField("Usuario baneado:", kUser)
        .addField("Razón:  ", kReason);

        kUser.send(`Has sido kickeado del servidor \'${message.guild.name}\'\n`, kickEmbed)
        message.guild.member(kUser).kick(kReason);
        message.channel.send(kickEmbed);
    }
}