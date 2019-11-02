
module.exports = {   
    name: 'say',
	description: 'Hacer que el bot diga algo',
	args: true,
    usage: '<mensaje>',
    guildOnly: true,
    adminOnly: true,
    execute(message, args) {
        let botmessage = args.join(" ");
        message.delete().catch((err) => { return err; });
        message.channel.send(botmessage, { tts:true });
    }
}