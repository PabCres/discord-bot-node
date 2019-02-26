
module.exports = {   
    name: 'clear',
    aliases: ['prune', 'delete', 'c'],
	description: 'Borra una cantidad de mensajes determinados',
	args: true,
    usage: '<cantidad de mensajes para borrar>',
    guildOnly: true,
    adminOnly: true,
    execute(message, args) {
        let amount = parseInt(args[0]) + 1;
        if (amount >= 2 && amount <= 100) {
            message.channel.bulkDelete(amount).then(() => {
                if (amount === 2) {
                    message.channel.send(`${args[0]} mensaje fue tirado a la mierda, espero que no te arrepientas.`).then(msg => msg.delete(7000));
                }
                else {
                    message.channel.send(`Los ultimos ${args[0]} mensajes fueron tirados a la mierda, espero que no te arrepientas.`).then(msg => msg.delete(7000));
                }
            })
            .catch(err => {
                console.error(err);
                message.channel.send(`Hubo un error intentando borrar los mensajes en este canal, mildis`);
            });
        }
        else { return message.reply(`Solo podes borrar entre 1 y 99 mensajes, jejox`); }
    }
}