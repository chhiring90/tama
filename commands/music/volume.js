module.exports = {
	name: 'volume',
	description: 'Controls the audio volume.',
	usage: '<command>',
	execute(message, args) {
		const musicServerQueue = message.client.musicQueue.get(message.guild.id);

		if (!message.member.voice.channel) {
			return message.channel.send('You have to be in the voice channel to control volume of audio');
		}

		if (!musicServerQueue) return message.channel.send('There is no music playing currently');
		musicServerQueue.connection.dispatcher.setVolume(args[0] * 1 / 100);

		message.channel.send(`Volume: 🔊 **${args[0]}%**`);
	},
};