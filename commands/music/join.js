
module.exports = {   
    name: 'join',
    aliases: ['connect', 'start', 'j'],
	description: 'Chiringuito entra al chat de voz.',
	args: false,
    usage: '',
    guildOnly: true,
    adminOnly: false,
    execute(message) {
        const { voiceChannel } = message.member;

		if (!voiceChannel) {
			return message.reply('Tenes que estar en el canal de voz, idiota');
		}

		voiceChannel.join().then(() => {
            message.channel.send('Conecta3');
		});
    }
}