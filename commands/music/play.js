
const ytdl = require('ytdl-core');

module.exports = {   
    name: 'play',
    aliases: ['music', 'sing', 'p'],
	description: 'Poner musica de youtube',
	args: true,
    usage: '<link>/<song name>/<path (if you are the owner)>',
    guildOnly: true,
    adminOnly: false,
    async execute(message, args, queue) {
		
        const { voiceChannel } = message.member;
		if (!voiceChannel) return message.reply('Tenes que estar en el canal de voz para poner musica');

		const path = args.join(' ');
		console.log("este es el path ",path);

		if(!queue[0]){
			try {
				var connection = await voiceChannel.join();
				queue.push(path);
				play(queue[0]);
			} catch (error) {
				console.error(`I could not join the voice channel: ${error}`);
				return message.channel.send(`I could not join the voice channel: ${error}`);
			}
		}
		else {
			queue.push(path);
			message.channel.send("La canción ha sido agregada a la queue");
		}
		
		
		function play(song) {
			console.log("esta es la cancion ",song);
			var regexyt = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
			var regexfile = /^(?:[A-Z]\:|\.|(?:file\:\/\/|\\\\)[^\\\/\:\*\?\<\>\"\|]+)(?:(?:\\|\/)[^\\\/\:\*\?\<\>\"\|]+)*(?:\\|\/)?$/gm;
			
			if (!queue[0]) {
				setTimeout(() => {
					voiceChannel.leave();
				}, 300000);
				return;
			}

			if (regexyt.test(song)) {
				console.log("it's a youtube video");
				const stream = ytdl(song, { filter: 'audioonly' });
				dispatcher = connection.playStream(stream);
				dispatcher.setBitrate(128);
				dispatcher.on('end', () => {
					queue.shift();
					console.log("la siguiente cancion es ",queue[0]);
					play(queue[0]);
				});
			}
			else if (regexfile.test(song)) {
				console.log("it's a file path");
				const dispatcher = connection.playFile(song);
				dispatcher.setBitrate(128);
				dispatcher.on('end', () => {
					queue.shift();
					console.log("la siguiente cancion es ",queue[0]);
					play(queue[0]);
				});
			}
			else {
				console.log("esto no es ni un link ni un archivo");
			}
		}

		console.log("queue final ",queue);
		return queue;
    }
}