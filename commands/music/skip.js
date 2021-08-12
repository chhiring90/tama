const ytdl = require('ytdl-core');

module.exports = {
	name: 'skip',
	description: 'Skips current playing music',
	usage: '<skip>',
	async execute(message) {
		const musicServerQueue = message.client.musicQueue.get(message.guild.id);
		const { songs } = musicServerQueue;

		if (!message.member.voice.channel) {
			return message.channel.send('You have to be in the voice channel to skip the music!');
		}

		if (!musicServerQueue) return message.channel.send('There is no song that I could skip');
		musicServerQueue.connection.dispatcher.pause();
		const skippedSong = songs.shift();
		const dispatcher = await musicServerQueue.connection;
		dispatcher
			.play(ytdl(songs[0].url))
			.on('error', (err) => console.log('error', err));

		message.channel.send(`Skipped **${skippedSong.title}** \n Playing **${songs[0].title}**`);
	},
};