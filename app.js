const fs = require('fs');
const path = require('path');
const { Client, Collection } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client();
client.commands = new Collection();

const commandFiles = fs
	.readdirSync(path.join(__dirname, 'commands'))
	.filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const { TAMA_TOKEN, PREFIX } = process.env;

client.once('ready', function () {
	console.log('BeepBoop Bot is ready to roll');
});

client.on('message', message => {
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;
	// const args = message.content.slice(PREFIX.length).trim().split(' ');
	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const command = args.shift().toLocaleLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (err) {
		console.error(err);
		message.reply('There was an error trying to execute that command!');
	}
});

client.login(TAMA_TOKEN);
