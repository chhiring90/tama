const ytdl = require('ytdl-core');

module.exports = {
	name: 'play',
	description: 'plays Music from youtube',
	args: true,
	usage: '[<command> <musicname>]',
	async execute(message, args) {
		const { musicQueue } = message.client;
		const musicServerQueue = musicQueue.get(message.guild.id);

		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('You need to be in a voice channel to play this music');

		const permission = channel.permissionsFor(message.client.user);

		if (!permission.has('CONNECT')) return message.channel.send('I need permission to join voice channel');
		if (!permission.has('SPEAK')) return message.channel.send('I need permission to speak in voice channel');

		const songInfo = await ytdl.getInfo(args[0]);
		const song = {
			title: songInfo.videoDetails.title,
			url: songInfo.videoDetails.video_url,
		};
		if (!musicServerQueue) {
			const queueContruct = {
				textChannel: message.channel,
				voiceChannel: channel,
				connection: null,
				songs: [],
				volume: 5,
				playing: true,
			};

			musicQueue.set(message.guild.id, queueContruct);
			queueContruct.songs.push(song);

			try {
				const connection = await channel.join();
				queueContruct.connection = connection;
				await this.play(message.guild, queueContruct.songs[0], musicQueue);
				return;
			} catch (err) {
				console.log(err);
				this.musicQueue.delete(message.guild.id);
				return message.channel.send(err);
			}
		}

		musicServerQueue.songs.push(song);
		return message.channel.send(`${song.title} has been added to the queue`);
	},
	async play(guild, song, musicQueue) {
		try {
			if (!musicQueue) return;
			const musicServerQueue = musicQueue.get(guild.id);

			if (!song) {
				musicServerQueue.voiceChannel.leave();
				musicQueue.delete(guild.id);
				return;
			}

			const dispatcher = await musicServerQueue.connection;
			dispatcher.play(ytdl(song.url))
				.on('finish', () => {
					if (!musicServerQueue.songs) return;
					musicServerQueue.songs.shift();
					this.play(guild, musicServerQueue.songs[0]);
				})
				.on('error', err => console.error(err));

			// dispatcher.setVolumeLogarithmic(musicServerQueue.volume / 5);
			musicServerQueue.textChannel.send(`Start playing: **${song.title}**`);
		} catch (err) {
			console.error(err);
		}
	},
};