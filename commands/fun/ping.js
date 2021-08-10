module.exports = {
	name: 'ping',
	cooldown: 5,
	description: 'ping!',
	execute(message) {
		return message.channel.send('pong');
	},
};