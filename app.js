const fs = require('fs');
const path = require('path');
const { Client, Collection } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const { TAMA_TOKEN, PREFIX } = process.env;
const client = new Client();
client.commands = new Collection();
client.cooldowns = new Collection();


const commandFolders = fs
	.readdirSync(path.join(__dirname, 'commands'));

for (const folder of commandFolders) {
	const commandFiles = fs
		.readdirSync(`./commands/${folder}`)
		.filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.once('ready', function () {
	console.log('BeepBoop Bot is ready to roll');
});

client.on('message', message => {
	// Cooking commands
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;
	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const commandName = args.shift().toLocaleLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	// Exclude DM
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute the command inside DM!');
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
});

client.login(TAMA_TOKEN);