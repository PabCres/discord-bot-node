
const ytdl = require('ytdl-core');

module.exports = {   
    name: 'play',
    aliases: ['music', 'sing', 'p'],
	description: 'Poner musica de youtube',
	args: true,
    usage: '<link>/<song name>/<path (if you are the owner)>',
    guildOnly: true,
    adminOnly: false,
    execute(message, args) {
        const { voiceChannel } = message.member;

		if (!voiceChannel) {
			return message.reply('Tenes que estar en el canal de voz para poner musica, idiota');
		}

		voiceChannel.join().then(connection => {
			switch (args[0]) {
				case String(args[0].match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm)):
					console.log("yt");
					const stream = ytdl(`${args[0]}`, { filter: 'audioonly' });
					let hola = connection.playStream(stream);
					hola.on('end', () => voiceChannel.leave());
				break;
				
				default:
					console.log("error");
				break;
			}
		});
    }
}