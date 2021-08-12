module.exports = {
	name: 'stop',
	description: 'stop the current playing music',
	usage: '<command>',
	aliases: ['pause'],
	execute(message) {
		const musicServerQueue = message.client.musicQueue.get(message.guild.id);
		const { songs } = musicServerQueue;

		if (!message.member.voice.channel) {
			return message.channel.send('You have to be in the voice channel to stop the music!');
		}

		if (!musicServerQueue) return message.channel.send('There is no song that I could stop');
		musicServerQueue.connection.dispatcher.pause();

		message.channel.send(`Paused: **${songs[0].title}**`);
	},
};