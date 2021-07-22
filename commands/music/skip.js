module.exports = {
	name: 'skip',
	description: 'Skips current playing music',
	execute(message) {
		const musicServerQueue = message.client.musicQueue.get(message.guild.id);

		if (!message.member.voice.channel) {
			return message.channel.send('You have to be in the voice channel to stop the music!');
		}

		if (!musicServerQueue) return message.channel.send('There is no song that I could stop');
		musicServerQueue.connection.dispatcher.end('Skipped Current Music!');
	},
};