const tenorGif = require('../../helpers/tenorGif');
const catchAsync = require('../../helpers/catchAsync');

module.exports = {
	name: 'punch',
	description: 'Punch the mentioned member',
	execute: catchAsync(async (message, args) => {
		const gif = await tenorGif('punch', { gifType: 'anime' });
		return message.channel.send(`${gif}\nSuper Ultra Punch ${args[0]}`);
	}),
};