
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

		const serverQueue = queue.get(message.guild.id);
		if(!serverQueue){
			const queueConstruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 5,
				playing: true
			};
			queue.set(message.guild.id, queueConstruct);

			queueConstruct.songs.push(path);
			try {
				var connection = await voiceChannel.join();
				queueConstruct.connection = connection;
				play(message.guild, queueConstruct.songs[0]);
			} catch (error) {
				console.error(`I could not join the voice channel: ${error}`);
				queue.delete(message.guild.id);
				return message.channel.send(`I could not join the voice channel: ${error}`);
			}
		}
		else {
			serverQueue.songs.push(path);
			message.channel.send("La canción ha sido agregada a la queue");
		}
	
		
		function play(guild, song) {
			console.log("esta es la cancion ",song);
			const serverQueue = queue.get(guild.id);
			
			if (!song) {
				serverQueue.voiceChannel.leave();
				queue.delete(guild.id);
				return;
			}
			console.log(serverQueue.songs);

			var regexyt = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
			var regexfile = /^(?:[A-Z]\:|\.|(?:file\:\/\/|\\\\)[^\\\/\:\*\?\<\>\"\|]+)(?:(?:\\|\/)[^\\\/\:\*\?\<\>\"\|]+)*(?:\\|\/)?$/gm;

			if (regexyt.test(song)) {
				console.log("it's a youtube video");
				// const stream = ytdl(song);
				// console.log(stream);
				const dispatcher = serverQueue.connection.playStream(ytdl(song,{ filter: (format) => ['251'] }), { volume: false });
				dispatcher.on('end', reason => {
					if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
					else console.log(reason, "razooon");
					serverQueue.songs.shift();
					play(guild, serverQueue.songs[0]);
				});
				dispatcher.on('error', error => console.error(error));
				dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

				serverQueue.textChannel.send(`🎶 Esta sonando el temaiken: **${song}**`);
			}
			else if (regexfile.test(song)) {
				console.log("it's a file path");
				const dispatcher = connection.playFile(song);
				dispatcher.on('end', reason => {
					console.log("terminada");
					if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
					else console.log(reason, "sadasa");
					serverQueue.songs.shift();
					console.log(serverQueue.songs);
					play(guild, serverQueue.songs[0]);
				});
				dispatcher.on('error', error => console.error(error));
				dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

				serverQueue.textChannel.send(`🎶 Esta sonando el temaiken: **${song}**`);
			}
			else {
				console.log("esto no es ni un link ni un archivo");
			}
		}

		//console.log("queue final ",queue);
		return queue;
    }
}