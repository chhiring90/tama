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

		const tag = args[0].toLowerCase();
		const command = commands.get(tag) || commands.find(c => c.aliases && c.aliases.includes(tag));

		if (!command) return message.reply('that\'s not a valid command');

		const { name, aliases, description, usage, cooldown } = command;

		data.push(`**Name:** ${name}`);
		if (aliases) data.push(`**Alises:** ${aliases.join(',')}`);
		if (description) data.push(`**Description:** ${description}`);
		if (usage) data.push(`**Usage:** ${PREFIX}${name} ${usage}`);
		data.push(`**Cooldown:** ${cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });
	},
};