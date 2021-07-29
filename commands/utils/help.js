const { PREFIX } = process.env;

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command',
	aliases: ['commands'],
	usage: '[<command> <name>]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push('Here\'s a list of my commands');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nYou can send \`${PREFIX}help [command name]\` to get info on a specific command!`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve send you DM with all my commands!');
				})
				.catch(err => {
					console.error(`Could send help to DM to ${message.author.tag}.\n`, err);
					message.reply('It seems like I can\'t DM you! Do you have DMs disabled?');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) return message.reply('that\'s not a valid command');

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Alises:** ${command.aliases.join(',')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usuage) data.push(`**Usuage:** ${PREFIX}${command.name} ${command.usuage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });
	},
};