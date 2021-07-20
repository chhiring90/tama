const fs = require('fs');
const path = require('path');
const { Client, Collection, MessageEmbed } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const { TAMA_TOKEN } = process.env;
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

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.login(TAMA_TOKEN);

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});