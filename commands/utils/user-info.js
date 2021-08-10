module.exports = {
	name: 'user-info',
	description: 'Dispays User Details',
	execute(message) {
		return message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	},
};