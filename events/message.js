const { Collection } = require('discord.js');

module.exports = {
	name: 'message',
	execute(message, client) {
		const { PREFIX } = process.env;
		// Cooking commands
		if (!message.content.startsWith(PREFIX) || message.author.bot) return;
		const args = message.content.slice(PREFIX.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command = client.commands.get(commandName)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return;

		// Exclude DM
		if (command.guildOnly && message.channel.type === 'dm') {
			return message.reply('I can\'t execute the command inside DM!');
		}

		if (command.permission) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message.reply('You can\'t execute the command');
			}
		}

		// Args
		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;

			if (command.usage) {
				reply += `\nThe proper usuage would be: \`${PREFIX}${command} ${command.usage}\``;
			}
			return message.channel.send(reply);
		}

		// Cooldown
		const { cooldowns } = client;

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(`Please wait ${timeLeft.toFixed(1)} more seconds before reusing the \`${command.name}\` command.`);
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		// Executing commands
		try {
			command.execute(message, args);
		} catch (err) {
			console.error(err);
			message.reply('There was an error trying to execute that command!');
		}
	},
};