module.exports = {
	name: 'boop',
	description: 'boop!',
	execute(message, args) {
		message.channel.send('boop');
	},
}