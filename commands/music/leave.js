
module.exports = {   
    name: 'leave',
    aliases: ['disconnect', 'l', 'd'],
	description: 'Chiringuito sale del chat de voz.',
	args: false,
    usage: '',
    guildOnly: true,
    adminOnly: false,
    execute(message) {
        const { voiceChannel } = message.member;

		if (!voiceChannel) {
			return message.reply('Tenes que estar en el canal de voz, idiota');
		}

        voiceChannel.leave();
        
        message.channel.send('Desonecta3');
		
    }
}