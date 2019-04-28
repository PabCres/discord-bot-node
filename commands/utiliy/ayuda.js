
module.exports = {   
    name: 'test',
	description: 'tsting',
	args: false,
    usage: '<mensaje>',
    guildOnly: true,
    adminOnly: true,
    execute(message, args, queue) {
        if (queue.length) {
            message.channel.send(queue);
        }
        else {
            message.channel.send("no hay queue");
        }
    }
}