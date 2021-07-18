module.exports = {
	name: 'prune',
	description: 'prune!',
	execute(message, args) {
		message.channel.send('pong');
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		} else if (args[0] === 'fizz') {
			return message.channel.send('buzz');
		}
	},
};