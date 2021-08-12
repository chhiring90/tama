const tenorGif = require('../../helpers/tenorGif');

module.exports = {
	name: 'bow',
	description: 'Bowing the mentioned member',
	async execute(message, args) {
		const gif = await tenorGif('bowing', { gifType: 'anime' });
		return message.channel.send(`${gif}\nBowing ${args[0]}`);
	},
};