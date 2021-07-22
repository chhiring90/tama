module.exports = {
	name: 'pause',
	description: 'Pause the current playing music',
	execute(message, args) {
		message.channel.send('Pausing the music');
	},
};