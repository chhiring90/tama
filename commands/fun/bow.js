const tenorGif = require('../../helpers/tenorGif');
const catchAsync = require('../../helpers/catchAsync');

module.exports = {
	name: 'bow',
	description: 'Bowing the mentioned member',
	execute: catchAsync(async (message, args) => {
		const gif = await tenorGif('bowing', { gifType: 'anime' });
		return message.channel.send(`${gif}\nBowing ${args[0]}`);
	}),
};