const ytdl = require('ytdl-core');
const ytsearch = require('youtube-search-api');

module.exports = {
	name: 'play',
	description: 'plays Music from youtube',
	args: true,
	usage: '<command> <musicname>',
	async execute(message, args) {
		const { musicQueue, musicList } = message.client;
		const musicServerQueue = musicQueue.get(message.guild.id);

		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('You need to be in a voice channel to play this music');

		const permission = channel.permissionsFor(message.client.user);

		if (!permission.has('CONNECT')) return message.channel.send('I need permission to join voice channel');
		if (!permission.has('SPEAK')) return message.channel.send('I need permission to speak in voice channel');

		const num = args[0] * 1;
		if (!musicList.size || isNaN(num)) return this.showLists(message, args, musicList);

		// if (isNaN(num)) return message.channel.send(`Invalid selection of music. Correct command: **[!play ${args[0].substr(0, 1)}]**`);
		const songInfo = await ytdl.getInfo(musicList.get(num).id);

		const song = {
			title: songInfo.videoDetails.title,
			url: songInfo.videoDetails.video_url,
		};

		if (!musicServerQueue) return this.createServerQueue(message, musicQueue, song);

		musicServerQueue.songs.push(song);
		musicList.clear();
		return message.channel.send(`${song.title} has been added to the queue`);
	},
	async showLists(message, keyword, musicList) {
		const listArr = [];
		const list = await ytsearch.GetListByKeyword(keyword.join(' '));
		list.items.slice(0, 5).map((music, idx) => {
			const { id, title, length } = music;
			return musicList.set(idx + 1, {
				id,
				title,
				length: length.simpleText,
			});
		});

		listArr.push('**List of Musics** 🎵');
		musicList.map((music, idx) => listArr.push(`**${idx})** ${music.title} ${music.length}`));
		listArr.push('Select 1-5 to play music command **[!play 1]**');

		return message.channel.send(listArr, { split: true });
	},
	async createServerQueue(message, musicQueue, song) {
		try {
			const { channel } = message.member.voice;
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

			const connection = await channel.join();
			queueContruct.connection = connection;
			await this.play(message.guild, queueContruct.songs[0], musicQueue);
			message.client.musicList.clear();
			return;
		} catch (err) {
			console.log(err);
			musicQueue.delete(message.guild.id);
			return message.channel.send(err);
		}
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