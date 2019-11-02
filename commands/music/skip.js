
module.exports = {   
    name: 'skip',
    aliases: ['skip', 'next'],
	description: 'Chiringuito pone la siguiente cancion.',
	args: false,
    usage: '',
    guildOnly: true,
    adminOnly: false,
    execute(message, args, queue) {
        console.log(queue);
        const serverQueue = queue.get(message.guild.id);
        if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return queue;
    }
}