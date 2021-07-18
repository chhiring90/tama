const fs = require('fs');
const path = require('path');
const { Client, Collection } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const { TAMA_TOKEN, PREFIX } = process.env;
const client = new Client();
client.commands = new Collection();

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
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;
	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const commandName = args.shift().toLocaleLowerCase();

	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);

	if (command.args && !args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}

	try {
		command.execute(message, args);
	} catch (err) {
		console.error(err);
		message.reply('There was an error trying to execute that command!');
	}
});

client.login(TAMA_TOKEN);