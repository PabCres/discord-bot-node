
const { prefix } = require('../../botConfig.json');

module.exports = {
	name: 'help',
	description: 'Estos son todos los comandos',
	aliases: ['h', 'commands'],
	usage: '[nombre del comando]',
	cooldown: 2,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;
		console.log(message.client);

		if (!args.length) {
			data.push('Estos son los nombres de todos los comandos que hay:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nPodes escribir: \`${prefix}help [nombre del comando]\` para tenes mas info del mismo`);

			return message.channel.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					//message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you!');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('Ese comando no existe o no es valido');
		}

		data.push(`**Nombre:** ${command.name}`);

		if (command.aliases) data.push(`**Alias:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Descripcion:** ${command.description}`);
		if (command.usage) data.push(`**Como usar:** ${prefix}${command.name} ${command.usage}`);

		message.channel.send(data, { split: true });
	},
};