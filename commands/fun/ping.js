module.exports = {
	name: 'ping',
	cooldown: 5,
	description: 'ping!',
	execute(message, args) {
		return message.channel.send('pong');
	},
};