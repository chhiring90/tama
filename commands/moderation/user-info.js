module.exports = {
	name: 'user-info',
	description: 'Dispays User Details',
	execute(message, args) {
		return message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	},
};