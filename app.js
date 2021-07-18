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
	// if (message.content === `${PREFIX}ping`) {
	// 	message.channel.send('pong');
	// } else if (message.content === `${PREFIX}beep`) {
	// 	message.channel.send('boop');
	// } else if (message.content === `${PREFIX}server`) {
	// 	message.channel.send(`This server's name is: ${message.guild.name}\nTotal Members: ${message.guild.memberCount}`);
	// } else if (message.content === `${PREFIX}user-info`) {
	// 	message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	// } else if (command === 'args-info') {
	// 	if (!args.length) {
	// 		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	// 	} else if (args[0] === 'fizz') {
	// 		return message.channel.send('buzz');
	// 	} else if (command === 'kick') {
	// 	if (!message.mentions.users.size) {
	// 		return message.reply('You need to tag user in order to kick them!🐱‍💻');
	// 	}
	// 	const taggedUser = message.mentions.users.first();
	// 	message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	// } else if (command === 'avatar') {
	// 	if (!message.mentions.users.size) {
	// 		return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
	// 	}

	// 	const avatarList = message.mentions.users.map(user => {
	// 		return `${user.username}'s avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`;
	// 	});

	// 	message.channel.send(avatarList);
	// }

	// 	message.channel.send(`Command name : ${command}:\nArguments ${args}`);
	// }

	if (!message.content.startsWith(PREFIX) || message.author.bot) return;
	// const args = message.content.slice(PREFIX.length).trim().split(' ');
	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const command = args.shift().toLocaleLowerCase();

	if (command === 'ping') {
		message.channel.send('pong');
	} else if (command === 'prune') {
		const amount = parseInt(args[0]);

		if (isNaN(amount)) {
			return message.reply('that doesnot seems to be a valid number.');
		} else if (amount < 2 || amount > 100) {
			return message.reply('You need to input a number between 2 and 100');
		}

		message.channel.bulkDelete(amount, true)
			.then(() => message.reply(`No of ${amount} message deleted successfully!!`))
			.catch(err => {
				console.error(err);
				message.channel.reply('There was error trying to pruue message in this channel!');
			});
	}
});

client.login(TAMA_TOKEN);
