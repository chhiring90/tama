module.exports = {
	name: 'role',
	args: true,
	usage: '<user> <role>',
	execute(message) {
		return message.send(`Will be updated as soon as possible! ${message.author.username}`);
	},
};