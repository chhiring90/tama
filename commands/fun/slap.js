const tenorGif = require('../../helpers/tenorGif');
const catchAsync = require('../../helpers/catchAsync');

module.exports = {
	name: 'slap',
	description: 'Slap the mentioned member',
	execute: catchAsync(async (message, args) => {
		const gif = await tenorGif('slap', { gifType: 'anime' });
		return message.channel.send(`${gif}\npowerful and magical slap ${args[0]}`);
	}),
};