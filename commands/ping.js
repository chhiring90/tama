module.exports = {
	name: 'ping',
	description: 'ping!',
	execute (message, args) {
		return message.channel.send('pong');
	},
};