module.exports = {
	name: 'server',
	description: 'Dispalys Server\'s details',
	execute(message) {
		return message.channel.send(`The server's name is ${message.guild.name}\n Total Members: ${message.guild.memberCount}`);
	},
};