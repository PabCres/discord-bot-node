
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
			// const path = args.join(' ');

			// if (!queue) {
			// 	var queue = [];
			// 	queue.push(path);
			// 	console.log("no habia queue", queue);
			// }
			// else {
			// 	queue.push(path);
			// 	console.log("no habia queue", queue);
			// }
			
			// console.log(queue);


			const regexyt = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
			const regexfile = /^(?:[A-Z]\:|\.|(?:file\:\/\/|\\\\)[^\\\/\:\*\?\<\>\"\|]+)(?:(?:\\|\/)[^\\\/\:\*\?\<\>\"\|]+)*(?:\\|\/)?$/gm;

			if (args[0] == args[0].match(regexyt)) {
				console.log("it's a youtube video");
				const stream = ytdl(args[0], { filter: 'audioonly' });
				const dispatcher = connection.playStream(stream);
	
				dispatcher.on('end', () => {
					setTimeout(() => {
						voiceChannel.leave()
					}, 180000);
				});
			}
			else if (args[0] == args[0].match(regexfile)) {
				console.log("it's a file path");
				const dispatcher = connection.playFile(path);
				dispatcher.on('end', () => {
					setTimeout(() => {
						voiceChannel.leave()
					}, 180000);
				});
			}
			
		});
    }
}