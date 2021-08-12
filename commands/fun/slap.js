const tenorGif = require('../../helpers/tenorGif');

module.exports = {
	name: 'slap',
	description: 'Slap the mentioned member',
	async execute(message, args) {
		const gif = await tenorGif('slap', { gifType: 'anime' });
		return message.channel.send(`${gif}\npowerful and magical slap ${args[0]}`);
	},
};