module.exports = {
	name: 'role',
	args: true,
	usage: '<user> <role>',
	execute(message, args) {
		return message.send(`Will be updated as soon as possible! ${message.author.username}`);
	},
};